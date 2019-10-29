import React, { useEffect, useState } from 'react';

import styles from './Home.css';

import DaysTimer from '../DaysTimer';
import ListItem from '../ListItem';

import usePrevious from '../../hooks/usePrevious.ts';

const Home = props => {
  const { editingItemIndex, list, isOnline } = props;
  const prevList = usePrevious(list) || [];
  const [renderList, setRenderList] = useState([]);
  const [readyRenderList, setReadyRenderList] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(-1);

  const getDeletedIndex = (prevList, list) => {
    let deletedIndex = -1;
    if (prevList.length > list.length) {
      prevList.every((item, index) => {
        if (list[index] && list[index].key !== item.key) {
          deletedIndex = index;
          return false;
        } else if (!list[index]) {
          deletedIndex = index;
          return false;
        }
        return true;
      });
    }
    return deletedIndex;
  };

  useEffect(() => {
    if (getDeletedIndex(prevList, list) === -1) {
      setReadyRenderList(list);
    } else {
      setDeletingIndex(getDeletedIndex(prevList, list));
    }
  }, [list]);

  useEffect(() => {
    if (readyRenderList && deletingIndex === -1) {
      setRenderList(readyRenderList);
    }
  }, [readyRenderList, deletingIndex]);

  useEffect(() => {
    if (deletingIndex !== -1)
      setTimeout(() => {
        setDeletingIndex(-1);
      }, 500);
  }, [deletingIndex]);

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
        {renderList
          .map((e, i) => {
            const listLength = renderList.length;
            if (e.main) {
              return (
                <ListItem
                  listLength={listLength}
                  deletingIndex={deletingIndex}
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
