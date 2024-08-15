import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Result.module.scss';
import store from '../../store/store';

type ResultProps = {
  wpm: number;
};

const Result: FunctionComponent<ResultProps> = observer(({ wpm }) => {
  return (
    <div className={styles.result}>
      <h2>Result</h2>
      <div className={styles.indicators}>
        <div className="">Errors:</div>
        <div className="">{store.errorCount}</div>
      </div>
      <div className={styles.indicators}>
        <div className="">WPM:</div>
        <div className="">{wpm}</div>
      </div>
    </div>
  );
});

export default Result;
