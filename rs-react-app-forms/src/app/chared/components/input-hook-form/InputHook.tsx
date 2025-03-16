import { UseFormRegister } from 'react-hook-form';

interface InputHook {
  type: string;
  name: string;
  register: UseFormRegister<{
    [x: string]: string;
  }>;
}

export const InputHook = ({ type, name, register }: InputHook) => (
  <div className={name === 'terms' ? 'checkbox' : 'input'}>
    <label className="form-label">{name}: </label>
    <input
      type={type}
      className={
        name === 'image'
          ? ''
          : name === 'terms'
            ? 'form-checkbox'
            : 'form-input'
      }
      {...register(name)}
    />
  </div>
);
