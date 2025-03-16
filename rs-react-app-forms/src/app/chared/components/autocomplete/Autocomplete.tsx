import { RefObject } from 'react';
import styles from './autocomplete.module.css';
import { UseFormRegister } from 'react-hook-form';

interface Autocomplete {
  type?: string;
  inputName: string;
  data: string[];
  register?: UseFormRegister<{
    [x: string]: string;
  }>;
  ref?: RefObject<HTMLInputElement | null>;
}

export const Autocomplete = ({
  inputName,
  data,
  register,
  ref,
}: Autocomplete) => {
  return (
    <div className="input">
      <label htmlFor="country">country</label>
      {ref && (
        <input
          list="countrydata"
          id="country"
          name={inputName}
          size={50}
          className="form-input"
          ref={ref}
        />
      )}
      {register && (
        <input
          list="countrydata"
          id="country"
          size={50}
          className="form-input"
          {...register(inputName)}
        />
      )}
      <datalist id="countrydata" className={styles.datalist}>
        {data && data.map((item, i) => <option key={i}>{item}</option>)}
      </datalist>
    </div>
  );
};
