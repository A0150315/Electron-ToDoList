import axios from 'axios';

module.exports = class Login {
  constructor() {
    this.setUuid();
  }

  async setUuid() {
    const response = await axios.get(
      `https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=en_US&_=${new Date()}`
    );
    const uuid = response.data.match(/[A-Za-z_\-\d]{10}==/)[0];
    this.uuid = uuid;
    // this.check();
    // const imgR = await axios.get(
    //   `https://login.weixin.qq.com/qrcode/${uuid}`
    // );
    // console.log(imgUrl.data);
  }

  async check() {
    // 轮询
    console.log('检查登录状态');
    const response = await axios.get(
      'https://login.wx.qq.com/cgi-bin/mmwebwx-bin/login',
      {
        params: {
          loginicon: true,
          uuid: this.uuid,
          tip: 0,
          r: ~new Date(),
          _: +new Date()
        }
      }
    );
    const dataBox = {};

    (window => {
      eval(response.data);
    })(dataBox);
    console.log(dataBox);

    switch (dataBox.code) {
      case 200:
        console.log('登录成功');
        // let authAddress = window.redirect_uri;
        // console.log(authAddress);
        // // Set your weChat network route, otherwise you will got a code '1102'
        // axios.defaults.baseURL = authAddress.match(/^https:\/\/(.*?)\//)[0];

        // delete window.redirect_uri;
        // delete window.code;
        // delete window.userAvatar;

        // // Login success, create session
        // let response = await axios.get(authAddress, {
        //   params: {
        //     fun: "new",
        //     version: "v2"
        //   }
        // });
        // let auth = {};

        // try {
        //   auth = {
        //     baseURL: axios.defaults.baseURL,
        //     skey: response.data.match(/<skey>(.*?)<\/skey>/)[1],
        //     passTicket: response.data.match(
        //       /<pass_ticket>(.*?)<\/pass_ticket>/
        //     )[1],
        //     wxsid: response.data.match(/<wxsid>(.*?)<\/wxsid>/)[1],
        //     wxuin: response.data.match(/<wxuin>(.*?)<\/wxuin>/)[1]
        //   };
        // } catch (ex) {
        //   window.alert(
        //     "Your login may be compromised. For account security, you cannot log in to Web WeChat. You can try mobile WeChat or Windows WeChat."
        //   );
        //   window.location.reload();
        // }

        // this.auth = auth;
        // await storage.set("auth", auth);
        // await this.initUser();
        // this.keepalive().catch(ex => this.logout());
        break;

      case 201:
        // Confirm to login
        // this.avatar = window.userAvatar;
        this.check();
        console.log('确认登录');
        break;

      case 400:
        // QR Code has expired
        console.log('二维码过期');
        break;

      default:
        console.log('未登录');
        // Continue call server and waite
        this.check();
    }
  }
};
