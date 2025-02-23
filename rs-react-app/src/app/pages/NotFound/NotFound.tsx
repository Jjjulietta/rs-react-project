import styles from './NotFoun.module.css';

export const NotFound = () => {
  return (
    <div>
      <div>Page not found!</div>
      <img
        data-testid="not_found"
        className={styles.img}
        src="src/assets/not_found.svg"
      ></img>
    </div>
  );
};
