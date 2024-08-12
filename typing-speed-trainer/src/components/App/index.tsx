import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './App.module.scss';

const App: FunctionComponent = observer(() => {
  return (
    <>
      <header className={styles.header}>
        <h1>Typing speed trainer</h1>
        <div className="">{}</div>
      </header>
    </>
  );
});

export default App;
