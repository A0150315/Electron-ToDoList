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
        <svg
          className={styles.progressbarPoint}
          style={{ left: props.progressOffset }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="572"
        >
          <path
            style={{ fill: '#fee5e8' }}
            d="M810.666667 682.666667m-170.666667 0a170.666667 170.666667 0 1 0 341.333333 0 170.666667 170.666667 0 1 0-341.333333 0Z"
            opacity=".16"
            p-id="573"
          />
          <path
            style={{ fill: '#fee5e8' }}
            d="M213.333333 682.666667m-170.666666 0a170.666667 170.666667 0 1 0 341.333333 0 170.666667 170.666667 0 1 0-341.333333 0Z"
            opacity=".16"
            p-id="574"
          />
          <path
            style={{ fill: '#fee5e8' }}
            d="M810.666667 469.333333c-8.533333 0-17.066667 0-25.6 2.133334l-85.333334-258.133334H810.666667c23.466667 0 42.666667-19.2 42.666666-42.666666s-19.2-42.666667-42.666666-42.666667h-170.666667c-12.8 0-25.6 6.4-34.133333 17.066667-8.533333 12.8-10.666667 25.6-6.4 38.4l66.133333 200.533333H439.466667L405.333333 245.333333c-4.266667-19.2-21.333333-32-40.533333-32h-85.333333c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667h51.2l29.866666 119.466666-181.333333 238.933334c-10.666667 12.8-10.666667 29.866667-4.266667 44.8S196.266667 725.333333 213.333333 725.333333h119.466667c-17.066667 49.066667-64 85.333333-119.466667 85.333334-70.4 0-128-57.6-128-128s57.6-128 128-128v-85.333334C96 469.333333 0 565.333333 0 682.666667s96 213.333333 213.333333 213.333333c102.4 0 189.866667-72.533333 209.066667-170.666667H469.333333c12.8 0 25.6-6.4 34.133334-17.066666s10.666667-23.466667 8.533333-36.266667L460.8 469.333333h234.666667l8.533333 27.733334c-64 36.266667-106.666667 106.666667-106.666667 185.6 0 117.333333 96 213.333333 213.333334 213.333333s213.333333-96 213.333333-213.333333-96-213.333333-213.333333-213.333334z m-424.533334 55.466667l29.866667 115.2H298.666667l87.466666-115.2zM810.666667 810.666667c-70.4 0-128-57.6-128-128 0-40.533333 19.2-76.8 49.066666-100.266667l38.4 115.2c6.4 17.066667 23.466667 29.866667 40.533334 29.866667 4.266667 0 8.533333 0 12.8-2.133334 21.333333-6.4 34.133333-32 27.733333-53.333333L812.8 554.666667c70.4 2.133333 125.866667 57.6 125.866667 128s-57.6 128-128 128z"
            p-id="575"
          />
        </svg>
      </div>
    );
  }
}
