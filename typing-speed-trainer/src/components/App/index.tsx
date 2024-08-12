import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './App.module.scss';

import store from '../../store/store';

import TextDisplay from '../TextDisplay';

const App: FunctionComponent = observer(() => {
  return (
    <>
      <header className={styles.header}>
        <h1>Typing speed trainer</h1>
        <TextDisplay text={store.texts[0]} />
      </header>
    </>
  );
});

export default App;
