// @flow
import React, { Component } from 'react';
import styles from './AddBottom.css';

type Props = {};

export default class AddBottom extends Component<Props> {
  props: Props;
  render() {
    return (
      <p className={styles.outerContainer} onClick={(event)=>{
        event.stopPropagation()
        console.log(2)
        this.props.addItem()
        }}>
          +
      </p>
    );
  }
}
