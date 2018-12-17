// @flow
import React, { Component } from 'react';
import styles from './AddBottom.css';

type Props = {};

export default class AddBottom extends Component<Props> {
  render() {
    const { props } = this;
    return (
      <p
        className={styles.outerContainer}
        id="addBtn"
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
          if (props.isAllowAddItem) props.addItem();
        }}
        style={{ top: props.top, left: props.left }}
        role="presentation"
        onKeyDown={event => {
          event.stopPropagation();
          props.addItem();
        }}
      >
        +
      </p>
    );
  }
}
