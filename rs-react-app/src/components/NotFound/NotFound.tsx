import styles from './NotFoun.module.css';
import notFound from '../../../public/not_found.svg';

export const NotFound = () => {
  return (
    <div>
      <div>Page not found!</div>
      <img
        data-testid="not_found"
        className={styles.img}
        src={notFound.src}
      ></img>
    </div>
  );
};
