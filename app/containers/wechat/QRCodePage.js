import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import Login from './modules/Login';

import * as wechatActions from '../../actions/wechat';

class QRCodePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { LoginServer: new Login(), uuid: '' };
  }

  async componentDidMount() {
    await this.setUuid();
    console.log(this.props);
    this.checkLoginState();
  }

  async setUuid() {
    const { state } = this;
    const uuid = await state.LoginServer.setUuid();
    this.setState({ uuid }, () => {
      console.log(this.state);
    });
  }

  async checkLoginState() {
    const { state, props } = this;
    const loginState = await state.LoginServer.check();
    switch (loginState.code) {
      case 200:
        console.log('登录成功');

        ipcRenderer.send('closeWechat');
        // Set your weChat network route, otherwise you will got a code '1102'
        state.LoginServer.setAuthAddress(loginState.redirect_uri);

        // Login success, create session
        await state.LoginServer.createSession();

        await state.LoginServer.initUser();
        await state.LoginServer.keepalive();
        // .catch(() => this.logout());

        return loginState;
      case 201:
        // Confirm to login
        props.setAvatar(loginState.userAvatar);
        this.checkLoginState();
        console.log('等待确认登录');
        return loginState;

      case 400:
        // QR Code has expired
        console.log('二维码过期');
        return loginState;

      default:
        console.log('未登录');
        // Continue call server and waite
        this.checkLoginState();
    }
  }

  render() {
    const { state, props } = this;
    return (
      <div>
        <img src={`https://login.weixin.qq.com/qrcode/${state.uuid}`} alt="#" />
        <img src={props.wechat.avatar} alt="#" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { wechat: state.wechat };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(wechatActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRCodePage);
