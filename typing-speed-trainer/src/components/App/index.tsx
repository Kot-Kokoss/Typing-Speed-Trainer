import React, { FunctionComponent } from 'react';
import styles from './App.module.scss';

const App: FunctionComponent = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Typing speed trainer</h1>
      </header>
    </>
  );
};

export default App;
