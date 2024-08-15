import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import random from 'random';

import styles from './App.module.scss';

import store from '../../store/store';

import TextDisplay from '../TextDisplay';

const App: FunctionComponent = observer(() => {
  const textNum: number = random.int(0, 2);
  store.addActiveText(store.texts[textNum]);
  return (
    <>
      <header className={styles.header}>
        <h1>Typing speed trainer</h1>
      </header>
      <TextDisplay text={store.texts[textNum]} />
    </>
  );
});

export default App;
