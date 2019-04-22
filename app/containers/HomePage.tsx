import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../components/Home';
import AddBottom from '../components/AddBottom';
import Timer from '../utils/Timer';
import {
  outputUserData, // 输出用户数据
  outputImgCache, // 输出图片缓存
  getUserData, // 获取用户数据
  getUserDataFromNet, // 从firebase获取用户数据
  outputLocalUserData, // 输出用户数据文件到本地
} from '../utils/FileController';
import * as viewbroadcastActions from '../actions/viewbroadcast';

import routes from '../constants/routes.json';
import EditorPage from './EditorPage.tsx';

function HomePage(props) {
  const [list, setList] = useState([]);
  const [editingItemIndex, setEditingItemIndex] = useState(-1);
  const [listTimer, setListTimer] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [top, setTop] = useState(340);
  const [left, setLeft] = useState(190);
  const [isAllowAddItem, setIsAllowAddItem] = useState(true);
  const [isShowEditorPage, setIsShowEditorPage] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const getList = async () => {
    let list = await getUserData()|| [];
    setList(list);

    list = await getUserDataFromNet() || [];
    setIsOnline(true)
    setList(list);
    outputLocalUserData(list)
  };

  const startMoving = $event => {
    setIsMoving(true);
    setMouseX($event.clientX - (document.querySelector('#addBtn') as HTMLElement).offsetLeft);
    setMouseY($event.clientY - (document.querySelector('#addBtn')  as HTMLElement).offsetTop);
  };

  const endMoving = () => {
    setTimeout(() => {
      setIsMoving(false);
      setIsAllowAddItem(true);
    });
  };

  const move = $event => {
    if (isAllowAddItem) setIsAllowAddItem(false);
    let cX = $event.clientX - mouseX;
    let cY = $event.clientY - mouseY;
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
    setLeft(cX);
    setTop(cY);
  };

  const addItem = () => {
    // 添加一个空项目，并使其处于编辑状态
    if (editingItemIndex !== -1 && !list[editingItemIndex].main) {
      return false;
    }
    setEditingItemIndex(list.length);
    setList(
      list.concat({
        main: '',
        link: '',
        img: '',
        deadline: '',
        isDone: false,
        progressOffset: 0,
        isShowprogress: true, // 是否显示进度条
        key: btoa(list.length + new Date().getTime())
      })
    );
  };

  const hideEditorPage = () => {
    setIsShowEditorPage(false);
  };

  const showEditorPage = () => {
    setIsShowEditorPage(true);
  };

  const pageHandler = () => {
    if (props.location.pathname === '/editor') {
      hideEditorPage();
      setTimeout(() => {
        props.history.goBack();
      }, 200);
    }
    if (props.location.pathname === '/' && editingItemIndex !== -1) {
      props.history.push('editor');
      setTimeout(() => {
        showEditorPage();
      }, 20);
    }
  };

  // 更新本地缓存 定时器
  const updateCache = (newList, key, type, timer = listTimer) => {
    timer.list = newList;
    timer[`${type}Timer`](key);
    outputUserData(newList);
  };

  const returnDefault = (index = -1) => {
    // 列表统一处理函数
    if (
      // textarea 无输入，删除
      editingItemIndex !== -1 &&
      !list[editingItemIndex].main
    ) {
      const { key } = list[editingItemIndex];
      const isContinue: boolean = window.confirm('你确定不写点什么？');
      if (!isContinue) return;
      let newEditingItemIndex;
      if (index >= editingItemIndex) {
        newEditingItemIndex = index - 1;
      } else {
        newEditingItemIndex = index;
      }
      const newList = [
        // 整理后的列表
        ...list.slice(0, editingItemIndex),
        ...list.slice(editingItemIndex + 1, list.length)
      ];
      setEditingItemIndex(newEditingItemIndex);
      setList(newList);
      updateCache(newList, key, 'delete');
    } else {
      setEditingItemIndex(index);
      // 每次点击后更新本地列表
      if (editingItemIndex !== index && editingItemIndex !== -1) {
        // 重置 editingItemIndex 项目的定时器
        const { key } = list[editingItemIndex];
        updateCache(list, key, 'update');
      }
    }
  };

  const editItem = (index, event) => {
    // 使一个项目处于编辑状态
    event.stopPropagation();
    returnDefault(index);
  };

  const deleteItem = (index, key, event, ...rest) => {
    // 删除一个项目
    if (event) event.stopPropagation();
    let newEditingItemIndex = -1;
    if (editingItemIndex !== -1) {
      if (editingItemIndex > index) {
        newEditingItemIndex = editingItemIndex - 1;
      } else {
        newEditingItemIndex = editingItemIndex;
      }
    }

    setEditingItemIndex(newEditingItemIndex);
    setList([...list.slice(0, index), ...list.slice(index + 1, list.length)]);
    // 删除 index 项目定时器
    updateCache(
      [...list.slice(0, index), ...list.slice(index + 1, list.length)],
      key,
      'delete',
      ...rest
    );
  };

  const highlightToggle = index => {
    list[index].isDone = !list[index].isDone;
    setList([...list]);
    outputUserData(list);
  };

  const handleChange = (event, type) => {
    // 处理输入框改变动作
    list[editingItemIndex][type] = event.target.value;
    setList([...list]);
  };

  const handleTextAreaChange = event => {
    handleChange(event, 'main');
  };

  const handleInputChange = event => {
    handleChange(event, 'link');
  };

  const handleStartTimeChange = event => {
    handleChange(event, 'startTime');
  };

  const handleDeadlineChange = event => {
    handleChange(event, 'deadline');
  };

  const handleProgressChange = (index, event) => {
    if (event.target.getAttribute('name') === 'progressbarContainer') {
      const progressOffset = event.nativeEvent.offsetX;
      list[index].progressOffset = progressOffset;
      setList([...list]);
      outputUserData(list);
    }
  };

  const handdleImage = async (index, event) => {
    const fileName = event.dataTransfer.files[0].name; // 文件名
    const sourcePath = event.dataTransfer.files[0].path; // 原文件路径
    const destPath = await outputImgCache(fileName, sourcePath);
    list[index].img = destPath;
    setList([...list]);
    outputUserData(list);
  };

  const setProgressBarStatus = bool => {
    list[editingItemIndex].isShowprogress = bool;
    setList([...list]);
    outputUserData(list);
  };

  useEffect(() => {
    getList();
  }, []);
  
  useEffect(() => {
    // new Timer的时候已完成定时器初始化
    // 待列表初始化完成后再初始化定时器
    if (list.length > 0 && !listTimer) {
      setListTimer(new Timer(list, { deleteItem }));
    }
  }, [list]);

  useEffect(() => {
    pageHandler();
  }, [editingItemIndex]);

  return (
    <div
      onClick={() => returnDefault()}
      
      role="presentation"
      style={{ width: '100%' }}
      onMouseDown={proxy => {
        if (proxy.target.getAttribute('name') === 'addBtn') {
          proxy.stopPropagation();
          proxy.preventDefault();
          startMoving(proxy);
        }
      }}
      onMouseUp={proxy => {
        proxy.preventDefault();
        proxy.stopPropagation();
        endMoving();
      }}
      onMouseMove={proxy => {
        if (isMoving) {
          proxy.preventDefault();
          proxy.stopPropagation();
          move(proxy);
        }
      }}
    >
      <Home
        isOnline={isOnline}
        list={list}
        handleInputChange={handleInputChange}
        handleStartTimeChange={handleStartTimeChange}
        handleDeadlineChange={handleDeadlineChange}
        highlightToggle={highlightToggle}
        handdleImage={handdleImage}
        editItem={editItem}
        handleTextAreaChange={handleTextAreaChange}
        handleProgressChange={handleProgressChange}
        deleteItem={deleteItem}
        editingItemIndex={editingItemIndex}
        returnDefault={returnDefault}
      />
      <AddBottom
        addItem={addItem}
        top={top}
        left={left}
        isAllowAddItem={isAllowAddItem}
        editingItemIndex={editingItemIndex}
      />
      <Switch>
        <Route
          path={routes.EDITOR}
          render={() => (
            <EditorPage
              list={list}
              isShowEditorPage={isShowEditorPage}
              handleInputChange={handleInputChange}
              handleStartTimeChange={handleStartTimeChange}
              handleDeadlineChange={handleDeadlineChange}
              highlightToggle={highlightToggle}
              handdleImage={handdleImage}
              editItem={editItem}
              handleTextAreaChange={handleTextAreaChange}
              handleProgressChange={handleProgressChange}
              deleteItem={deleteItem}
              editingItemIndex={editingItemIndex}
              returnDefault={returnDefault}
              setProgressBarStatus={setProgressBarStatus}
            />
          )}
        />
      </Switch>
    </div>
  );
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
