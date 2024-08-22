import { Optional } from 'sequelize';

export interface PhoneInfoTypes {
  ID: number;
  countryCode: number;
  phoneNumber: string;
  userID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PhoneInfoInput extends Optional<PhoneInfoTypes, 'ID'> {}

export interface PhoneInfoOutput extends Required<PhoneInfoTypes> {}
