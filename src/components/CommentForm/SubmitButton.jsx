import { useFormStatus } from 'react-dom';
import styles from './CommentForm.module.css';


const SubmitButton = () => {
  const { pending } = useFormStatus;

  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? 'Надсилання...' : 'Надіслати'}
    </button>
  );
};

export default SubmitButton;
