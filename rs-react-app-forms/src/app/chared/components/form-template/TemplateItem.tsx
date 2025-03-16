import { FieldValues } from 'react-hook-form';
import styles from './formTemplate.module.css';
import { decodeBase64 } from '../../utils/base64';

interface Item {
  item: FieldValues;
}

export const TemplateItem = ({ item }: Item) => {
  const array = Object.entries(item);
  return (
    <div>
      {array.map((val, i) => (
        <div key={i} className={styles.itemContainer}>
          <div>{val[0]}</div>

          {val[0] === 'image' ? (
            <img width={40} src={decodeBase64(val[1])} alt="not-found" />
          ) : (
            <div>{val[1]}</div>
          )}
        </div>
      ))}
    </div>
  );
};
