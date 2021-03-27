import { makeAutoObservable } from "mobx";

export default class ActiviyStore {
  title = "Hello from MobX!";

  constructor() {
    // Long way
    /* makeObservable(this, {
      title: observable,
      setTitle: action,
    }); */

    // Easy way
    makeAutoObservable(this);
  }

  setTitle = () => {
    this.title = this.title + "!";
  };
}
