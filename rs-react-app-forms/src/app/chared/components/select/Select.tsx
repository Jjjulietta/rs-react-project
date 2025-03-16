import { RefObject } from 'react';
import { selectOptions } from '../../../models/constants';
import { UseFormRegister } from 'react-hook-form';

interface Select {
  name: string;
  ref?: RefObject<HTMLSelectElement | null>;
  register?: UseFormRegister<{
    [x: string]: string;
  }>;
}

export const Select = ({ name, ref, register }: Select) => {
  return (
    <div className="input">
      <label className="form-label" id={name}>
        {name}
      </label>
      {ref && (
        <select ref={ref} className="form-input">
          {selectOptions.map((item) => (
            <option key={item.label} className="select">
              {item.value}
            </option>
          ))}
        </select>
      )}
      {register && (
        <select className="form-input" {...register(name)}>
          {selectOptions.map((item) => (
            <option key={item.label} className="select">
              {item.value}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
