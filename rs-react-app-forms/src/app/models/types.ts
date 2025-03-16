import { RefObject } from 'react';

export type Ref = {
  [key: string]: RefObject<HTMLInputElement | null>;
};

export type FormInputs = {
  userName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface Country {
  name: string;
  Iso2: string;
  Iso3: string;
}

export interface CountryData {
  error: boolean;
  msg: string;
  data: Country[];
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}
