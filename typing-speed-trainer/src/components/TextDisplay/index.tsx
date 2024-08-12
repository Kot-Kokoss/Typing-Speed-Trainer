import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TextDisplay.module.scss';

import store from '../../store/store';

import TextDisplayItem from '../TextDisplayItem';

type TextDisplayProps = {
  text: string;
};

const TextDisplay: FunctionComponent<TextDisplayProps> = observer(({ text }) => {
  const textArray: string[] = text.split(/\s+/);
  return (
    <div className={styles.textDisplay}>
      <div className={styles.words}>
        {textArray.map((word) => (
          <TextDisplayItem word={word} />
        ))}
      </div>
    </div>
  );
});

export default TextDisplay;
