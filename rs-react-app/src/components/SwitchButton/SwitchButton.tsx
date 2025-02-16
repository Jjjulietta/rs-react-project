import styles from './SwitchButton.module.css';
import { useTheme } from '../../context/themeContext';
import { Theme } from '../../utils/constants';
import { useNavigate, useParams } from 'react-router';

export const SwitchButton = () => {
  const { theme, setTheme } = useTheme();
  const { uid } = useParams();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setTheme(Theme.Dark);
    } else {
      setTheme(Theme.Light);
    }
    if (uid) {
      navigate(`/details/${uid}`);
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
        <span className={styles.slider}></span>
      </label>
      <span className={styles.theme_name}>Dark</span>
    </div>
  );
};
