// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Editor.css';

interface Props {
  [key: string]: any;
}

class Editor extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isShowprogress: false
    };
  }

  componentDidMount() {
    const { props } = this;
    setTimeout(() => {
      props.showEditorPageToggle();
    });
    let isShowprogressBar = false;
    if (props.list[props.editingItemIndex]) {
      isShowprogressBar = props.list[props.editingItemIndex].isShowprogress;
    }
    this.setState({
      isShowprogress: isShowprogressBar
    });
  }

  render() {
    const { props, state } = this;
    return (
      <div
        role="presentation"
        style={props.isShowEditorPage ? { top: 0 } : { top: '400px' }}
        className={styles.page}
        onDrop={proxy => {
          props.handdleImage(props.editingItemIndex, proxy);
          proxy.stopPropagation();
          proxy.preventDefault();
        }}
      >
        <p className={styles.titleBlock}>
          <i className={`${styles.titleFace} ${styles.titleFace_left}`}>
            <svg
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 1024 1024"
            >
              <path
                d="M685.2 820.5l-11.6-2.5c-5.4-1.2-8.9-6.5-7.7-11.9l45.2-210.4 31.2 6.7-45.2 210.4c-1.1 5.4-6.5 8.9-11.9 7.7z"
                fill="#FFFFFF"
                p-id="2283"
              />
              <path
                d="M683 830.7c-1.9 0-3.8-0.2-5.6-0.6l-0.5-0.1c-14.4-3.1-23.5-17.3-20.5-31.6l44-204.9c1.3-5.9 7.1-9.7 13-8.4l31.2 6.7c2.8 0.6 5.3 2.3 6.9 4.8 1.6 2.4 2.1 5.4 1.5 8.2l-44 204.9c-1.5 7-5.6 12.9-11.6 16.8-4.3 2.7-9.3 4.2-14.4 4.2z m36.6-222l-41.7 194.2c-0.5 2.6 1.1 5.1 3.6 5.6l0.5 0.1c1.7 0.4 2.9-0.3 3.6-0.7 0.6-0.4 1.7-1.3 2.1-3l41.7-194.2-9.8-2z"
                fill="#232323"
                p-id="2284"
              />
              <path
                d="M76.6 244.4h463.5v533.8H76.6z"
                fill="#FFE092"
                p-id="2285"
              />
              <path
                d="M540.1 792.3H76.6c-7.8 0-14.1-6.3-14.1-14.1V244.4c0-7.8 6.3-14.1 14.1-14.1h463.5c7.8 0 14.1 6.3 14.1 14.1v533.8c0 7.8-6.4 14.1-14.1 14.1zM90.6 764.2H526V258.5H90.6v505.7z"
                fill="#232323"
                p-id="2286"
              />
              <path
                d="M76.6 220.1v-10.7l25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9 25.7-13.9 25.8 13.9v10.7"
                fill="#EDF4FC"
                p-id="2287"
              />
              <path
                d="M540.1 232.6c-6.9 0-12.5-5.6-12.5-12.5v-3.2l-13.2-7.2-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.9 10.8c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-13.2 7.2v3.2c0 6.9-5.6 12.5-12.5 12.5s-12.5-5.6-12.5-12.5v-10.7c0-4.6 2.5-8.8 6.6-11l25.8-13.9c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l25.7 13.9c4 2.2 6.6 6.4 6.6 11v10.7c-0.1 6.8-5.7 12.4-12.6 12.4z"
                fill="#232323"
                p-id="2288"
              />
              <path
                d="M76.6 803.9v10.7l25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9 25.7 13.9 25.8-13.9v-10.7"
                fill="#EDF4FC"
                p-id="2289"
              />
              <path
                d="M205.3 841c-2 0-4.1-0.5-6-1.5l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0L128 828.8l-19.8 10.7c-3.7 2-8.2 2-11.9 0l-25.8-13.9c-4-2.2-6.6-6.4-6.6-11v-10.7c0-6.9 5.6-12.5 12.5-12.5s12.5 5.6 12.5 12.5v3.2l13.2 7.2 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 19.8-10.7c3.7-2 8.2-2 11.9 0l19.8 10.7 13.2-7.2v-3.2c0-6.9 5.6-12.5 12.5-12.5s12.5 5.6 12.5 12.5v10.7c0 4.6-2.5 8.8-6.6 11L520 839.5c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-3.7 2-8.2 2-11.9 0l-19.8-10.7-19.8 10.7c-1.6 1-3.6 1.5-5.7 1.5z"
                fill="#232323"
                p-id="2290"
              />
              <path
                d="M208.9 466.2c-4.4 7.1-11.3 13.5-20.6 19.9-12.1 8.3-23.7 11.1-36.8 8-13-3-25.5-11.2-37.4-25.1-12.7-14.7-19.3-30.2-17.9-46.6 1.4-16.3 10.7-30.3 27.7-40.3 10.5-6.2 20.5-9.7 29.5-11 4.7 7.2 9.3 14.4 13.8 21.6-9.5-0.5-18.9 1.9-27.7 7-9.7 5.7-15.1 13.5-16.2 22.9-1.2 9.4 2.3 18.9 9.7 28.6 7.1 9.2 14.8 14.8 23.2 17.1 8.4 2.3 16.2 0.8 24-4.2 7.5-4.8 13.3-11 17.6-18.9 3.8 7.1 7.5 14.1 11.1 21zM298.3 436.5c-7.4 1.7-14.7 3.6-21.8 5.7-4.4-14.1-9.1-28.3-14.2-42.5-14.7 4-29 8.9-42.9 14.6 6.6 14 12.9 28 18.8 42-6.7 3-13.3 6.1-19.8 9.5-16.4-34-35.2-67.9-56.2-101.3 8.5-3.9 17.1-7.6 25.9-11 7.6 13.6 14.8 27.2 21.7 40.9 14.6-5.8 29.7-10.8 45.1-14.9-5.4-13.9-11.1-27.8-17.2-41.7 9.2-2.3 18.5-4.4 27.9-6.1 13 35 24 70 32.7 104.8zM335.1 430.3c-7.6 0.8-15.2 1.9-22.7 3.3-7.5-34.7-17.1-69.7-29-105 9.5-1.4 19-2.4 28.6-3.1 9.9 35.3 17.6 70.3 23.1 104.8zM369.7 392.9c1.3 11.9 2.4 23.7 3.2 35.4-7.8 0-15.6 0.3-23.3 0.8-4.3-34.3-10.7-69.2-19.3-104.6 15.2-0.5 30.5-0.3 45.8 0.7 33.1 2.4 50.6 17.4 50.9 38.9 0.3 10.3-4.1 17.7-12.4 22.8-8.3 5.1-19.1 7.1-32.8 6.4-4.1-0.2-8.1-0.3-12.1-0.4z m-7-50.3c1.8 10.9 3.4 21.8 4.8 32.6 3.5 0.1 6.9 0.2 10.4 0.4 14.1 0.7 20.9-3.8 20-14.7-0.8-10.6-9-17-24.2-17.8-3.6-0.2-7.3-0.4-11-0.5zM427.9 428.9c0.4-7.3 0.7-14.7 0.9-22.1 4.5 4.2 9.2 7.6 14.4 10.3 5.1 2.8 10.3 4.8 15.6 6.1 3.1 0.8 5.9 1.3 8.3 1.4 2.4 0.2 4.4 0 6.1-0.4 1.7-0.4 3-1.1 3.9-2 0.9-0.9 1.5-2.1 1.7-3.5 0.3-1.9-0.1-3.7-1.2-5.6-1.1-1.9-2.6-3.8-4.7-5.7-2.1-1.9-4.6-3.9-7.5-5.9-3-2-6.2-4.1-9.7-6.2-8.9-5.5-15.7-10.8-20.2-16.5-4.6-5.6-7-11.8-7.2-18.6-0.2-5.3 1-9.7 3.5-13 2.5-3.3 6.1-5.8 10.7-7.3s10-2 16.2-1.6c6.2 0.4 12.8 1.7 19.7 3.8 6.8 2.1 12.8 4.4 17.9 6.8 5.2 2.5 9.9 5.2 14.1 8.2-0.7 6.9-1.5 13.7-2.3 20.4-1.9-1.9-4.1-3.8-6.4-5.6-2.4-1.8-4.8-3.4-7.4-4.9-2.6-1.5-5.1-2.8-7.7-3.9-2.6-1.1-5-2.1-7.4-2.8-3.2-1-6.2-1.6-8.8-1.9-2.7-0.3-4.9-0.2-6.7 0.2-1.8 0.4-3.3 1.1-4.3 2.1s-1.5 2.3-1.6 3.8c-0.1 1.7 0.5 3.3 1.5 4.9 1 1.6 2.5 3.3 4.4 5 1.9 1.7 4.3 3.5 7 5.5 2.7 1.9 5.8 4 9.2 6.3 4.6 3.1 8.7 6.3 12.2 9.4 3.5 3.1 6.4 6.3 8.7 9.6 2.3 3.3 3.9 6.6 4.7 10 0.9 3.4 0.9 7 0.2 10.8-1 5.2-3.1 9.1-6.1 11.7-3 2.6-6.7 4.3-11 5.2-4.3 0.8-9.1 0.9-14.3 0.4-5.3-0.6-10.7-1.6-16.4-3-5.8-1.5-11.3-3.1-16.5-5.1-5.3-1.7-9.7-3.9-13.5-6.3z"
                fill="#EA3934"
                p-id="2291"
              />
              <path
                d="M296.4 707.9s-100.9-38.2-88-118.9c12.9-80.7 120.5-101.6 187.7-71.3C463.3 548 468 583 468 583s-115.5 38.7-171.6 124.9z"
                fill="#EFE627"
                p-id="2292"
              />
              <path
                d="M296.4 718.8c-1.3 0-2.6-0.2-3.9-0.7-1.1-0.4-27.2-10.4-52-31-34-28.3-48.9-62.8-43-99.9 5.2-32.5 24.4-58.6 55.5-75.3 42.7-23 102-24.7 147.5-4.2 70.7 31.9 77.7 69.6 78.3 73.8 0.7 5.2-2.4 10.2-7.4 11.9-1.1 0.4-112.6 38.6-165.9 120.5-1.9 3.1-5.4 4.9-9.1 4.9z m34.7-203.4c-24.1 0-48.2 5.3-67.6 15.8-17.3 9.3-39.1 27.3-44.3 59.5-9.4 58.4 51.2 93 73.3 103.5 48.9-68.8 131.8-106 161.3-117.6-5.9-10.8-21.6-30.5-62.2-48.9-18.2-8.2-39.4-12.3-60.5-12.3z"
                fill="#232323"
                p-id="2293"
              />
              <path
                d="M296.4 707.9s-32.4-93.7 26.2-133.1S468 583 468 583s-115.5 38.7-171.6 124.9z"
                fill="#EE9426"
                p-id="2294"
              />
              <path
                d="M296.4 718.8c-0.4 0-0.9 0-1.3-0.1-4.2-0.5-7.7-3.3-9-7.3-1.4-4.1-34.4-102.1 30.4-145.8 63.4-42.7 153 5.6 156.8 7.7 3.8 2.1 6 6.2 5.6 10.6s-3.3 8-7.4 9.4c-1.1 0.4-112.6 38.6-165.9 120.5-2 3.2-5.5 5-9.2 5z m82-148.7c-17.2 0-34.6 3.6-49.7 13.7-34.8 23.4-32.4 70.7-27.3 98.5 42.6-52.8 104.2-85 138.2-100-15.9-5.8-38.4-12.2-61.2-12.2z"
                fill="#232323"
                p-id="2295"
              />
              <path
                d="M766.3 424m-179.5 0a179.5 179.5 0 1 0 359 0 179.5 179.5 0 1 0-359 0Z"
                fill="#FFD2D2"
                p-id="2296"
              />
              <path
                d="M766.7 619.2c-13.8 0-27.6-1.5-41.4-4.4C620.1 592.2 552.9 488.2 575.5 383c22.6-105.2 126.6-172.4 231.8-149.8 51 10.9 94.6 41.1 122.9 84.9 28.3 43.8 37.9 95.9 26.9 146.9-10.9 51-41.1 94.6-84.9 122.9-31.9 20.6-68.3 31.3-105.5 31.3z m-0.4-359.1c-75.5 0-143.7 52.7-160.2 129.5-19 88.3 37.5 175.6 125.8 194.6 42.8 9.2 86.6 1.2 123.3-22.6 36.8-23.8 62.1-60.4 71.2-103.2 9.2-42.8 1.2-86.6-22.6-123.3-23.8-36.8-60.4-62.1-103.2-71.2-11.4-2.6-23-3.8-34.3-3.8z"
                fill="#232323"
                p-id="2297"
              />
              <path
                d="M777.7 554.3h-1.4c-2.1 0-4.3-0.1-6.4-0.2-2.1-0.1-4.3-0.3-6.4-0.6-2.1-0.2-4.3-0.5-6.4-0.9-2.1-0.3-4.3-0.7-6.4-1.2h-0.2c-2.1-0.5-52.4-12.5-81.6-56.2-21.6-32.4-50.5-99.1-1.3-182.4 3.5-6 11.2-7.9 17.1-4.4 6 3.5 7.9 11.2 4.4 17.1-40.1 68-21.9 122.2 0.5 155.8 23.1 34.6 64.4 45.2 66.3 45.6 1.7 0.4 3.4 0.7 5 0.9 1.7 0.3 3.5 0.5 5.2 0.7 1.7 0.2 3.5 0.3 5.2 0.4 1.7 0.1 3.5 0.2 5.2 0.2 1.7 0 3.5 0 5.2-0.1l5.1-0.3c1.7-0.2 3.4-0.3 5.1-0.6 1.7-0.2 3.4-0.5 5-0.8 1.7-0.3 3.3-0.7 5-1.1 1.6-0.4 3.3-0.8 4.9-1.3 1.6-0.5 3.2-1 4.8-1.6 1.6-0.6 3.2-1.2 4.7-1.8 1.5-0.6 3.1-1.3 4.6-2 1.5-0.7 3-1.5 4.4-2.2 1.5-0.8 2.9-1.6 4.3-2.4 1.4-0.8 2.8-1.7 4.2-2.7 1.3-0.9 2.7-1.9 4-2.9l3.9-3c1.3-1 2.5-2.1 3.7-3.2 1.2-1.1 2.4-2.2 3.5-3.4 1.1-1.1 2.2-2.3 3.3-3.5 1.1-1.2 2.1-2.4 3.1-3.7 1-1.2 2-2.5 2.9-3.8 0.9-1.3 1.9-2.6 2.7-3.9 0.9-1.3 1.7-2.7 2.5-4.1 0.8-1.4 1.6-2.8 2.3-4.2l2.1-4.2c0.6-1.4 1.3-2.9 1.8-4.3 0.6-1.4 1.1-2.9 1.6-4.4 0.5-1.5 1-3 1.4-4.4l1.2-4.5c0.3-1.5 0.7-3 0.9-4.5 0.3-1.5 0.5-3 0.7-4.5 0.2-1.5 0.3-3.1 0.5-4.6 0.1-1.5 0.2-3.1 0.2-4.6V432c0-1.5-0.1-3-0.2-4.5s-0.3-3-0.5-4.5-0.4-3-0.7-4.4c-0.3-1.4-0.6-2.9-0.9-4.4-0.3-1.4-0.7-2.9-1.1-4.3-0.4-1.4-0.8-2.8-1.3-4.2-0.5-1.4-1-2.8-1.5-4.1-0.5-1.4-1.1-2.7-1.7-4-0.6-1.3-1.2-2.6-1.9-3.9-0.7-1.3-1.4-2.6-2.1-3.8-0.7-1.3-1.5-2.5-2.3-3.7-0.8-1.2-1.6-2.4-2.4-3.5-0.8-1.1-1.7-2.3-2.6-3.4-0.9-1.1-1.8-2.2-2.8-3.2-0.9-1-1.9-2.1-2.9-3.1s-2-2-3-2.9c-1-0.9-2.1-1.9-3.2-2.8-1.1-0.9-2.2-1.8-3.3-2.6-1.1-0.8-2.2-1.6-3.4-2.4-1.1-0.8-2.3-1.5-3.5-2.2-1.2-0.7-2.4-1.4-3.6-2-1.2-0.6-2.4-1.3-3.7-1.8-1.2-0.6-2.5-1.1-3.7-1.6-1.2-0.5-2.5-1-3.8-1.4-1.3-0.4-2.6-0.9-3.8-1.2-1.3-0.4-2.6-0.7-3.9-1-1.3-0.3-2.6-0.6-3.9-0.8-1.3-0.2-2.6-0.5-3.9-0.6-1.3-0.2-2.6-0.3-3.9-0.4-1.3-0.1-2.6-0.2-3.9-0.2-1.3 0-2.6-0.1-3.9 0-1.3 0-2.6 0.1-3.9 0.2l-3.9 0.3c-1.3 0.1-2.6 0.3-3.8 0.5-1.3 0.2-2.5 0.5-3.8 0.7-1.2 0.3-2.5 0.6-3.7 0.9-1.2 0.3-2.4 0.7-3.6 1.1-1.2 0.4-2.4 0.8-3.6 1.3-1.2 0.4-2.3 0.9-3.5 1.4-1.2 0.5-2.3 1-3.4 1.6-1.1 0.6-2.2 1.1-3.3 1.8-1.1 0.6-2.1 1.2-3.2 1.9-1 0.7-2 1.3-3 2.1-1 0.7-2 1.4-2.9 2.2-1 0.8-1.9 1.5-2.8 2.3-0.9 0.8-1.8 1.6-2.7 2.5-0.9 0.8-1.7 1.7-2.5 2.6l-2.4 2.7c-0.8 0.9-1.5 1.8-2.2 2.8-0.7 0.9-1.4 1.9-2.1 2.9-0.7 1-1.3 2-1.9 2.9-0.6 1-1.2 2-1.7 3-0.6 1-1.1 2-1.6 3.1-0.5 1-1 2.1-1.4 3.2-0.4 1.1-0.9 2.1-1.3 3.2s-0.8 2.2-1.1 3.2l-0.9 3.3c-0.3 1.1-0.5 2.2-0.7 3.3l-0.6 3.3c-0.2 1.1-0.3 2.2-0.4 3.3-0.1 1.1-0.2 2.2-0.2 3.3 0 1.1-0.1 2.2-0.1 3.3 0 1.1 0 2.2 0.1 3.3 0.1 1.1 0.2 2.2 0.3 3.2 0.1 1.1 0.3 2.1 0.4 3.2 0.2 1.1 0.4 2.1 0.6 3.2 0.2 1 0.5 2.1 0.7 3.1 0.3 1 0.6 2 0.9 3.1 0.3 1 0.7 2 1 3 0.4 1 0.8 2 1.2 2.9 0.4 1 0.8 1.9 1.3 2.8 0.5 0.9 0.9 1.8 1.4 2.7 0.5 0.9 1 1.8 1.6 2.6 0.5 0.9 1.1 1.7 1.7 2.5l1.8 2.4c0.6 0.8 1.3 1.6 1.9 2.3 0.6 0.8 1.3 1.5 2 2.2l2.1 2.1c0.7 0.7 1.5 1.3 2.2 2 0.7 0.6 1.5 1.2 2.3 1.8 0.8 0.6 1.6 1.2 2.4 1.7 0.8 0.6 1.6 1.1 2.4 1.6 0.8 0.5 1.6 1 2.5 1.4 0.8 0.5 1.7 0.9 2.5 1.3 0.9 0.4 1.7 0.8 2.6 1.2 0.9 0.4 1.7 0.7 2.6 1 0.9 0.3 1.8 0.6 2.6 0.9 0.9 0.3 1.8 0.5 2.7 0.8l2.7 0.6c0.9 0.2 1.8 0.3 2.7 0.5l2.7 0.3c1.8 0.2 3.5 0.3 5.4 0.3 1.8 0 3.5-0.1 5.3-0.3 1.7-0.2 3.5-0.5 5.1-0.8 1.7-0.4 3.3-0.8 5-1.3 1.6-0.5 3.2-1.1 4.7-1.8s3-1.4 4.4-2.2c1.4-0.8 2.8-1.7 4.1-2.6 1.3-0.9 2.6-1.9 3.8-3 1.2-1 2.3-2.1 3.4-3.3 1.1-1.1 2.1-2.3 3-3.5 0.9-1.2 1.8-2.5 2.6-3.7 0.8-1.3 1.5-2.6 2.2-3.9 0.6-1.3 1.2-2.7 1.7-4 0.5-1.4 0.9-2.7 1.3-4.1 0.3-1.4 0.6-2.8 0.8-4.1 0.2-1.4 0.3-2.8 0.4-4.1 0.1-1.4 0-2.7 0-4.1-0.1-1.3-0.2-2.7-0.4-4-0.2-1.3-0.5-2.6-0.8-3.8-0.3-1.2-0.7-2.5-1.2-3.7-0.5-1.2-1-2.3-1.5-3.4-0.6-1.1-1.2-2.2-1.8-3.2-0.7-1-1.4-2-2.1-2.9-0.7-0.9-1.5-1.8-2.3-2.6-0.8-0.8-1.7-1.6-2.5-2.3-0.9-0.7-1.8-1.4-2.7-2-0.9-0.6-1.8-1.2-2.8-1.7-1-0.5-1.9-0.9-2.9-1.3s-2-0.7-2.9-1c-1-0.3-2-0.5-2.9-0.7-1-0.2-1.9-0.3-2.9-0.3-1.5-0.1-2.9-0.1-4.3 0s-2.7 0.3-4 0.7c-1.3 0.3-2.5 0.7-3.7 1.2-1.2 0.5-2.3 1-3.3 1.7-1 0.6-2 1.3-2.9 2.1-0.9 0.7-1.6 1.5-2.3 2.4-0.7 0.8-1.3 1.7-1.8 2.6-0.5 0.9-1 1.7-1.3 2.6-0.4 0.9-0.6 1.8-0.8 2.7-0.2 0.9-0.3 1.7-0.4 2.5-0.1 0.8 0 1.7 0 2.4 0.1 0.7 0.2 1.5 0.4 2.1 0.2 0.7 0.4 1.3 0.7 2 0.3 0.6 0.5 1.1 0.8 1.6 0.3 0.5 0.7 0.9 1.1 1.4 0.3 0.3 0.7 0.7 1 0.9 0.7 0.5 1.5 1 2.2 1.2 0.7 0.2 1.1 0.3 1.4 0.3 1.1-5.5 5.7-9.7 11.5-10.1 6.9-0.4 12.8 4.8 13.3 11.7 0.2 3-0.4 6.1-1.6 9-1.1 2.6-2.8 5-4.9 7.2-2.2 2.2-4.9 4-8 5.2-2.9 1.2-6.1 1.9-9.4 2-3.4 0.1-6.8-0.4-10.2-1.5-3.3-1.1-6.5-2.8-9.4-5-1.5-1.1-2.9-2.4-4.2-3.9-1.3-1.4-2.5-2.9-3.5-4.5-1.1-1.6-2.1-3.4-2.9-5.3-0.8-1.8-1.5-3.7-2-5.7s-0.9-4.1-1.1-6.2c-0.2-2.1-0.2-4.2-0.1-6.4s0.5-4.4 1-6.6c0.5-2.1 1.2-4.3 2-6.4 0.9-2.1 1.9-4.2 3.1-6.2 1.2-2 2.6-3.9 4.1-5.7 1.5-1.8 3.3-3.6 5.1-5.2 1.9-1.6 3.9-3.1 6-4.4 2.1-1.3 4.4-2.5 6.8-3.5 2.4-1 4.9-1.8 7.4-2.4 2.5-0.6 5.2-1.1 7.9-1.3 2.7-0.2 5.4-0.3 8.1-0.1 1.8 0.1 3.7 0.3 5.5 0.7 1.8 0.3 3.7 0.7 5.4 1.2 1.8 0.5 3.6 1.1 5.4 1.8 1.8 0.7 3.5 1.5 5.2 2.4 1.7 0.9 3.4 1.9 5 3s3.2 2.3 4.7 3.5c1.5 1.3 3 2.6 4.4 4a56 56 0 0 1 4 4.5c1.3 1.6 2.5 3.3 3.6 5 1.1 1.7 2.2 3.5 3.1 5.4 0.9 1.9 1.8 3.8 2.6 5.8s1.4 4 2 6.1c0.6 2 1 4.2 1.4 6.3 0.4 2.1 0.6 4.3 0.7 6.5 0.1 2.2 0.2 4.4 0.1 6.6-0.1 2.2-0.3 4.5-0.6 6.7s-0.8 4.5-1.3 6.7c-0.6 2.2-1.2 4.4-2 6.6-0.8 2.1-1.7 4.3-2.7 6.4-1 2.1-2.1 4.2-3.4 6.2-1.2 2-2.6 4-4 5.9-1.4 1.9-3 3.7-4.6 5.5-1.6 1.8-3.4 3.4-5.2 5-1.8 1.6-3.8 3.1-5.8 4.5s-4.1 2.7-6.3 4c-2.2 1.2-4.4 2.3-6.7 3.3s-4.7 1.9-7.1 2.7c-2.4 0.8-4.9 1.4-7.4 1.9s-5.1 0.9-7.6 1.2c-2.6 0.3-5.2 0.4-7.8 0.4-2.6 0-5.3-0.1-7.9-0.4-1.3-0.1-2.6-0.3-3.9-0.5-1.3-0.2-2.6-0.4-3.9-0.7l-3.9-0.9c-1.3-0.3-2.6-0.7-3.9-1.1-1.3-0.4-2.6-0.8-3.9-1.3-1.3-0.5-2.5-1-3.8-1.5-1.3-0.5-2.5-1.1-3.7-1.7-1.2-0.6-2.5-1.2-3.7-1.9l-3.6-2.1c-1.2-0.7-2.4-1.5-3.5-2.3-1.1-0.8-2.3-1.6-3.4-2.5-1.1-0.8-2.2-1.7-3.3-2.6-1.1-0.9-2.1-1.8-3.1-2.8l-3-3c-1-1-1.9-2.1-2.9-3.1l-2.7-3.3c-0.9-1.1-1.7-2.3-2.6-3.4l-2.4-3.6c-0.8-1.2-1.5-2.5-2.2-3.7-0.7-1.3-1.4-2.6-2-3.9-0.7-1.3-1.3-2.7-1.9-4-0.6-1.3-1.1-2.7-1.6-4.1-0.5-1.4-1-2.8-1.4-4.2-0.5-1.4-0.9-2.9-1.2-4.3-0.4-1.4-0.7-2.9-1-4.3-0.3-1.4-0.6-2.9-0.8-4.4l-0.6-4.5c-0.2-1.5-0.3-3-0.4-4.5-0.1-1.5-0.1-3-0.1-4.5s0-3.1 0.1-4.6c0.1-1.5 0.2-3 0.3-4.6 0.1-1.5 0.3-3.1 0.6-4.6 0.2-1.5 0.5-3 0.8-4.6 0.3-1.5 0.6-3.1 1-4.5 0.4-1.5 0.8-3 1.3-4.5s1-3 1.5-4.4c0.5-1.5 1.1-2.9 1.7-4.4 0.6-1.4 1.3-2.9 1.9-4.3 0.7-1.4 1.4-2.8 2.2-4.2 0.8-1.4 1.6-2.8 2.4-4.1 0.8-1.3 1.7-2.7 2.6-4 0.9-1.3 1.8-2.6 2.8-3.9 1-1.3 2-2.5 3-3.8 1-1.2 2.1-2.4 3.2-3.6 1.1-1.2 2.2-2.3 3.4-3.5 1.1-1.1 2.4-2.2 3.6-3.3 1.2-1.1 2.5-2.1 3.8-3.1 1.3-1 2.6-2 3.9-2.9 1.3-1 2.7-1.9 4.1-2.8 1.4-0.9 2.8-1.7 4.2-2.6 1.4-0.8 2.9-1.6 4.4-2.4 1.5-0.7 3-1.5 4.5-2.1 1.5-0.7 3.1-1.3 4.6-1.9 1.5-0.6 3.1-1.2 4.7-1.7l4.8-1.5c1.6-0.4 3.3-0.9 4.9-1.2 1.6-0.4 3.3-0.7 5-1 1.7-0.3 3.4-0.5 5.1-0.7 1.7-0.2 3.4-0.4 5.1-0.5 1.7-0.1 3.4-0.2 5.2-0.2 1.7 0 3.5 0 5.2 0.1 1.7 0.1 3.4 0.2 5.2 0.3 1.7 0.1 3.5 0.3 5.2 0.6 1.7 0.2 3.5 0.5 5.2 0.8 1.7 0.3 3.4 0.7 5.1 1.1 1.7 0.4 3.4 0.9 5.1 1.4 1.7 0.5 3.4 1 5 1.6 1.7 0.6 3.3 1.2 5 1.9 1.7 0.7 3.3 1.4 4.9 2.1l4.8 2.4c1.6 0.8 3.1 1.7 4.7 2.6 1.5 0.9 3.1 1.9 4.6 2.9 1.5 1 3 2.1 4.4 3.1 1.4 1.1 2.9 2.2 4.3 3.4 1.4 1.2 2.8 2.4 4.1 3.6 1.3 1.2 2.7 2.5 3.9 3.8 1.3 1.3 2.6 2.6 3.8 4l3.6 4.2c1.2 1.4 2.3 2.9 3.4 4.4 1.1 1.5 2.2 3 3.2 4.6 1 1.5 2 3.1 2.9 4.7 0.9 1.6 1.8 3.2 2.7 4.9 0.9 1.7 1.7 3.4 2.5 5.1 0.8 1.7 1.5 3.4 2.2 5.2 0.7 1.7 1.3 3.5 1.9 5.3 0.6 1.8 1.2 3.6 1.7 5.4 0.5 1.8 1 3.7 1.4 5.5 0.4 1.9 0.8 3.8 1.1 5.6l0.9 5.7 0.6 5.7c0.1 1.9 0.2 3.9 0.3 5.8 0.1 1.9 0.1 3.9 0 5.8 0 1.9-0.1 3.9-0.3 5.8-0.1 1.9-0.3 3.9-0.6 5.8-0.2 1.9-0.5 3.9-0.9 5.8-0.3 1.9-0.7 3.9-1.2 5.8-0.4 1.9-0.9 3.8-1.5 5.7-0.5 1.9-1.1 3.8-1.8 5.6-0.6 1.9-1.3 3.7-2 5.6-0.7 1.9-1.5 3.7-2.3 5.5-0.8 1.8-1.7 3.6-2.6 5.4-0.9 1.8-1.9 3.5-2.9 5.3-1 1.7-2.1 3.4-3.2 5.1-1.1 1.7-2.2 3.3-3.4 5-1.2 1.6-2.4 3.3-3.7 4.8-1.3 1.6-2.6 3.1-3.9 4.6l-4.2 4.5c-1.4 1.4-2.9 2.9-4.4 4.2-1.5 1.4-3.1 2.7-4.6 4-1.6 1.3-3.2 2.6-4.8 3.8-1.7 1.2-3.4 2.4-5 3.6-1.7 1.1-3.5 2.3-5.2 3.3-1.8 1.1-3.6 2.1-5.4 3.1-1.8 1-3.7 1.9-5.6 2.8-1.9 0.9-3.8 1.7-5.7 2.5-1.9 0.8-3.9 1.5-5.9 2.2-2 0.7-4 1.4-6 2-2 0.6-4.1 1.2-6.1 1.7s-4.1 1-6.2 1.4c-2.1 0.4-4.2 0.7-6.3 1-2.1 0.3-4.2 0.5-6.3 0.7-2.1 0.2-4.3 0.3-6.4 0.4-2.2-0.2-3.9-0.2-5.6-0.2z m0.5-121.9z"
                fill="#FF7B7B"
                p-id="2298"
              />
              <path
                d="M766.7 614.5c-13.4 0-26.9-1.4-40.4-4.3C623.7 588.1 558.1 486.6 580.1 384c22.1-102.7 123.5-168.3 226.2-146.2 49.7 10.7 92.3 40.1 119.9 82.8 27.6 42.7 36.9 93.6 26.3 143.4-10.7 49.7-40.1 92.3-82.8 119.9-31.2 20.2-66.7 30.6-103 30.6z m-0.4-359.1c-77.7 0-147.8 54.2-164.7 133.2-19.5 90.9 38.5 180.7 129.4 200.2 44 9.5 89.1 1.2 126.9-23.2 37.8-24.4 63.8-62.1 73.3-106.1 9.5-44 1.2-89.1-23.2-126.9s-62.1-63.8-106.1-73.3c-12.1-2.7-23.9-3.9-35.6-3.9z"
                fill="#232323"
                p-id="2299"
              />
            </svg>
          </i>
          <span className={styles.title}>
            <svg
              viewBox="64 64 896 896"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
            </svg>
            <span> 陈小怡的待办事项</span>
          </span>
          <i className={`${styles.titleFace} ${styles.titleFace_right}`}>
            <svg
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 1024 1024"
            >
              <path
                d="M787.7 717.7l-255.5-89.8c-16.2-5.7-24.7-23.5-19-39.7l124-352.6c18.9-53.7 77.8-82 131.5-63.1l119.7 42.1c53.7 18.9 82 77.8 63.1 131.5l-124 352.6c-5.8 16.2-23.6 24.7-39.8 19z"
                fill="#FFF2D4"
                p-id="2258"
              />
              <path
                d="M786.3 730.4c-7.3 0-14.7-1.2-22-3.8l-219.4-77.1c-16.7-5.9-30.2-17.9-37.9-33.9-7.7-16-8.7-34-2.8-50.8l96.6-274.7c33.4-95 137.9-145.2 233-111.8 46 16.2 83 49.3 104.1 93.3 21.1 44 23.8 93.6 7.6 139.6L849 686c-9.6 27.3-35.3 44.4-62.7 44.4z m-12.9-530.1c-62.1 0-120.3 38.7-142 100.5l-96.6 274.7c-3 8.6-2.5 17.9 1.4 26.1 3.9 8.2 10.9 14.4 19.5 17.4L775 696.1c8.6 3 17.9 2.5 26.1-1.4 8.2-3.9 14.4-10.9 17.4-19.5l96.6-274.7c13.3-37.9 11.1-78.7-6.3-114.9s-47.8-63.5-85.7-76.8c-16.4-5.8-33.2-8.5-49.7-8.5z"
                fill="#232323"
                p-id="2259"
              />
              <path
                d="M598 881.8l-20.6-7.2c-9.2-3.2-14.1-13.3-10.8-22.6L633 663.3l54 19L620.6 871c-3.2 9.2-13.4 14.1-22.6 10.8z"
                fill="#B77737"
                p-id="2260"
              />
              <path
                d="M597.3 896c-5 0-10-0.8-14.9-2.6-11.3-4-20.3-12.1-25.5-22.9-5.2-10.8-5.8-22.9-1.9-34.2L617.7 658c1.4-4 4.4-7.4 8.3-9.2 3.9-1.9 8.3-2.1 12.3-0.7l54 19c8.4 3 12.8 12.2 9.9 20.6l-62.7 178.4c-4 11.3-12.1 20.3-22.9 25.5-6.1 2.9-12.7 4.4-19.3 4.4z m45.6-212.1l-57.4 163.2c-1.1 3.1-0.9 6.5 0.5 9.5s4 5.3 7.1 6.4c3.1 1.1 6.5 0.9 9.5-0.5s5.3-4 6.4-7.1l57.4-163.2-23.5-8.3z"
                fill="#232323"
                p-id="2261"
              />
              <path
                d="M641.5 578.4l-12.4-4.4c-5.6-2-8.5-8.1-6.5-13.6l82.7-234c2-5.6 8.1-8.5 13.6-6.5l12.4 4.4c5.6 2 8.5 8.1 6.5 13.6l-82.7 234c-2 5.5-8.1 8.4-13.6 6.5zM743.2 614.3l-12.4-4.4c-5.6-2-8.5-8.1-6.5-13.6l82.7-234c2-5.6 8.1-8.5 13.6-6.5l12.4 4.4c5.6 2 8.5 8.1 6.5 13.6l-82.7 234c-1.9 5.6-8 8.5-13.6 6.5z"
                fill="#FFE092"
                p-id="2262"
              />
              <path
                d="M398.5 282.7c2.4-9 3.6-18.5 3.6-28.2 0-61-49.4-110.4-110.4-110.4-61 0-110.4 49.4-110.4 110.4 0 9.7 1.3 19.2 3.6 28.2-56.5 4.8-100.8 52.2-100.8 110 0 61 49.4 110.4 110.4 110.4h194.4c61 0 110.4-49.4 110.4-110.4 0-57.7-44.3-105.1-100.8-110z"
                fill="#FFFFFF"
                p-id="2263"
              />
              <path
                d="M388.9 519.3H194.5C124.7 519.3 68 462.5 68 392.7c0-31.9 11.9-62.4 33.5-85.8 17.4-18.9 39.9-31.9 64.6-37.5-0.6-4.9-0.9-9.9-0.9-14.9 0-69.8 56.8-126.6 126.6-126.6s126.6 56.8 126.6 126.6c0 5-0.3 9.9-0.9 14.9 24.7 5.7 47.1 18.6 64.6 37.5 21.6 23.4 33.5 53.9 33.5 85.8-0.1 69.8-56.9 126.6-126.7 126.6z m-97.2-359c-52 0-94.2 42.3-94.2 94.2 0 8.2 1 16.3 3.1 24.1 1.2 4.6 0.3 9.5-2.4 13.4-2.7 3.9-7.1 6.4-11.8 6.8-48.3 4.1-86.1 45.4-86.1 93.9 0 52 42.3 94.2 94.2 94.2h194.4c52 0 94.2-42.3 94.2-94.2 0-48.5-37.8-89.8-86.1-93.9-4.8-0.4-9.1-2.9-11.8-6.8-2.7-3.9-3.6-8.8-2.4-13.4 2.1-7.8 3.1-15.9 3.1-24.1 0.1-51.9-42.2-94.2-94.2-94.2z"
                fill="#232323"
                p-id="2264"
              />
              <path
                d="M304.6 859.9l138.9-367H137.9l138.9 367c4.8 12.8 22.9 12.8 27.8 0z"
                fill="#F2A846"
                p-id="2265"
              />
              <path
                d="M290.7 869c-16.8 0-31.6-10.2-37.5-25.9L122.8 498.6c-1.9-5-1.2-10.5 1.8-14.9s8-7 13.3-7h305.5c5.3 0 10.3 2.6 13.3 7s3.7 9.9 1.8 14.9L328.2 843.1c-6 15.7-20.7 25.9-37.5 25.9zM161.3 509l122.1 322.6c1.7 4.6 5.7 5 7.3 5 1.6 0 5.6-0.5 7.3-5L420 509H161.3z"
                fill="#232323"
                p-id="2266"
              />
              <path
                d="M183.8 540.6h-33.2c-15 0-27.2-13.5-27.2-30.1s12.2-30.1 27.2-30.1h280.1c15 0 27.2 13.5 27.2 30.1s-12.2 30.1-27.2 30.1H398"
                fill="#F2A846"
                p-id="2267"
              />
              <path
                d="M430.7 556.8H398v-32.3h32.8c6 0 11-6.4 11-14s-5.1-14-11-14H150.6c-6 0-11 6.4-11 14s5.1 14 11 14h33.2v32.3h-33.2c-23.9 0-43.3-20.8-43.3-46.3s19.4-46.3 43.3-46.3h280.1c23.9 0 43.3 20.8 43.3 46.3s-19.4 46.3-43.3 46.3z"
                fill="#232323"
                p-id="2268"
              />
              <path
                d="M343.2 656.6c-4.5 0-8.9-2.6-11-6.9l-34.6-72.8c-2.9-6-0.3-13.3 5.7-16.1 6-2.9 13.3-0.3 16.1 5.8l34.6 72.8c2.9 6 0.3 13.3-5.7 16.1-1.6 0.7-3.3 1.1-5.1 1.1z"
                fill="#B77737"
                p-id="2269"
              />
              <path
                d="M319.1 725.4c-4.4 0-8.7-2.4-10.8-6.6l-64.7-127.4c-3-6-0.7-13.3 5.3-16.3s13.3-0.7 16.3 5.3l64.7 127.4c3 6 0.7 13.3-5.3 16.3-1.8 0.9-3.6 1.3-5.5 1.3z"
                fill="#B77737"
                p-id="2270"
              />
              <path
                d="M269.4 732c-1.6 0-3.3-0.3-4.9-1-6.1-2.7-8.9-9.8-6.2-16l63.5-144.3c2.7-6.1 9.8-8.9 16-6.2 6.1 2.7 8.9 9.8 6.2 16l-63.5 144.3c-2 4.5-6.4 7.2-11.1 7.2z"
                fill="#B77737"
                p-id="2271"
              />
              <path
                d="M239 680.8c-1.6 0-3.2-0.3-4.7-1-6.2-2.6-9-9.7-6.4-15.9l39.5-93.1c2.6-6.2 9.7-9 15.9-6.4 6.2 2.6 9 9.7 6.4 15.9l-39.5 93.1c-2 4.6-6.4 7.4-11.2 7.4z"
                fill="#B77737"
                p-id="2272"
              />
            </svg>
          </i>
        </p>
        {props.list[props.editingItemIndex] && (
          <div className={styles.mainText}>
            <div style={{ padding: '0 16px' }}>
              <textarea
                placeholder="请输入您的待办事项"
                maxLength="100"
                className={styles.textarea}
                type="text"
                value={props.list[props.editingItemIndex].main}
                onChange={props.handleTextAreaChange}
                onClick={proxy => proxy.stopPropagation()}
              />
              <input
                placeholder="请输入正确的链接地址"
                className={styles.input}
                type="text"
                value={props.list[props.editingItemIndex].link}
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
                value={props.list[props.editingItemIndex].deadline}
                className={styles.input}
                onChange={props.handleDeadlineChange}
                type="datetime-local"
                onClick={proxy => proxy.stopPropagation()}
              />
              <div className={styles['checkbox-Block']}>
                <div
                  role="presentation"
                  className={styles['checkbox-Element']}
                  onClick={proxy => {
                    proxy.stopPropagation();
                    props.setProgressBarStatus(!state.isShowprogress);
                    this.setState({
                      isShowprogress: !state.isShowprogress
                    });
                  }}
                >
                  <span
                    className={
                      state.isShowprogress
                        ? `${styles.checkbox} ${styles.checkbox_active}`
                        : styles.checkbox
                    }
                  />
                  开启滚动条
                </div>
              </div>
              {props.list[props.editingItemIndex].img && (
                <img
                  className={styles.img}
                  src={props.list[props.editingItemIndex].img}
                  alt="#"
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Editor);
