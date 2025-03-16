import { RefObject } from 'react';

interface Input {
  type: string;
  name: string;
  ref?: RefObject<HTMLInputElement | null>;
}

export const Input = ({ type, name, ref }: Input) => {
  return (
    <div className={name === 'terms' ? 'checkbox' : 'input'}>
      <label className="form-label" id={name}>
        {name}:{' '}
      </label>
      <input
        className={
          name === 'image'
            ? ''
            : name === 'terms'
              ? 'form-checkbox'
              : 'form-input'
        }
        ref={ref}
        type={type}
        name={name}
      />
    </div>
  );
};
