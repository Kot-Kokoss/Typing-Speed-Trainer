import { FunctionComponent, useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TextDisplay.module.scss';
import TextDisplayItem from '../TextDisplayItem';
import Result from '../Result';

import store from '../../store/store';

const TextDisplay: FunctionComponent = observer(() => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentWordRef = useRef<HTMLDivElement | null>(null);

  let text: string = store.activeText;
  const textArray: string[] = text.split(/\s+/);

  // Состояние для хранения результатов введенных слов
  const [wordStates, setWordStates] = useState<Array<{ letterStates: string[] }>>(
    Array(textArray.length).fill({ letterStates: [] }),
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    inputRef.current?.focus();

    const currentWord = textArray[currentWordIndex];

    if (e.key === ' ') {
      e.preventDefault(); // Предотвращаем добавление пробела в инпут

      // Проверяем, если текущее слово последнее
      if (currentWordIndex === textArray.length - 1 && inputValue === currentWord) {
        setShowResult(true); // Отображаем результаты, если последнее слово введено правильно
        return;
      }

      if (inputValue === currentWord) {
        // Если текущее слово введено верно, переходим к следующему слову
        const letterStates = currentWord.split('').map((letter, index) => {
          return letter === inputValue[index] ? 'correct' : 'error';
        });

        // Обновляем состояние слов
        setWordStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[currentWordIndex] = { letterStates }; // Обновляем состояние текущего слова
          return newStates;
        });

        // Переходим к следующему слову и сбрасываем инпут
        setCurrentWordIndex((prevIndex) => Math.min(prevIndex + 1, textArray.length - 1));
        setInputValue('');
      }
    } else if (e.key === 'Backspace') {
      e.preventDefault(); // Предотвращаем стандартное поведение

      // Удаляем последний символ из inputValue
      const updatedValue = inputValue.slice(0, -1); // Значение inputValue с удаленным последним символом
      setInputValue(updatedValue);

      // Обновляем состояние для текущего слова для backspace
      const letterStates = currentWord.split('').map((letter, index) => {
        if (index < updatedValue.length) {
          return letter === updatedValue[index] ? 'correct' : 'error';
        } else if (index === updatedValue.length) {
          return 'default'; // Последняя буква (которая стала не введенной) будет "по умолчанию"
        }
        return 'default'; // Остальные еще не введенные также будут по умолчанию
      });

      setWordStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[currentWordIndex] = { letterStates };
        return newStates;
      });
    } else {
      e.preventDefault(); // Предотвращаем стандартное действие при нажатии клавиши

      // Обновляем значение inputValue
      const updatedValue = inputValue + e.key;
      setInputValue(updatedValue);

      // Обновляем состояние для текущего слова при нажатии клавиши
      const letterStates = currentWord.split('').map((letter, index) => {
        if (index < updatedValue.length) {
          // Проверяем буквы на правильность
          const isCorrect = letter === updatedValue[index];
          if (!isCorrect) {
            store.setErrorCount(store.errorCount + 1); // Увеличиваем счетчик ошибок, если буква неверная
          }
          return isCorrect ? 'correct' : 'error';
        }
        return 'default'; // Если символ не введен, показываем как default
      });

      setWordStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[currentWordIndex] = { letterStates };
        return newStates;
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value.toLowerCase);
  };

  const currentWord = textArray[currentWordIndex];

  // Определяем состояния букв для текущего слова
  const currentLetterStates = currentWord.split('').map((letter, index) => {
    if (index < inputValue.length) {
      return letter === inputValue[index] ? 'correct' : 'error';
    }
    return 'default';
  });

  const startTimer = () => {
    setStartTime(Date.now());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stopTimer = () => {
    const endTime = Date.now();
    setElapsedTime(endTime - startTime);
  };

  const retry = () => {
    setShowResult(false);
    store.setErrorCount(0);
    store.generateRandomText();
    text = store.activeText;
    setInputValue('');
    setCurrentWordIndex(0);
    setWordStates(Array(textArray.length).fill({ letterStates: [] }));
    setStartTime(0);
    setElapsedTime(0);
  };

  useEffect(() => {
    if (showResult) {
      stopTimer();
    }
  }, [showResult, stopTimer]);

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

  return (
    <>
      {showResult && (
        <Result wpm={Math.floor(textArray.length / (elapsedTime / 60000))} retry={retry} />
      )}
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
          onKeyDown={handleKeyDown}
        />
        <div className={styles.words}>
          {textArray.map((word, id) => {
            const isCurrentWord = id === currentWordIndex;
            return (
              <div key={`word_${id}`} ref={isCurrentWord ? currentWordRef : null}>
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
