// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props.list)
    return (
      <div className={styles.container}>
        <p  className={styles.title}>陈小怡的待办事项</p>
        <ul className={styles.mainList}>
          {
            this.props.list.map((e,i)=>{
              return (
                <li key={i} className={styles.mainBlock}>
                  <i className={styles.order}>
                    {i+1}
                  </i>
                  <div className={styles.mainText}>
                    <textarea type="text" value={e.main} onChange={this.props.handleInputChange}/>
                    {e.link}
                    {e.img}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
