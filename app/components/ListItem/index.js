import React, { Component } from 'react';
import styles from './ListItem.css';

import ProgressBar from '../ProgressBar';

export default class DaysTimer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = this;
    return (
      <li
        className={styles.mainBlock}
        role="presentation"
        onDrop={proxy => {
          props.handdleImage(props.index, proxy);
          proxy.stopPropagation();
          proxy.preventDefault();
        }}
      >
        <i
          className={
            !props.isDone
              ? styles.order
              : `${styles.order} ${styles.order_active}`
          }
          onClick={() => {
            props.highlightToggle(props.index);
          }}
          role="presentation"
          name="order"
        >
          {props.listLength - props.index}
        </i>
        <div
          role="presentation"
          className={styles.mainText}
          onClick={proxy => props.editItem(props.index, proxy)}
        >
          <div>{props.main}</div>
          {props.link && (
            <div>
              <a
                href="javascript:void(0)"
                onClick={proxy => this.openBrowser(props.link, proxy)}
                rel="noreferrer noopener"
              >
                {props.link}
              </a>
              <br />
            </div>
          )}
          {/* <div>
                      Start Time:
                      <br />
                      {e.startTime}
                    </div> */}
          {props.deadline && (
            <div>{this.formatDatetimeLocal(props.deadline)}</div>
          )}
          {props.img && <img className={styles.img} src={props.img} alt="#" />}
          <svg
            viewBox="64 64 896 896"
            data-icon="delete"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="false"
            className={styles.deleteIcon}
            onClick={proxy => props.deleteItem(props.index, props.key, proxy)}
            role="presentation"
          >
            <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
          </svg>
        </div>
        <ProgressBar
          index={props.index}
          progressOffset={props.progressOffset}
          handleProgressChange={props.handleProgressChange}
        />
      </li>
    );
  }
}
