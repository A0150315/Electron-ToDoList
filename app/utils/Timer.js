export default class Timer {
  constructor(list) {
    this.cacheList = list;
    this.initTimer();
    return this.list;
  }

  test() {
    this.list();
  }

  initTimer() {
    this.list.forEach((e, index) => {
      if (e.deadline) this.startTimer(e.key, new Date(e.deadline), index);
    });
  }

  startTimer(key, time) {
    const leftTime = time.getTime() - new Date();
    const leftTimeLength = leftTime.toString().length;
    const leftTimeArray = leftTime
      .toString()
      .split('')
      .map((e, i) => 10 ** (leftTimeLength - i - 1) * e);
    this.timeoutFunction(key, leftTimeLength, leftTimeArray);
  }

  timeoutFunction(key, length, arrayList, pivot = 0) {
    console.log(3);
    let currentPivot = pivot;
    // console.log(key, length, arrayList);
    this[key] = window.setTimeout(() => {
      currentPivot += 1;
      if (currentPivot === length) {
        console.log(1);
      } else {
        this.timeoutFunction(key, length, arrayList, currentPivot);
        console.log(2);
      }
    }, arrayList[currentPivot]);
  }

  get list() {
    return this.cacheList;
  }
}
