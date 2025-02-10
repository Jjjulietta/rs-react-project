import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader_body}>
      <div data-testid="loader" className={styles.loader}></div>
    </div>
  );
};
