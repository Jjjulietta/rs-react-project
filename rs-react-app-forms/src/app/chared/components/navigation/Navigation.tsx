import { NavLink } from 'react-router';
import styles from './navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/form"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Uncontrolled form
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
        to="/hookform"
      >
        React-hook form
      </NavLink>
    </nav>
  );
};
