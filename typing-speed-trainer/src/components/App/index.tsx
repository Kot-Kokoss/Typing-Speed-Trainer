import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './App.module.scss';

import store from '../../store/store';

import TextDisplay from '../TextDisplay';

const App: FunctionComponent = observer(() => {
  store.generateRandomText();
  return (
    <>
      <header className={styles.header}>
        <h1>Typing speed trainer</h1>
      </header>
      <TextDisplay />
    </>
  );
});

export default App;
