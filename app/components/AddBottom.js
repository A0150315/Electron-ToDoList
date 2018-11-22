// @flow
import React, { Component } from 'react';
import styles from './AddBottom.css';

type Props = {};

export default class AddBottom extends Component<Props> {
  props: Props;

  render() {
    const { props } = this;
    return (
      <p
        className={styles.outerContainer}
        onClick={event => {
          event.stopPropagation();
          props.addItem();
        }}
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
