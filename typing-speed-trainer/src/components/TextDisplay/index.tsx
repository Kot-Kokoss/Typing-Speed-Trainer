import React, { FunctionComponent, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TextDisplay.module.scss';
import TextDisplayItem from '../TextDisplayItem';

type TextDisplayProps = {
  text: string;
};

const TextDisplay: FunctionComponent<TextDisplayProps> = observer(({ text }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const textArray: string[] = text.split(/\s+/);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Состояние для хранения результатов введенных слов
  const [wordStates, setWordStates] = useState<Array<{ letterStates: string[] }>>(
    Array(textArray.length).fill({ letterStates: [] }),
  );

  const handleKeyDown = (e) => {
    inputRef.current.focus();

    if (e.key === ' ') {
      e.preventDefault(); // Предотвращаем добавление пробела в инпут

      // Проверяем, совпадает ли длина введенного слова с текущим
      if (inputValue.length === textArray[currentWordIndex].length) {
        // Сохраняем состояние введенных букв для текущего слова
        const currentWord = textArray[currentWordIndex];
        const letterStates = currentWord.split('').map((letter, index) => {
          if (index < inputValue.length) {
            return letter === inputValue[index] ? 'correct' : 'error';
          }
          return 'letter'; // Буквы, которые еще не введены
        });

        // Обновляем состояние слов
        setWordStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[currentWordIndex] = { letterStates }; // Обновляем состояние текущего слова
          return newStates;
        });

        // Переходим к следующему слову и сбрасываем инпут
        setCurrentWordIndex((prevIndex) => Math.min(prevIndex + 1, textArray.length - 1));
        setInputValue(''); // Сбрасываем значение инпута
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const currentWord = textArray[currentWordIndex];

  // Определяем состояния букв для текущего слова
  const currentLetterStates = currentWord.split('').map((letter, index) => {
    if (index < inputValue.length) {
      return letter === inputValue[index] ? 'correct' : 'error';
    }
  });

  return (
    <div className={styles.textDisplay} onClick={() => inputRef.current.focus()}>
      <input
        id="hiddenInput"
        className={styles.input}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Обработчик для нажатия клавиш
      />
      <div className={styles.words}>
        {textArray.map((word, id) => {
          return (
            <TextDisplayItem
              word={word}
              key={id}
              letterStates={
                id === currentWordIndex ? currentLetterStates : wordStates[id].letterStates
              }
            />
          );
        })}
      </div>
      <div>{inputValue}</div>
    </div>
  );
});

export default TextDisplay;
