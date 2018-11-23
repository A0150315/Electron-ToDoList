import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import AddBottom from '../components/AddBottom';
import Timer from '../utils/Timer';
import * as viewbroadcastActions from '../actions/viewbroadcast';

class HomePage extends Component<Props> {
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
      editingItemIndex: -1,
      listTimer: null
    };
  }

  componentWillMount() {
    let list = window.localStorage.getItem('userData');
    list = list ? JSON.parse(list) : [];
    // new Timer的时候已完成定时器初始化
    this.setState(
      {
        list,
        listTimer: new Timer(list)
      },
      () => {
        const { state } = this;
        console.log(state.listTimer);
      }
    );
  }

  addItem = () => {
    // 添加一个空项目，并使其处于编辑状态
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
    // 使一个项目处于编辑状态
    event.stopPropagation();
    this.returnDefault(index);
  };

  deleteItem = (index, key, event) => {
    // 删除一个项目
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
        // 删除 index 项目定时器
        this.updateCache(nextState.list, key, 'delete');
      }
    );
  };

  handleChange = (event, type) => {
    // 处理输入框改变动作
    const { state } = this;
    const { editingItemIndex } = state;
    const list = [...state.list];
    list[editingItemIndex][type] = event.target.value;
    this.setState({ list });
  };

  handleTextAreaChange = event => {
    this.handleChange(event, 'main');
  };

  handleInputChange = event => {
    this.handleChange(event, 'link');
  };

  handleStartTimeChange = event => {
    this.handleChange(event, 'startTime');
  };

  handleDeadlineChange = event => {
    this.handleChange(event, 'deadline');
  };

  returnDefault = (index = -1) => {
    // 列表统一处理函数
    const { state } = this;
    if (
      // textarea 无输入，删除
      state.editingItemIndex !== -1 &&
      !state.list[state.editingItemIndex].main
    ) {
      const { key } = state.list[state.editingItemIndex];
      const isContinue: boolean = window.confirm('你确定不写点什么？');
      if (!isContinue) return;
      let newEditingItemIndex;
      if (index >= state.editingItemIndex) {
        newEditingItemIndex = index - 1;
      } else {
        newEditingItemIndex = index;
      }
      const newList = [
        // 整理后的列表
        ...state.list.slice(0, state.editingItemIndex),
        ...state.list.slice(state.editingItemIndex + 1, state.list.length)
      ];
      this.setState(
        {
          editingItemIndex: newEditingItemIndex,
          list: newList
        },
        () => {
          // 删除 editingItemIndex 项目的定时器
          this.updateCache(newList, key, 'delete');
        }
      );
    } else {
      this.setState({ editingItemIndex: index }, () => {
        // 每次点击后更新本地列表
        if (state.editingItemIndex !== index && state.editingItemIndex !== -1) {
          // 重置 editingItemIndex 项目的定时器
          const { key } = state.list[state.editingItemIndex];
          this.updateCache(state.list, key, 'update');
        }
      });
    }
  };

  // 更新本地缓存 定时器
  updateCache = (newList, key, type) => {
    const { state } = this;
    window.localStorage.setItem('userData', JSON.stringify(newList));
    state.listTimer.list = newList;
    state.listTimer[`${type}Timer`](key);
  };

  render() {
    const { state } = this;
    const { viewbroadcast } = this.props;
    console.log(viewbroadcast);
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

function mapStateToProps(state) {
  return { viewbroadcast: state.viewbroadcast };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(viewbroadcastActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
