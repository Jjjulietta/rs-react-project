import { Gender } from './types';

export const fields = [
  ['userName', 'text', 'userNameRef'],
  ['age', 'number', 'ageRef'],
  ['email', 'email', 'emailRef'],
  ['gender', 'radio', 'genderRef'],
  ['password', 'password', 'passwordRef'],
  ['confirmPassword', 'password', 'passwordConfRef'],
  ['image', 'file', 'imageRef'],
  ['terms', 'checkbox', 'termsRef'],
];

export const selectOptions = [
  { label: Gender.FEMALE, value: Gender.FEMALE },
  { label: Gender.MALE, value: Gender.MALE },
];
