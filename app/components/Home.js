import React, { Component } from 'react';
import { shell } from 'electron';

import styles from './Home.css';

import deleteIcon from '../img/deleteIcon.png'; // 垃圾桶图标

export default class Home extends Component<Props> {
  props: Props;

  componentDidMount() {}

  openBrowser = (linkString, proxy) => {
    proxy.stopPropagation();
    shell.openExternal(linkString);
    return true;
  };

  render() {
    // ipcRenderer.send('add');
    const { props } = this;
    return (
      <div className={styles.container}>
        <p className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {/* {props.editingItemIndex}   */}
          {props.list.map((e, i) => (
            <li
              key={e.key}
              className={styles.mainBlock}
              onClick={proxy => props.editItem(i, proxy)}
              role="presentation"
              onDrop={proxy => {
                props.handdleImage(i, proxy);
                proxy.stopPropagation();
                proxy.preventDefault();
              }}
            >
              <i className={styles.order}>{i + 1}</i>
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
                  <img src={e.img} alt="#" className={styles.img} />
                </div>
              ) : (
                <div className={styles.mainText}>
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
                  <br />
                  {/* <div>
                    Start Time:
                    <br />
                    {e.startTime}
                  </div> */}
                  {e.deadline && (
                    <div>
                      Deadline:
                      <br />
                      {e.deadline}
                    </div>
                  )}
                  {e.img && <img className={styles.img} src={e.img} alt="#" />}
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
          ))}
        </ul>
      </div>
    );
  }
}
