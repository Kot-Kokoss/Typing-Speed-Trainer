import { makeAutoObservable } from "mobx";
import texts from '../texts/texts.json'

class Store {
  texts: string[] = texts;
  activeText: string[] = [];
  activeWord: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addActiveText = (text: string) => {
    this.activeText = text.split(' ')
  }

  addActiveWord = (word: string) => {
    this.activeWord = word.split(' ')
  }
  
}

const store = new Store();

export default store;