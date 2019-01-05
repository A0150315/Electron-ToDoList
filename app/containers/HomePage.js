import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../components/Home';
import AddBottom from '../components/AddBottom';
import Timer from '../utils/Timer';
import {
  outputUserData, // 输出用户数据文件
  outputImgCache, // 输出图片缓存
  getUserData // 获取用户数据
} from '../utils/FileController';
import * as viewbroadcastActions from '../actions/viewbroadcast';

import routes from '../constants/routes.json';
import EditorPage from './EditorPage';

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
      listTimer: null,
      isMoving: false,
      mouseX: 0,
      mouseY: 0,
      top: 340,
      left: 190,
      isAllowAddItem: true,
      isShowEditorPage: false
    };
  }

  async componentDidMount() {
    let list = await getUserData(); // 下版本正式启用
    list = list ? JSON.parse(list) : [];
    this.setState(
      {
        list
      },
      () => {
        // new Timer的时候已完成定时器初始化
        // 待列表初始化完成后再初始化定时器
        this.setState({ listTimer: new Timer(list, this) });
      }
    );
  }

  startMoving = $event => {
    this.setState({
      isMoving: true,
      mouseX: $event.clientX - document.querySelector('#addBtn').offsetLeft,
      mouseY: $event.clientY - document.querySelector('#addBtn').offsetTop
    });
  };

  endMoving = () => {
    setTimeout(() => {
      this.setState({ isMoving: false, isAllowAddItem: true });
    });
  };

  move = $event => {
    const { state } = this;
    if (state.isAllowAddItem)
      this.setState({
        isAllowAddItem: false
      });
    let cX = $event.clientX - state.mouseX;
    let cY = $event.clientY - state.mouseY;
    if (cY <= 47) {
      cY = 47;
    } else if (cY >= 360) {
      cY = 360;
    }
    if (cX <= 0) {
      cX = 0;
    } else if (cX >= 210) {
      cX = 210;
    }
    this.setState({ left: cX, top: cY });
  };

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
        deadline: '',
        isDone: false,
        progressOffset: 0,
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
    if (event) event.stopPropagation();
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

  highlightToggle = index => {
    const { list } = this.state;
    list[index].isDone = !list[index].isDone;
    this.setState(
      {
        list
      },
      () => {
        outputUserData(list);
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

  handleProgressChange = (index, event) => {
    if (event.target.getAttribute('name') === 'progressbarContainer') {
      const progressOffset = event.nativeEvent.offsetX;
      const { list } = this.state;
      list[index].progressOffset = progressOffset;
      this.setState(
        {
          list
        },
        () => {
          outputUserData(list);
        }
      );
    }
  };

  handdleImage = async (index, event) => {
    const fileName = event.dataTransfer.files[0].name; // 文件名
    const sourcePath = event.dataTransfer.files[0].path; // 原文件路径
    const destPath = await outputImgCache(fileName, sourcePath);
    const { list } = this.state;
    list[index].img = destPath;
    this.setState(
      {
        list
      },
      () => {
        outputUserData(list);
      }
    );
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
      this.hideEditorPage();
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
        this.hideEditorPage();
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
    state.listTimer.list = newList;
    state.listTimer[`${type}Timer`](key);
    outputUserData(newList);
  };

  showEditorPageToggle = () => {
    this.setState({ isShowEditorPage: true });
  };

  hideEditorPageToggle = () => {
    this.setState({ isShowEditorPage: false });
  };

  hideEditorPage = () => {
    const { props, state } = this;
    if (props.location.pathname === '/editor') {
      this.hideEditorPageToggle();
      setTimeout(() => {
        props.history.goBack();
      }, 200);
    }
    if (props.location.pathname === '/' && state.editingItemIndex !== -1) {
      props.history.push('editor');
      setTimeout(() => {
        this.showEditorPageToggle();
      }, 200);
    }
  };

  render() {
    const { state } = this;
    return (
      <div
        onClick={() => this.returnDefault()}
        role="presentation"
        style={{ width: '100%' }}
        onMouseDown={proxy => {
          if (proxy.target.getAttribute('name') === 'addBtn') {
            proxy.stopPropagation();
            proxy.preventDefault();
            this.startMoving(proxy);
          }
        }}
        onMouseUp={proxy => {
          proxy.preventDefault();
          proxy.stopPropagation();
          this.endMoving();
        }}
        onMouseMove={proxy => {
          if (state.isMoving) {
            proxy.preventDefault();
            proxy.stopPropagation();
            this.move(proxy);
          }
        }}
      >
        <Home
          list={state.list}
          handleInputChange={this.handleInputChange}
          handleStartTimeChange={this.handleStartTimeChange}
          handleDeadlineChange={this.handleDeadlineChange}
          highlightToggle={this.highlightToggle}
          handdleImage={this.handdleImage}
          editItem={this.editItem}
          handleTextAreaChange={this.handleTextAreaChange}
          handleProgressChange={this.handleProgressChange}
          deleteItem={this.deleteItem}
          editingItemIndex={state.editingItemIndex}
          returnDefault={this.returnDefault}
        />
        <AddBottom
          addItem={this.addItem}
          top={state.top}
          left={state.left}
          isAllowAddItem={state.isAllowAddItem}
          editingItemIndex={state.editingItemIndex}
        />
        <Switch>
          <Route
            path={routes.EDITOR}
            render={() => (
              <EditorPage
                list={state.list}
                isShowEditorPage={state.isShowEditorPage}
                showEditorPageToggle={this.showEditorPageToggle}
                handleInputChange={this.handleInputChange}
                handleStartTimeChange={this.handleStartTimeChange}
                handleDeadlineChange={this.handleDeadlineChange}
                highlightToggle={this.highlightToggle}
                handdleImage={this.handdleImage}
                editItem={this.editItem}
                handleTextAreaChange={this.handleTextAreaChange}
                handleProgressChange={this.handleProgressChange}
                deleteItem={this.deleteItem}
                editingItemIndex={state.editingItemIndex}
                returnDefault={this.returnDefault}
              />
            )}
          />
        </Switch>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
