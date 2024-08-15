import { makeAutoObservable } from "mobx";
import random from 'random';

import texts from '../texts/texts.json'

class Store {
  texts: string[] = texts;
  activeText: string = '';
  errorCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  generateRandomText = () => {
    const textNum: number = random.int(0, texts.length - 1);
    this.activeText = texts[textNum]
  }

  setErrorCount = (count: number) => {
    this.errorCount = count;
  }  
}

const store = new Store();

export default store;