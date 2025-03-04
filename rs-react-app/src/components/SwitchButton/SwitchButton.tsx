import styles from './SwitchButton.module.css';
import { useTheme } from '../../context/themeContext';
import { Theme } from '../../models/constants/constants';
import { useRouter } from 'next/compat/router';

export const SwitchButton = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { uid } = router.query;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme(Theme.Dark);
    } else {
      setTheme(Theme.Light);
    }
    if (uid) {
      router.push(router.asPath);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.theme_name}>Light</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={onChange}
          checked={theme === Theme.Dark ? true : false}
        />
        <span data-testid="themes" className={styles.slider}></span>
      </label>
      <span className={styles.theme_name}>Dark</span>
    </div>
  );
};
