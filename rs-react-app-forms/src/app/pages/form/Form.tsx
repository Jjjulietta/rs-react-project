import { FormEvent, useRef, useState } from 'react';
import { Input } from '../../chared/components/input/Input';
import { formSchema } from '../../chared/utils/validations';
import { useAppDispatch, useAppSelector } from '../../store/withTypes';
import { addFormData, selectDataLength } from '../../store/formSlice';
import { useNavigate } from 'react-router';
import { addIndex } from '../../store/indexSlice';
import { Autocomplete } from '../../chared/components/autocomplete/Autocomplete';
import { FieldValues } from 'react-hook-form';
import { selectAllCountries } from '../../store/countryApi';
import { Ref } from '../../models/types';
import { encodeBase64 } from '../../chared/utils/base64';
import { Select } from '../../chared/components/select/Select';
import { ValidationError } from 'yup';
import { fields } from '../../models/constants';

export const Form = () => {
  const dispath = useAppDispatch();
  const numberSubmit = useAppSelector(selectDataLength);
  const navigate = useNavigate();
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);
  const objRef: Ref = {
    userName: userNameRef,
    age: ageRef,
    email: emailRef,
    password: passwordRef,
    confirmPassword: passwordConfirmRef,
    image: imageRef,
    country: countryRef,
    terms: termsRef,
  };
  const objRefSelect = {
    gender: genderRef,
  };
  const country = useAppSelector(selectAllCountries);
  const [errors, setErrors] = useState<FieldValues>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData: { [key: string]: string | Blob | boolean } = {};
    Object.entries(objRef).forEach((item) => {
      if (item[1].current && item[1] !== imageRef && item[1] !== genderRef) {
        formData[item[0]] = item[1].current.value;
      }
      if (item[1] === imageRef && imageRef.current?.files) {
        formData[item[0]] = imageRef.current.files?.[0];
      }
      if (item[1] === termsRef && termsRef.current?.checked) {
        formData[item[0]] = termsRef.current?.checked;
      }
    });
    Object.entries(objRefSelect).forEach((item) => {
      if (item[1].current) {
        formData[item[0]] = item[1].current.value;
      }
    });

    const validateNestedSchema = async () => {
      const validationResult = await formSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          return {};
        })
        .catch((err: ValidationError) => {
          const arr: FieldValues = {};
          let i: number = err.errors.length;
          while (i > 0 && err.inner) {
            const j = err.inner[i - 1].path;
            if (j) {
              arr[j] = err.inner[i - 1].message;
            }
            i = i - 1;
          }
          return arr;
        });

      return validationResult;
    };
    const errors = await validateNestedSchema();
    setErrors(errors);
    const isValid = await formSchema.isValid(formData);
    if (isValid) {
      const formDataSave = {
        ...formData,
        image: encodeBase64(formData.image as Blob),
      };
      dispath(addFormData(formDataSave));
      dispath(addIndex({ formIndex: numberSubmit, hookIndex: undefined }));
      navigate('/');
    }
  };
  return (
    <div className="page">
      <h2 className="title">Uncontrolled form</h2>
      <form id="form" onSubmit={handleSubmit} className="form" noValidate>
        {fields.map((item, index) => (
          <div key={index}>
            {item[0] !== 'gender' ? (
              <Input type={item[1]} name={item[0]} ref={objRef[item[0]]} />
            ) : (
              <Select name={item[0]} ref={objRefSelect.gender} />
            )}
            <span className="errors">
              {errors && errors[item[0]] ? errors[item[0]] : ''}
            </span>
          </div>
        ))}
        <Autocomplete
          ref={countryRef}
          inputName={''}
          data={country ? country : []}
        />
        <span className="errors">
          {errors && errors.country ? errors.country : ''}
        </span>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
