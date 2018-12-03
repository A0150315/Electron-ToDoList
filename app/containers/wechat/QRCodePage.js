import axios from 'axios';
import React, { Component } from 'react';
// import Login from './modules/Login';

export default class QRCodePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { uuid: '' };
  }

  async componentDidMount() {
    const response = await axios.get(
      `https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=en_US&_=${new Date()}`
    );
    const uuid = response.data.match(/[A-Za-z_\-\d]{10}==/)[0];
    this.setState({
      uuid
    });
  }

  render() {
    const { state } = this;
    return (
      <div>
        <img src={`https://login.weixin.qq.com/qrcode/${state.uuid}`} alt="#" />
      </div>
    );
  }
}
