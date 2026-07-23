import { useState } from 'react';
import styles from './SearchForm.module.css';

const SearchForm = ({ onSearchInput }) => {
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    const query = e.target.value;
    setValue(query)
    onSearchInput(query);
  };

  const handleClear = () => {
    setValue('');
    onSearchInput('');
  };

  return (
    <div className={styles.queryContainer}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onInput={handleInput}
        placeholder="Ваш запит..."
      />
      {value && (
        <button type="button" onClick={handleClear} className={styles.clearButton}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchForm;
