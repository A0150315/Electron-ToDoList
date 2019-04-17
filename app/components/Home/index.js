import React, { Component } from 'react';

import styles from './Home.css';

import DaysTimer from '../DaysTimer';
import ListItem from '../ListItem';

class Home extends Component<Props> {
  props: Props;

  // pushH = () => {
  //   console.log(this);
  //   this.props.history.push('editor');
  // };

  render() {
    const { props } = this;
    return (
      <div
        className={styles.container}
        style={
          props.editingItemIndex !== -1
            ? { transform: 'translateY(-100%)' }
            : {}
        }
      >
        <DaysTimer />
        <p className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {props.list
            .map((e, i) => {
              const listLength = props.list.length;
              if (e.main) {
                return (
                  <ListItem
                    listLength={listLength}
                    {...e}
                    index={i}
                    {...props}
                    key={e.key}
                    credit={e.key}
                  />
                );
              }
              return null;
            })
            .reverse()}
        </ul>
      </div>
    );
  }
}

export default Home;
