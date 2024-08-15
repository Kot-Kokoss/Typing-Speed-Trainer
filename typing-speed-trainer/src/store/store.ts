import { makeAutoObservable } from "mobx";
import texts from '../texts/texts.json'

class Store {
  texts: string[] = texts;
  activeText: string[] = [];
  errorCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addActiveText = (text: string) => {
    this.activeText = text.split(' ')
  }

  addErrorCount = (count: number) => {
    this.errorCount = this.errorCount + count;
  }
  
}

const store = new Store();

export default store;