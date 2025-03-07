'use client';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader_body}>
      <div data-testid="loader" className={styles.loader}></div>
    </div>
  );
};

export default Loader;
