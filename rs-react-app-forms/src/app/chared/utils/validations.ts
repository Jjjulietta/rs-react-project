import * as yup from 'yup';
import { FormInputs } from '../../models/types';
import { FieldValues } from 'react-hook-form';

export const passwordValidation = () => {
  const validationSchema = yup
    .string()
    .required('Please enter your password')
    .matches(/[a-z]+/, 'One lovercase charcter')
    .matches(/[A-Z]+/, 'One lovercase charcter')
    .matches(/[@$!#%&*]+/, 'One special charster')
    .matches(/\d+/, 'One number');
  return validationSchema;
};
const validFileExtensions = ['png', 'jpeg'];

function isValidFileType(fileName: File) {
  const ext = fileName?.name.split('.').pop();
  return ext ? validFileExtensions.includes(ext.toLowerCase()) : false;
}

export const imageValidation = () => {
  const MAX_FILE_SIZE = 300000;

  const validationSchema = yup
    .mixed<File>()
    .required('Please upload an image')
    .test(
      'is-valid-type',
      `Not a valid image type, valid types ${validFileExtensions.join(', ')}`,
      (value) => {
        const file = value instanceof File ? value : value[0];
        return isValidFileType(file);
      }
    )
    .test('is-valid-size', 'Max allowed size is 300KB', (value) => {
      const file = value instanceof File && value ? value : value[0];
      return file && file.size <= MAX_FILE_SIZE;
    });
  return validationSchema;
};

export const formSchema: yup.ObjectSchema<FieldValues> = yup
  .object<FormInputs>()
  .shape({
    userName: yup
      .string()
      .required('Please enter your name')
      .matches(/^[A-Z]+/, 'First uppercase letter'),
    age: yup.number().positive().integer().required('Please enter your age'),
    email: yup.string().email().required('Please enter email'),
    gender: yup
      .mixed()
      .oneOf(['Male', 'Female'] as const)
      .defined(),
    password: passwordValidation(),
    confirmPassword: yup
      .string()
      .required('Please, confirm password')
      .oneOf([yup.ref('password')], 'Password must muth'),
    image: imageValidation(),
    country: yup.string().required('Please select your country'),
    terms: yup
      .boolean()
      .required('You must agree to the terms and conditions.'),
  });
