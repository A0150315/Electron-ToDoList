import React, { PureComponent } from 'react';
import styles from './DaysTimer.css';

const theDate = new Date(2018, 7, 18);

export default class DaysTimer extends PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = { time: null };
  }

  componentWillMount() {
    this.timer && clearTimeout(this.timer);
  }

  componentDidMount() {
    this.startDaysTimer();
  }

  startDaysTimer = () => {
    const nowaday = new Date();
    const dis = nowaday.getTime() - theDate.getTime();
    this.setState({
      time: Math.floor(dis / 3600 / 1000 / 24)
    });
    this.timer = window.setTimeout(this.startDaysTimer, 1000);
  };

  render() {
    const { state } = this;
    return <span className={styles.days}>{state.time || 'null'} 天</span>;
  }
}
