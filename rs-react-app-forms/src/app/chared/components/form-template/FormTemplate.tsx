import styles from './formTemplate.module.css';
import { TemplateItem } from './TemplateItem';

interface Data {
  item: { [key: string]: string | number }[];
  numberSubmit: number | undefined;
}

export const FormTemplate = ({ item, numberSubmit }: Data) => {
  const arrayData = Object.values(item);
  return (
    <div>
      {arrayData.map((item, index) => (
        <div
          key={index}
          className={
            index === numberSubmit ? styles.template_active : styles.template
          }
        >
          <h3>{`Submit №${++index}`}</h3>
          <TemplateItem item={item} />
        </div>
      ))}
    </div>
  );
};
