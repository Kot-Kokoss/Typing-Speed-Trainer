import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TextDisplayItem.module.scss';

import store from '../../store/store';

type TextDisplayItemProps = {
  word: string;
};

const TextDisplayItem: FunctionComponent<TextDisplayItemProps> = observer(({ word }) => {
  const wordArray: string[] = word.split('');
  return (
    <div className={styles.word}>
      {wordArray.map((letter, id) => (
        <div className={styles.letter} key={id}>
          {letter}
        </div>
      ))}
    </div>
  );
});

export default TextDisplayItem;
