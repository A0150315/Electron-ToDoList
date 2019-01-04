export default class Timer {
  constructor(list = [], ReactComponent) {
    this.actingComponent = ReactComponent;
    this.cacheList = list;
    this.initTimer();
    return this;
  }

  initTimer() {
    console.log(this.list);
    this.list.forEach((e, index) => {
      if (e.deadline) this.startTimer(e.key, new Date(e.deadline), index);
    });
  }

  deleteTimer(key) {
    window.clearTimeout(this[key]);
    console.log(`已清除${key}的定时器`);
  }

  updateTimer(key) {
    this.deleteTimer(key);
    const cacheListLength = this.cacheList.length;
    let i = 0;
    for (; i < cacheListLength; i += 1) {
      if (this.cacheList[i].key === key) break;
    }
    const target = this.cacheList[i];
    if (target.deadline) this.startTimer(key, new Date(target.deadline), i);
  }

  async startTimer(key, deadlineTime, index) {
    const leftTime = deadlineTime.getTime() - new Date();
    if (leftTime <= 0 && !this.cacheList[index].isDone) {
      const isContinue: boolean = window.confirm(
        `第${this.length - index}条：${
          this.cacheList[index].main
        }\n已过期，请问需要删除吗`
      );
      if (isContinue) this.actingComponent.deleteItem(index, key);
      return false;
    }
    const leftTimeLength = leftTime.toString().length;
    const leftTimeArray = leftTime
      .toString()
      .split('')
      .map((e, i) => 10 ** (leftTimeLength - i - 1) * e);
    const { status } = await this.timeoutFunction(
      key,
      leftTimeLength,
      leftTimeArray
    );
    if (status) {
      alert(`第${this.length - index}条时间到啦`);
    }
  }

  // 大数也适用的setTimeout
  timeoutFunction(key, timeArrayListlength, timeArrayList, pivot = 0) {
    let currentPivot = pivot;
    console.log(`定时器${key}已启动`);
    return new Promise(resolve => {
      this[key] = window.setTimeout(async () => {
        currentPivot += 1;
        if (currentPivot === timeArrayListlength) {
          resolve({ status: true });
        } else {
          const { status } = await this.timeoutFunction(
            key,
            timeArrayListlength,
            timeArrayList,
            currentPivot
          );
          if (status) resolve({ status: true });
        }
      }, timeArrayList[currentPivot]);
    });
  }

  get list() {
    return this.cacheList;
  }

  get length() {
    return this.list.length;
  }

  set list(list) {
    console.log('list:', list);
    this.cacheList = list;
  }
}
