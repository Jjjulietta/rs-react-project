import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader_body}>
      <div className={styles.loader}></div>
    </div>
  );
};
