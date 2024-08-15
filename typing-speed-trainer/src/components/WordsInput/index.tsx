import { useRef, useEffect } from 'react';
import styles from './WordsInput.module.scss';

const WordsInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Правильная проверка нажатия клавиши Enter
      inputRef.current?.focus(); // Устанавливаем фокус на инпут
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
