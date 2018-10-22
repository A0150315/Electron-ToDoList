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
    const { state } = this;
    event.stopPropagation();
    let newEditingItemIndex = -1;
    if (state.editingItemIndex !== -1) {
      if (state.editingItemIndex > index) {
        newEditingItemIndex = state.editingItemIndex - 1;
      } else {
        newEditingItemIndex = state.editingItemIndex;
      }
    }
    this.setState(
      prevState => ({
        editingItemIndex: newEditingItemIndex,
        list: [
          ...prevState.list.slice(0, index),
          ...prevState.list.slice(index + 1, prevState.list.length)
        ]
      }),
      () => {
        const nextState = this.state;
        window.localStorage.setItem('userData', JSON.stringify(nextState.list));
      }
    );
    // this.returnDefault(index);
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

  handleStartTimeChange = event => {
    const { state } = this;
    const { editingItemIndex } = state;
    const list = [...state.list];
    list[editingItemIndex].startTime = event.target.value;
    this.setState({
      list
    });
  };

  handleDeadlineChange = event => {
    const { state } = this;
    const { editingItemIndex } = state;
    const list = [...state.list];
    list[editingItemIndex].deadline = event.target.value;
    this.setState({
      list
    });
  };

  returnDefault = (index = -1) => {
    const { state } = this;
    console.log('index:', index);
    console.log('state.editingItemIndex:', state.editingItemIndex);
    if (
      state.editingItemIndex !== -1 &&
      !state.list[state.editingItemIndex].main
    ) {
      const isContinue: boolean = window.confirm('你确定不写点什么？');
      if (!isContinue) return;
      let newEditingItemIndex;
      if (index >= state.editingItemIndex) {
        newEditingItemIndex = index - 1;
      } else {
        newEditingItemIndex = index;
      }
      this.setState(
        prevState => ({
          editingItemIndex: newEditingItemIndex,
          list: [
            ...prevState.list.slice(0, prevState.editingItemIndex),
            ...prevState.list.slice(
              prevState.editingItemIndex + 1,
              prevState.list.length
            )
          ]
        }),
        () => {
          setTimeout(() => {
            window.localStorage.setItem(
              'userData',
              JSON.stringify([
                ...state.list.slice(0, state.editingItemIndex),
                ...state.list.slice(
                  state.editingItemIndex + 1,
                  state.list.length
                )
              ])
            );
          }, 100);
        }
      );
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
          handleStartTimeChange={this.handleStartTimeChange}
          handleDeadlineChange={this.handleDeadlineChange}
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
