import styles from './Comments.module.css';

const Comments = ({ comments }) => {
  return (
    <div className={styles.commentsWrapper}>
      <h3 className={styles.title}>Відгуки користувачів ({comments.length})</h3>
      
      {comments.length === 0 ? (
        <p>Будьте першим, хто залишить відгук!</p>
      ) : (
        <ul className={styles.commentsList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <span className={styles.author}>{comment.author}:</span>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
