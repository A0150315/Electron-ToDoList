export default class Timer {
  constructor(list) {
    this.originlist = list;
  }

  test() {
    this.list();
  }

  get list() {
    return this.originlist;
  }
}
