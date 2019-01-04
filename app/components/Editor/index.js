// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Editor.css';

type Props = {};

class Editor extends Component<Props> {
  componentDidMount() {
    setTimeout(() => {
      const { props } = this;
      props.showEditorPageToggle();
    });
  }

  render() {
    const { props } = this;
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
        <p className={styles.title}>陈小怡的待办事项</p>
        {props.list[props.editingItemIndex] && (
          <div className={styles.mainText}>
            <div style={{ paddingLeft: '8px' }}>
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
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Editor);
