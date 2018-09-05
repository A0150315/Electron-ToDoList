// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import AddBottom from '../components/AddBottom';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      list: [
        // {
        //   main:'车是事实是事实的事发生发射点反对 士大夫大师傅似的是是',
        //   link:'www.baidu.com',
        //   img:''
        // }
      ],
      editingItemIndex: -1
    };
  }

  addItem = () => {
    this.setState(prevState => ({
      editingItemIndex: prevState.list.length,
      list: prevState.list.concat({
        main: '',
        link: '',
        img: '',
        key: btoa(prevState.list.length + new Date().getTime())
      })
    }));
  };

  handleTextAreaChange = event => {
    const { state } = this;
    const { editingItemIndex } = state;
    const list = [...state.list];
    list[editingItemIndex].main = event.target.value;
    this.setState({
      list
    });
  };

  handleInputChange = event => {
    const { state } = this;
    const { editingItemIndex } = state;
    const list = [...state.list];
    list[editingItemIndex].link = event.target.value;
    this.setState({
      list
    });
  };

  returnDefault = () => {
    this.setState({
      editingItemIndex: -1
    });
  };

  render() {
    const { state } = this;
    return (
      <div
        onClick={this.returnDefault}
        role="presentation"
        style={{ width: '100%' }}
      >
        <Home
          list={state.list}
          handleInputChange={this.handleInputChange}
          handleTextAreaChange={this.handleTextAreaChange}
          editingItemIndex={state.editingItemIndex}
        />
        <AddBottom addItem={this.addItem} />
      </div>
    );
  }
}
