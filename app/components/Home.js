// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <p  className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {this.props.editingItemIndex}
          {
            this.props.list.map((e,i)=>{
              return (
                <li key={i} className={styles.mainBlock}>
                  <i className={styles.order}>
                    {i+1}
                  </i>
                  {this.props.editingItemIndex===i}
                  {
                    this.props.editingItemIndex===i?(
                      <div className={styles.mainText}>
                        <textarea 
                          type="text" 
                          value={e.main} 
                          onChange={this.props.handleTextAreaChange} 
                          onClick={proxy => proxy.stopPropagation()}/>
                        <input 
                          type="text"  
                          value={e.link}  
                          onChange={this.props.handleInputChange}
                          onClick={proxy => proxy.stopPropagation()}/>
                        {e.img}
                      </div>):(
                      <div className={styles.mainText}>
                        {e.main}
                        {e.link}
                        {e.img}
                      </div>)
                  }
                  
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
