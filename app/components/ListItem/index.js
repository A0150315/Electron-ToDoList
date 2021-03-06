import React from 'react';
import { shell } from 'electron';

import styles from './ListItem.css';

import ProgressBar from '../ProgressBar';

const nowDays = new Date();

const ListItem = ({
  handdleImage,
  index,
  isDone,
  highlightToggle,
  listLength,
  editItem,
  main,
  link,
  deadline,
  img,
  deleteItem,
  credit,
  isShowprogress,
  progressOffset,
  handleProgressChange
}) => {
  const openBrowser = (linkString, proxy) => {
    proxy.stopPropagation();
    shell.openExternal(linkString);
    return true;
  };

  const formatDatetimeLocal = dateTimeLocalString => {
    const date = new Date(dateTimeLocalString);
    const hours = '' + date.getHours();
    const min = '' + date.getMinutes();

    return `${
      date.getFullYear() !== nowDays.getFullYear()
        ? date.getFullYear() + '年'
        : ''
    }${date.getMonth() + 1}月${date.getDate()}日 ${hours.padStart(
      2,
      '0'
    )}:${min.padStart(2, '0')}`;
  };

  return (
    <li
      className={styles.mainBlock}
      role="presentation"
      onDrop={proxy => {
        handdleImage(index, proxy);
        proxy.stopPropagation();
        proxy.preventDefault();
      }}
    >
      <i
        className={
          !isDone ? styles.order : `${styles.order} ${styles.order_active}`
        }
        onClick={() => {
          highlightToggle(index);
        }}
        role="presentation"
        name="order"
      >
        {listLength - index}
      </i>
      <div
        role="presentation"
        className={styles.mainText}
        onClick={proxy => editItem(index, proxy)}
      >
        <div>{main}</div>
        {link && (
          <div>
            <a
              href="javascript:void(0)"
              onClick={proxy => openBrowser(link, proxy)}
              rel="noreferrer noopener"
            >
              {link}
            </a>
            <br />
          </div>
        )}
        {/* <div>
              Start Time:
              <br />
              {e.startTime}
            </div> */}
        {deadline && <div>{formatDatetimeLocal(deadline)}</div>}
        {img && <img className={styles.img} src={img} alt="#" />}
        <svg
          viewBox="64 64 896 896"
          data-icon="delete"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="false"
          className={styles.deleteIcon}
          onClick={proxy => deleteItem(index, credit, proxy)}
          role="presentation"
        >
          <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
        </svg>
      </div>
      {isShowprogress && (
        <ProgressBar
          index={index}
          progressOffset={progressOffset}
          handleProgressChange={handleProgressChange}
        />
      )}
    </li>
  );
};

export default ListItem;
