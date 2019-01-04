import React, { Component } from 'react';
import { shell } from 'electron';

import styles from './Home.css';

import deleteIcon from '../../img/deleteIcon.png'; // 垃圾桶图标

import DaysTimer from '../DaysTimer';
import ProgressBar from '../ProgressBar';

class Home extends Component<Props> {
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

  // pushH = () => {
  //   console.log(this);
  //   this.props.history.push('editor');
  // };

  render() {
    const { props } = this;
    return (
      <div className={styles.container}>
        <DaysTimer />
        <p className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {props.list
            .map((e, i) => {
              const listLength = props.list.length;
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
                  <ProgressBar
                    index={i}
                    item={e}
                    handleProgressChange={props.handleProgressChange}
                  />
                </li>
              );
            })
            .reverse()}
        </ul>
      </div>
    );
  }
}

export default Home;
