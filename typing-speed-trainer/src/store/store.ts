import { makeAutoObservable } from "mobx";
import texts from '../texts/texts.json'

class Store {
  texts: string[] = texts;
  activeText: string = '';
  
  constructor() {
    makeAutoObservable(this);
  }

  
}

const store = new Store();

export default store;