import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './AddBottom.css';

type Props = {};

class AddBottom extends Component<Props> {
  render() {
    const { props } = this;
    return (
      <a
        className={styles.outerContainer}
        id="addBtn"
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
          if (props.isAllowAddItem) {
            props.addItem();
            props.history.push('editor');
          }
        }}
        style={{ top: props.top, left: props.left }}
        role="presentation"
        onKeyDown={event => {
          event.stopPropagation();
          props.addItem();
        }}
      >
        +
      </a>
    );
  }
}

export default withRouter(AddBottom);
