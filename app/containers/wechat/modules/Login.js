// 登出
// 重新获取二维码
// 获取联系人列表
// 初始化聊天

import axios from 'axios';

const CancelToken = axios.CancelToken;

// A callback for cancel the sync request

module.exports = class Login {
  cancelCheck = window.Function;

  constructor() {
    return this;
  }

  checkTimeout(weakup) {
    // Kill the zombie request or duplicate request
    this.cancelCheck();
    clearTimeout(this.checkTimeout.timer);

    // if (helper.isSuspend() || weakup) {
    //   return;
    // }

    this.checkTimeout.timer = setTimeout(() => {
      this.cancelCheck();
    }, 30 * 1000);
  }

  async setUuid() {
    const response = await axios.get(
      `https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=en_US&_=${new Date()}`
    );
    const uuid = response.data.match(/[A-Za-z_\-\d]{10}==/)[0];
    this.uuid = uuid;
    return uuid;
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
    return dataBox;
  }

  async createSession() {
    let auth;
    const response = await axios.get(this.authAddress, {
      params: {
        fun: 'new',
        version: 'v2'
      }
    });

    try {
      auth = {
        baseURL: axios.defaults.baseURL,
        skey: response.data.match(/<skey>(.*?)<\/skey>/)[1],
        passTicket: response.data.match(/<pass_ticket>(.*?)<\/pass_ticket>/)[1],
        wxsid: response.data.match(/<wxsid>(.*?)<\/wxsid>/)[1],
        wxuin: response.data.match(/<wxuin>(.*?)<\/wxuin>/)[1]
      };
    } catch (ex) {
      window.alert(
        'Your login may be compromised. For account security, you cannot log in to Web WeChat. You can try mobile WeChat or loginStates WeChat.'
      );
      return response;
      // window.location.reload();
    }

    this.auth = auth;
    sessionStorage.setItem('auth', JSON.stringify(auth));
    return auth;
  }

  async initUser() {
    // 初始化基本信息
    const webwxinitResponse = await axios.post(
      `/cgi-bin/mmwebwx-bin/webwxinit?r=${-new Date()}&pass_ticket=${
        this.auth.passTicket
      }`,
      {
        BaseRequest: {
          Sid: this.auth.wxsid,
          Uin: this.auth.wxuin,
          Skey: this.auth.skey
        }
      }
    );
    this.user = webwxinitResponse.data;
    this.user.ContactList.forEach(e => {
      e.HeadImgUrl = `${axios.defaults.baseURL}${e.HeadImgUrl.substr(1)}`;
    });

    // 报告登录状态
    await axios.post(
      `/cgi-bin/mmwebwx-bin/webwxstatusnotify?lang=en_US&pass_ticket=${
        this.auth.passTicket
      }`,
      {
        BaseRequest: {
          Sid: this.auth.wxsid,
          Uin: this.auth.wxuin,
          Skey: this.auth.skey
        },
        ClientMsgId: +new Date(),
        Code: 3,
        FromUserName: webwxinitResponse.data.User.UserName,
        ToUserName: webwxinitResponse.data.User.UserName
      }
    );

    // await contacts.getContats();
    // 获取联系人列表
    var response = await axios.get('/cgi-bin/mmwebwx-bin/webwxgetcontact', {
      params: {
        r: +new Date(),
        seq: 0,
        skey: this.auth.skey
      }
    });
    return this.user;

    // await chat.loadChats(this.user.ChatSet);
  }

  async keepalive() {
    var { auth } = this;
    var response = await axios.post(
      `/cgi-bin/mmwebwx-bin/webwxsync?sid=${auth.wxsid}&skey=${
        auth.skey
      }&lang=en_US&pass_ticket=${auth.passTicket}`,
      {
        BaseRequest: {
          Sid: auth.wxsid,
          Uin: auth.wxuin,
          Skey: auth.skey
        },
        SyncKey: this.user.SyncKey,
        rr: ~new Date()
      }
    );

    var host = axios.defaults.baseURL.replace('//', '//webpush.');
    var loop = async () => {
      // Start detect timeout
      this.checkTimeout();

      const response = await axios
        .get(`${host}cgi-bin/mmwebwx-bin/synccheck`, {
          cancelToken: new CancelToken(exe => {
            // An executor function receives a cancel function as a parameter
            this.cancelCheck = exe;
          }),
          params: {
            r: +new Date(),
            sid: auth.wxsid,
            uin: auth.wxuin,
            skey: auth.skey,
            synckey: this.syncKey
          }
        })
        .catch(ex => {
          if (axios.isCancel(ex)) {
            loop();
          } else {
            console.log('登出');
            // this.logout();
          }
        });
      if (!response) {
        // Request has been canceled
        return;
      }

      const dataBox = {};
      (window => {
        eval(response.data);
      })(dataBox);

      if (+dataBox.synccheck.retcode === 0) {
        // 2, Has new message
        // 6, New friend
        // 4, Conversation refresh ?
        // 7, Exit or enter
        let selector = +dataBox.synccheck.selector;

        if (selector !== 0) {
          await this.getNewMessage();
        }
        // Do next sync keep your wechat alive
        return loop();
      } else {
        console.log('登出');
        // this.logout();
      }
    };

    // Load the rencets chats
    // response.data.AddMsgList.forEach(async e => {
    //   await chat.loadChats(e.StatusNotifyUserName);
    // });

    this.genSyncKey(response.data.SyncCheckKey.List);

    return loop();
  }

  genSyncKey(list) {
    this.syncKey = list.map(e => `${e.Key}_${e.Val}`).join('|');
  }

  async getNewMessage() {
    console.log('收到新操作');
    var { auth } = this;
    var response = await axios.post(
      `/cgi-bin/mmwebwx-bin/webwxsync?sid=${auth.wxsid}&skey=${
        auth.skey
      }&lang=en_US&pass_ticket=${auth.passTicket}`,
      {
        BaseRequest: {
          Sid: auth.wxsid,
          Uin: auth.wxuin,
          Skey: auth.skey
        },
        SyncKey: this.user.SyncKey,
        rr: ~new Date()
      }
    );
    var mods = [];

    // Refresh the sync keys
    this.user.SyncKey = response.data.SyncCheckKey;
    this.genSyncKey(response.data.SyncCheckKey.List);

    // // Get the new friend, or chat room has change
    // response.data.ModContactList.map(e => {
    //   var hasUser = contacts.memberList.find(
    //     user => user.UserName === e.UserName
    //   );

    //   if (hasUser) {
    //     // Just update the user
    //     contacts.updateUser(e);
    //   } else {
    //     // If user not exists put it in batch list
    //     mods.push(e.UserName);
    //   }
    // });

    // // Delete user
    // response.data.DelContactList.map(e => {
    //   contacts.deleteUser(e.UserName);
    //   chat.removeChat(e);
    // });

    // if (mods.length) {
    //   await contacts.batch(mods, true);
    // }

    response.data.AddMsgList.forEach(async e => {
      var from = e.FromUserName;
      var to = e.ToUserName;
      var fromYourPhone = from === this.user.User.UserName && from !== to;

      // When message has been readed on your phone, will receive this message
      if (e.MsgType === 51) {
        // console.log('手机已读');
      }

      e.Content = normalize(e.Content);

      // Sync message from your phone
      if (fromYourPhone) {
        // Message is sync from your phone
        // chat.addMessage(e, true);
        // console.log('我搞我自己');
        return;
      }

      if (from.startsWith('@')) {
        // chat.addMessage(e);
        if (!isChatRoom(from)) {
          // console.log('有人给你发东西啦');
          const content = await this.getAutoMessage(e.Content);
          this.sendMsg(from, { content });
        }
      }
    });

    console.log(response.data.AddMsgList);
    return response.data;
  }

  async sendMsg(userName, message) {
    const { auth } = this;
    var id =
      +new Date() * 1000 +
      Math.random()
        .toString()
        .substr(2, 4);
    var payload = Object.assign({}, message, {
      content: decodeHTML(message.content),
      from: this.user.User.UserName,
      to: userName,
      ClientMsgId: id,
      LocalID: id
    });

    var response = await axios.post(`/cgi-bin/mmwebwx-bin/webwxsendmsg`, {
      BaseRequest: {
        Sid: auth.wxsid,
        Uin: auth.wxuin,
        Skey: auth.skey
      },
      Msg: {
        Content: payload.content,
        FromUserName: payload.from,
        ToUserName: payload.to,
        ClientMsgId: payload.ClientMsgId,
        LocalID: payload.LocalID,
        Type: 1
      },
      Scene: 2
      // Scene: isForward ? 2 : 0
    });
  }

  async getAutoMessage(text) {
    const dat = JSON.stringify({
      reqType: 0,
      perception: {
        inputText: {
          text: text
        }
      },
      userInfo: {
        apiKey: 'd78796e6c234415ebb400df68516fecb',
        userId: '1111'
      }
    });
    const { data } = await axios.post(
      `http://openapi.tuling123.com/openapi/api/v2`,
      dat
    );
    const { results, intent } = data;
    if (intent.code !== 10005) console.log(data);
    let resultsText;
    for (let i = 0; i < results.length; i++) {
      if (results[i].resultType === 'text') {
        resultsText = results[i].values.text;
        break;
      }
    }
    return resultsText;
  }

  setAuthAddress(urlString) {
    this.authAddress = urlString;
    axios.defaults.baseURL = urlString.match(/^https:\/\/(.*?)\//)[0];
    return urlString;
  }
};

function normalize(text = '') {
  var matchs =
    text.match(/<span class="emoji emoji[0-9a-fA-F]+"><\/span>/g) || [];
  var decodeText = text;

  try {
    matchs.map(e => {
      // Decode utf16 to emoji
      var emojiCode = e.match(/emoji([0-9a-fA-F]+)/)[1].substr(0, 5);
      var emoji = String.fromCodePoint(parseInt(emojiCode, 16));
      text = decodeText = text.split(e).join(emoji);
    });
  } catch (ex) {
    console.error('Failed decode %s: %o', text, ex);
  }

  return decodeText;
}

function decodeHTML(text = '') {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function isChatRoom(userid) {
  return userid && userid.startsWith('@@');
}
