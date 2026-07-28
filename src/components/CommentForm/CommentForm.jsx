import { useActionState, useEffect, useState } from 'react';
import styles from './CommentForm.module.css';
import SubmitButton from './SubmitButton';

const addCommentAction = async (prevState, formData) => {
  const author = formData.get('authorName');
  const text = formData.get('commentText');

  const MAX_AUTHOR_LENGTH = 20;
  const MAX_TEXT_LENGTH = 200;

  if (!author.trim() || !text.trim()) {
    setErrorMessage('Будь ласка, заповніть усі поля.');
    return;
  }

  if (author.length > MAX_AUTHOR_LENGTH) {
    setErrorMessage(
      `Ім'я надто довге (максимум ${MAX_AUTHOR_LENGTH} символів).`,
    );
    return;
  }

  if (text.length > MAX_TEXT_LENGTH) {
    setErrorMessage(
      `Коментар надто довгий (максимум ${MAX_TEXT_LENGTH} символів).`,
    );
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    payload: { author: author.trim(), text: text.trim() },
  };
};

const CommentForm = ({ onAddComment }) => {
  const [state, formAction] = useActionState(addCommentAction, null);

  useEffect(() => {
    if (state?.success && state?.payload) {
      onAddComment(state.payload.author, state.payload.text);
      const form = document.querySelector(`.${styles.commentForm}`);
      if (form) form.reset();
    }
  }, [state, onAddComment]);

  return (
    <form action={formAction} className={styles.commentForm}>
      <h4 className={styles.title}>Залишити відгук</h4>

      {state?.error && <p className={styles.errorText}>{state.error}</p>}

      <input
        name="authorName"
        type="text"
        placeholder="Ваше ім'я"
        className={styles.input}
        required
      />
      <textarea
        name="commentText"
        placeholder="Ваш коментар..."
        className={styles.text}
        required
      />
      <SubmitButton />
    </form>
  );
};

export default CommentForm;
