import React, { useRef, useEffect } from 'react';

import styles from './WordsInput.module.scss';

const WordsInput = () => {
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    // Проверяем, была ли нажата комбинация Ctrl + Shift + I
    if (event.entrKey) {
      inputRef.current.focus(); // Устанавливаем фокус на инпут
      alert(1);
    }
  };

  useEffect(() => {
    // Добавляем слушатель события нажатия клавиш
    window.addEventListener('keydown', handleKeyDown);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <input className={styles.input} ref={inputRef} type="text" />;
};

export default WordsInput;
