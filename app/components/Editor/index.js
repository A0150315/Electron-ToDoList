import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Lollipop from '../icons/Lollipop.tsx';
import Edit from '../icons/Edit.tsx';
import Icecream from '../icons/Icecream.tsx';
import Picker from '../Flatpickr';
import styles from './Editor.css';

interface Props {
  [key: string]: any;
}

const Editor = ({
  isShowEditorPage,
  list,
  editingItemIndex,
  handdleImage,
  handleTextAreaChange,
  handleInputChange,
  returnDefault,
  handleDeadlineChange,
  setProgressBarStatus
}) => {
  const [isShowprogress, setIsShowprogress] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    let isShowprogressBar = false;
    if (list[editingItemIndex]) {
      isShowprogressBar = list[editingItemIndex].isShowprogress;
    }
    setIsShowprogress(isShowprogressBar);
  }, []);

  return (
    <div
      role="presentation"
      style={isShowEditorPage ? { top: 0 } : { top: '400px' }}
      className={`${styles.page} ${isPickerOpen ? styles.page_blur : ''}`}
      onDrop={proxy => {
        handdleImage(editingItemIndex, proxy);
        proxy.stopPropagation();
        proxy.preventDefault();
      }}
    >
      <p className={styles.titleBlock}>
        <i className={`${styles.titleFace} ${styles.titleFace_left}`}>
          <Lollipop />
        </i>
        <span className={styles.title}>
          <Edit /> <span>陈小怡的待办事项</span>
        </span>
        <i className={`${styles.titleFace} ${styles.titleFace_right}`}>
          <Icecream />
        </i>
      </p>
      {list[editingItemIndex] && (
        <div className={styles.mainText}>
          <div style={{ padding: '0 16px' }}>
            <textarea
              placeholder="请输入您的待办事项"
              maxLength="100"
              className={styles.textarea}
              type="text"
              value={list[editingItemIndex].main}
              onChange={handleTextAreaChange}
              onClick={proxy => proxy.stopPropagation()}
            />
            <input
              placeholder="请输入正确的链接地址"
              className={styles.input}
              type="text"
              value={list[editingItemIndex].link}
              onChange={handleInputChange}
              onClick={proxy => proxy.stopPropagation()}
              onKeyDown={$event => {
                if ($event.which === 13) {
                  returnDefault();
                  $event.stopPropagation();
                  $event.preventDefault();
                }
              }}
            />

            {/* <input
                  value={e.startTime}
                  onChange={handleStartTimeChange}
                  type="datetime-local"
                  onClick={proxy => proxy.stopPropagation()}
                /> */}
            {/* <input
              value={list[editingItemIndex].deadline}
              className={styles.input}
              onChange={handleDeadlineChange}
              type="datetime-local"
              onClick={proxy => proxy.stopPropagation()}
            /> */}
            <Picker
              onClick={proxy => proxy.stopPropagation()}
              options={{
                enableTime: true,
                wrap: true,
                onOpen() {
                  setIsPickerOpen(true);
                },
                onClose() {
                  setIsPickerOpen(false);
                },
                onChange(selectedDates, str) {
                  handleDeadlineChange({
                    target: {
                      value: str
                    }
                  });
                }
              }}
            >
              <div className={styles.input}>
                <input
                  type="text"
                  placeholder="请选择结束时间"
                  data-input
                  defaultValue={list[editingItemIndex].deadline}
                  className={styles['date-selector']}
                />

                <div
                  className={styles['picker-toggle']}
                  title="点击关闭"
                  data-toggle
                  style={{ display: isPickerOpen ? 'block' : 'none' }}
                />

                <a className={styles['picker-button']} title="清除" data-clear>
                  &times;
                </a>
              </div>
            </Picker>
            <div className={styles['checkbox-Block']}>
              <div
                role="presentation"
                className={styles['checkbox-Element']}
                onClick={proxy => {
                  proxy.stopPropagation();
                  setProgressBarStatus(!isShowprogress);
                  setIsShowprogress(!isShowprogress);
                }}
              >
                <span
                  className={
                    isShowprogress
                      ? `${styles.checkbox} ${styles.checkbox_active}`
                      : styles.checkbox
                  }
                />
                开启滚动条
              </div>
            </div>
            {list[editingItemIndex].img && (
              <img
                className={styles.img}
                src={list[editingItemIndex].img}
                alt="#"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Editor);
