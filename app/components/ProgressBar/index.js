import React, { Component } from 'react';
import styles from './ProgressBar.css';

export default class ProgressBar extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      isMoving: false
    };
  }

  render() {
    const { state, props } = this;
    return (
      <div
        name="progressbarContainer"
        className={styles.progressbarContainer}
        onClick={proxy => {
          props.handleProgressChange(props.index, proxy);
          proxy.stopPropagation();
          proxy.preventDefault();
        }}
        onMouseMove={proxy => {
          if (state.isMoving) {
            props.handleProgressChange(props.index, proxy);
            proxy.stopPropagation();
            proxy.preventDefault();
          }
        }}
        onMouseDown={proxy => {
          this.setState({ isMoving: true });
          proxy.stopPropagation();
          proxy.preventDefault();
        }}
        onMouseUp={proxy => {
          this.setState({ isMoving: false });
          proxy.stopPropagation();
          proxy.preventDefault();
        }}
        onMouseLeave={proxy => {
          this.setState({ isMoving: false });
          proxy.stopPropagation();
          proxy.preventDefault();
        }}
        role="presentation"
      >
        <i
          className={styles.progressbarPoint}
          style={{ left: props.item.progressOffset }}
          name="progressbarPoint"
        />
        <div className={styles.progressUnderBar} name="progressbarContainer" />
      </div>
    );
  }
}
