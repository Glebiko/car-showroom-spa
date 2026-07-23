import { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onAddComment }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_AUTHOR_LENGTH = 20;
  const MAX_TEXT_LENGTH = 200;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!author.trim() || !text.trim()) {
      setErrorMessage('Будь ласка, заповніть усі поля.');
      return;
    }

    if (author.length > MAX_AUTHOR_LENGTH) {
      setErrorMessage(`Ім'я надто довге (максимум ${MAX_AUTHOR_LENGTH} символів).`);
      return;
    }

    if (text.length > MAX_TEXT_LENGTH) {
      setErrorMessage(`Коментар надто довгий (максимум ${MAX_TEXT_LENGTH} символів).`);
      return;
    }

    onAddComment(author.trim(), text.trim());
    setAuthor('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <h4 className={styles.title}>Залишити відгук</h4>
      
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

      <input 
        type="text" 
        placeholder="Ваше ім'я"
        className={styles.input}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        maxLength={MAX_AUTHOR_LENGTH + 5}
        required 
      />
      <textarea 
        placeholder="Ваш коментар..."
        className={styles.text}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={MAX_TEXT_LENGTH + 20}
        required
      />
      <button type="submit" className={styles.button}>Надіслати</button>
    </form>
  );
};

export default CommentForm;
