import { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TextDisplayItem.module.scss';

type TextDisplayItemProps = {
  word: string;
  letterStates: string[];
};

const TextDisplayItem: FunctionComponent<TextDisplayItemProps> = observer(
  ({ word, letterStates }) => {
    const wordArray: string[] = word.split('');

    return (
      <div className={styles.word}>
        {wordArray.map((letter, id) => (
          <div
            className={`${styles.letter}
                      ${letterStates[id] === 'correct' ? styles.correct : ''} 
                      ${letterStates[id] === 'error' ? styles.error : ''}`}
            key={id}>
            {letter}
          </div>
        ))}
      </div>
    );
  },
);

export default TextDisplayItem;
