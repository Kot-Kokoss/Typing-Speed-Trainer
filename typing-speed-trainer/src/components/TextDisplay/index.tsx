import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TextDisplay.module.scss';

import store from '../../store/store';

import TextDisplayItem from '../TextDisplayItem';

type TextDisplayProps = {
  text: string;
};

const TextDisplay: FunctionComponent<TextDisplayProps> = observer(({ text }) => {
  const textArray: string[] = text.split(/\s+/);
  const [inputValue, setInputValue] = useState('');
  const inputRef: any = useRef(null);
  const [checkWordNum, setCheckWordNum] = useState(0);

  const handleKeyDown = () => {
    inputRef.current.focus(); // Устанавливаем фокус на инпут
  };

  const checkInputError = (element) => {
    alert(element);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    checkInputError(inputValue[inputValue.length - 1]);
  };

  return (
    <div className={styles.textDisplay} onClick={handleKeyDown}>
      <input
        id="hiddenInput"
        className={styles.input}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(event) => handleInputChange(event)}
      />
      <div className={styles.words}>
        {textArray.map((word, id) => (
          <TextDisplayItem word={word} key={id} />
        ))}
      </div>
      <div className="">{inputValue}</div>
    </div>
  );
});

export default TextDisplay;
