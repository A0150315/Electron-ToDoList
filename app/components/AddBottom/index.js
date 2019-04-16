import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './AddBottom.css';

interface Props {
  [key: string]: any;
}

class AddBottom extends Component<Props> {
  render() {
    const { props } = this;
    return (
      <a
        className={styles.outerContainer}
        id="addBtn"
        name="addBtn"
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
          if (props.isAllowAddItem) {
            props.addItem();
            {
              /* props.history.push('editor'); */
            }
          }
        }}
        style={
          props.editingItemIndex !== -1
            ? { top: props.top, left: props.left, opacity: 0 }
            : { top: props.top, left: props.left }
        }
        role="presentation"
        onKeyDown={event => {
          event.stopPropagation();
          props.addItem();
        }}
      >
        <svg
          viewBox="64 64 896 896"
          data-icon="plus"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          className={styles.plusIcon}
          name="addBtn"
        >
          <path
            name="addBtn"
            d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"
          />
        </svg>
      </a>
    );
  }
}

export default withRouter(AddBottom);
