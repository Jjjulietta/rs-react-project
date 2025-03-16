import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { formSchema } from '../../chared/utils/validations';
import { useAppDispatch, useAppSelector } from '../../store/withTypes';
import {
  addHookFormData,
  selectHookDataLength,
} from '../../store/hookFormSlice';
import { useNavigate } from 'react-router';
import { addIndex } from '../../store/indexSlice';
import { Autocomplete } from '../../chared/components/autocomplete/Autocomplete';
import { InputHook } from '../../chared/components/input-hook-form/InputHook';
import { selectAllCountries } from '../../store/countryApi';
import { encodeBase64 } from '../../chared/utils/base64';
import { Select } from '../../chared/components/select/Select';

const formFields = {
  userName: 'text',
  age: 'number',
  email: 'email',
  gender: 'select',
  password: 'password',
  confirmPassword: 'password',
  image: 'file',
  terms: 'checkbox',
};

export const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: yupResolver(formSchema), mode: 'onChange' });
  const country = useAppSelector(selectAllCountries);

  const dispath = useAppDispatch();
  const numberSubmit = useAppSelector(selectHookDataLength);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const dataValues = { ...data, image: encodeBase64(data.image[0]) };
    dispath(addHookFormData(dataValues));
    dispath(addIndex({ formIndex: undefined, hookIndex: numberSubmit }));
    reset();
    navigate('/');
  };
  return (
    <div>
      <h2 className="title">React hook form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {Object.entries(formFields).map((item, index) => {
          return (
            <div className="input" key={index}>
              {item[0] !== 'gender' ? (
                <InputHook name={item[0]} type={item[1]} register={register} />
              ) : (
                <Select name={item[0]} register={register} />
              )}
              <span className="errors">
                {errors[item[0]]?.message?.toString()}
              </span>
            </div>
          );
        })}
        <Autocomplete
          inputName="country"
          register={register}
          data={country ? country : []}
        />
        <span className="errors">{errors.country?.message?.toString()}</span>
        <button className="submit-button" type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
