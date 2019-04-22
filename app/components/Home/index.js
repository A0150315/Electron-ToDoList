import React from 'react';

import styles from './Home.css';

import DaysTimer from '../DaysTimer';
import ListItem from '../ListItem';

const Home = props => {
  const { editingItemIndex, list, isOnline } = props;

  return (
    <div
      className={styles.container}
      style={editingItemIndex !== -1 ? { transform: 'translateY(-100%)' } : {}}
    >
      <DaysTimer />
      <p className={styles.title}>
        陈小怡的待办事项
        <span
          style={
            isOnline
              ? {
                  color: '#fee5e8',
                  fontSize: '1em',
                  paddingLeft: '4px'
                }
              : { color: 'gray', fontSize: '1em', paddingLeft: '4px' }
          }
        >
          ·
        </span>
      </p>
      <ul className={styles.mainList}>
        {list
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
};

export default Home;
