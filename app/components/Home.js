import React, { Component } from 'react';
import { shell } from 'electron';

import styles from './Home.css';

import deleteIcon from '../img/deleteIcon.png'; // 垃圾桶图标

import DaysTimer from './DaysTimer';

export default class Home extends Component<Props> {
  props: Props;

  openBrowser = (linkString, proxy) => {
    proxy.stopPropagation();
    shell.openExternal(linkString);
    return true;
  };

  formatDatetimeLocal = dateTimeLocalString => {
    const dateTimeLocalArray = dateTimeLocalString.split('T');
    return dateTimeLocalArray.join(' ');
  };

  render() {
    // ipcRenderer.send('add');
    const { props } = this;
    return (
      <div className={styles.container}>
        <DaysTimer />
        <p className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {/* {props.editingItemIndex}   */}
          {props.list
            .map((e, i) => {
              const listLength = props.list.length;
              console.log(e.isDone);
              return (
                <li
                  key={e.key}
                  className={styles.mainBlock}
                  role="presentation"
                  onDrop={proxy => {
                    props.handdleImage(i, proxy);
                    proxy.stopPropagation();
                    proxy.preventDefault();
                  }}
                >
                  <i
                    className={
                      !e.isDone
                        ? styles.order
                        : `${styles.order} ${styles.order_active}`
                    }
                    onClick={() => {
                      props.highlightToggle(i);
                    }}
                    role="presentation"
                  >
                    {listLength - i}
                  </i>
                  {props.editingItemIndex === i ? (
                    <div className={styles.mainText}>
                      <textarea
                        placeholder="请输入您的待办事项"
                        maxLength="100"
                        className={styles.textarea}
                        type="text"
                        value={e.main}
                        onChange={props.handleTextAreaChange}
                        onClick={proxy => proxy.stopPropagation()}
                      />
                      <input
                        placeholder="请输入正确的链接地址"
                        className={styles.input}
                        type="text"
                        value={e.link}
                        onChange={props.handleInputChange}
                        onClick={proxy => proxy.stopPropagation()}
                        onKeyDown={$event => {
                          if ($event.which === 13) {
                            props.returnDefault();
                            $event.stopPropagation();
                            $event.preventDefault();
                          }
                        }}
                      />

                      {/* <input
                    value={e.startTime}
                    onChange={props.handleStartTimeChange}
                    type="datetime-local"
                    onClick={proxy => proxy.stopPropagation()}
                  /> */}
                      <input
                        value={e.deadline}
                        className={styles.input}
                        onChange={props.handleDeadlineChange}
                        type="datetime-local"
                        onClick={proxy => proxy.stopPropagation()}
                      />
                      {e.img && (
                        <img className={styles.img} src={e.img} alt="#" />
                      )}
                    </div>
                  ) : (
                    <div
                      role="presentation"
                      className={styles.mainText}
                      onClick={proxy => props.editItem(i, proxy)}
                    >
                      <div>{e.main}</div>
                      {e.link && (
                        <div>
                          <a
                            href="javascript:void(0)"
                            onClick={proxy => this.openBrowser(e.link, proxy)}
                            rel="noreferrer noopener"
                          >
                            {e.link}
                          </a>
                          <br />
                        </div>
                      )}
                      {/* <div>
                    Start Time:
                    <br />
                    {e.startTime}
                  </div> */}
                      {e.deadline && (
                        <div>{this.formatDatetimeLocal(e.deadline)}</div>
                      )}
                      {e.img && (
                        <img className={styles.img} src={e.img} alt="#" />
                      )}
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className={styles.deleteIcon}
                        onClick={proxy => props.deleteItem(i, e.key, proxy)}
                        role="presentation"
                      />
                    </div>
                  )}
                </li>
              );
            })
            .reverse()}
        </ul>
      </div>
    );
  }
}
