import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TextDisplay.module.scss';
import TextDisplayItem from '../TextDisplayItem';
import Result from '../Result';

import store from '../../store/store';

type TextDisplayProps = {
  text: string;
};

const TextDisplay: FunctionComponent<TextDisplayProps> = observer(({ text }) => {
  const [inputValue, setInputValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const textArray: string[] = text.split(/\s+/);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Состояние для хранения результатов введенных слов
  const [wordStates, setWordStates] = useState<Array<{ letterStates: string[] }>>(
    Array(textArray.length).fill({ letterStates: [] }),
  );

  const handleKeyDown = (e) => {
    inputRef.current?.focus();

    if (e.key === ' ') {
      e.preventDefault(); // Предотвращаем добавление пробела в инпут

      // Сохраняем состояние введенных букв для текущего слова
      const currentWord = textArray[currentWordIndex];
      const letterStates = currentWord.split('').map((letter, index) => {
        if (index < inputValue.length) {
          if (letter !== inputValue[index]) {
            store.addErrorCount(1); // Увеличиваем счетчик ошибок при каждой неверно введенной букве
          }
          return letter === inputValue[index] ? 'correct' : 'error';
        }
        return 'default';
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
    } else {
      e.preventDefault(); // Предотвращаем стандартное действие при нажатии клавиши
      const value = e.target.value + e.key; // Получаем новое значение вместе с добавленным символом
      setInputValue(value); // Устанавливаем новое значение в состоянии
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
    return 'default';
  });

  const currentWordRef = useRef<HTMLDivElement | null>(null);

  const startTimer = () => {
    setStartTime(Date.now()); // Стартовое время при начале ввода текста
  };

  const stopTimer = () => {
    const endTime = Date.now();
    setElapsedTime(endTime - startTime); // Вычисляем прошедшее время
  };

  useEffect(() => {
    if (showResult) {
      stopTimer(); // Останавливаем таймер при завершении текста
    }
  }, [showResult]);

  // Обновляем ссылку при изменении текущего слова
  useEffect(() => {
    if (currentWordRef.current) {
      currentWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  }, [currentWordIndex]);

  useEffect(() => {
    // Проверяем, что пользователь достиг последнего слова
    if (currentWordIndex === textArray.length - 1) {
      setShowResult(true);
    }
  }, [currentWordIndex, textArray.length]);

  return (
    <>
      {showResult && <Result wpm={Math.floor(textArray.length / (elapsedTime / 60000))} />}
      <div
        className={`${showResult === true ? styles.hidden : styles.textDisplay}`}
        onClick={() => {
          inputRef.current?.focus();
          if (!startTime) {
            startTimer();
          }
        }}>
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
            const isCurrentWord = id === currentWordIndex;
            return (
              <div ref={isCurrentWord ? currentWordRef : null}>
                <TextDisplayItem
                  word={word}
                  key={id}
                  letterStates={
                    id === currentWordIndex ? currentLetterStates : wordStates[id].letterStates
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
});

export default TextDisplay;
