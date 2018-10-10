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

  componentWillMount() {
    const list = window.localStorage.getItem('userData');
    if (list)
      this.setState({
        list: JSON.parse(list)
      });
  }

  addItem = () => {
    const { state } = this;
    if (
      state.editingItemIndex !== -1 &&
      !state.list[state.editingItemIndex].main
    ) {
      return false;
    }
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

  editItem = (index, event) => {
    event.stopPropagation();
    this.returnDefault(index);
  };

  deleteItem = (index, event) => {
    event.stopPropagation();
    this.setState(
      prevState => ({
        editingItemIndex: -1,
        list: [
          ...prevState.list.slice(0, index),
          ...prevState.list.slice(index + 1, prevState.list.length)
        ]
      }),
      () => {
        const { state } = this;
        window.localStorage.setItem('userData', JSON.stringify(state.list));
      }
    );
    // this.returnDefault(index);
  };

  handleTextAreaChange = event => {
    console.log(event.target.style);
    console.log(event.target.scrollHeight);
    // event.target.style.heigth = event.target.scrollHeight + 'px';
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

  handleDateTimeChange = event => {
    const { state } = this;
    const { editingItemIndex } = state;
    const list = [...state.list];
    list[editingItemIndex].time = event.target.value;
    this.setState({
      list
    });
    console.log(list);
  };

  returnDefault = (index = -1) => {
    console.log(12);
    const { state } = this;
    if (
      state.editingItemIndex !== -1 &&
      !state.list[state.editingItemIndex].main
    ) {
      this.setState(prevState => ({
        editingItemIndex: index,
        list: prevState.list.slice(0, prevState.list.length - 1)
      }));
    } else {
      this.setState({ editingItemIndex: index }, () => {
        window.localStorage.setItem('userData', JSON.stringify(state.list));
      });
    }
  };

  render() {
    const { state } = this;
    return (
      <div
        onClick={() => this.returnDefault()}
        role="presentation"
        style={{ width: '100%' }}
      >
        <Home
          list={state.list}
          handleInputChange={this.handleInputChange}
          handleDateTimeChange={this.handleDateTimeChange}
          editItem={this.editItem}
          handleTextAreaChange={this.handleTextAreaChange}
          deleteItem={this.deleteItem}
          editingItemIndex={state.editingItemIndex}
          returnDefault={this.returnDefault}
        />
        <AddBottom addItem={this.addItem} />
      </div>
    );
  }
}
