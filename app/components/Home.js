// @flow

import React, { Component } from 'react';
import { shell } from 'electron';

import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  openBrowser = (linkString, proxy) => {
    proxy.stopPropagation();
    shell.openExternal(linkString);
    return true;
  };

  render() {
    const { props } = this;
    return (
      <div className={styles.container}>
        <p className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {/* {props.editingItemIndex} */}
          {props.list.map((e, i) => (
            <li
              key={e.key}
              className={styles.mainBlock}
              onClick={proxy => props.editItem(i, proxy)}
              role="presentation"
            >
              <i className={styles.order}>{i + 1}</i>
              {props.editingItemIndex === i ? (
                <div className={styles.mainText}>
                  <textarea
                    type="text"
                    value={e.main}
                    onChange={props.handleTextAreaChange}
                    onClick={proxy => proxy.stopPropagation()}
                    onKeyDown={$event => {
                      if ($event.which === 13) {
                        props.returnDefault();
                        $event.stopPropagation();
                        $event.preventDefault();
                      }
                    }}
                  />
                  <input
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
                  <input
                    value={e.time}
                    onChange={props.handleDateTimeChange}
                    type="datetime-local"
                    onClick={proxy => proxy.stopPropagation()}
                  />
                  {e.img}
                </div>
              ) : (
                <div className={styles.mainText}>
                  <div>{e.main}</div>
                  <a
                    href="javascript:void(0)"
                    onClick={proxy => this.openBrowser(e.link, proxy)}
                    rel="noreferrer noopener"
                  >
                    {e.link}
                  </a>
                  {e.time}
                  <div>{e.img}</div>
                  <img
                    src="../resources/删除@2x.png"
                    alt="delete"
                    className={styles.deleteIcon}
                    onClick={proxy => props.deleteItem(i, proxy)}
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
