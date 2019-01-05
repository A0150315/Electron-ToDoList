import React, { Component } from 'react';
import { shell } from 'electron';

import styles from './Home.css';

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
      <div
        className={styles.container}
        style={
          props.editingItemIndex !== -1
            ? { transform: 'translateY(-100%)' }
            : {}
        }
      >
        <DaysTimer />
        <p className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {props.list
            .map((e, i) => {
              const listLength = props.list.length;
              if (e.main) {
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
                      <svg
                        viewBox="64 64 896 896"
                        data-icon="delete"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="false"
                        className={styles.deleteIcon}
                        onClick={proxy => props.deleteItem(i, e.key, proxy)}
                        role="presentation"
                      >
                        <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
                      </svg>
                    </div>
                    <ProgressBar
                      index={i}
                      item={e}
                      handleProgressChange={props.handleProgressChange}
                    />
                  </li>
                );
              }
              return null;
            })
            .reverse()}
        </ul>
      </div>
    );
  }
}

export default Home;
