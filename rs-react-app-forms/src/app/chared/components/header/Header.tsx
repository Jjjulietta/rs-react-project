import { Navigation } from '../navigation/Navigation';
import styles from './header.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Navigation />
    </div>
  );
};
