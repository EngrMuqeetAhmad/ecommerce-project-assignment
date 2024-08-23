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

export interface PhoneInfoInput
  extends Optional<PhoneInfoTypes, 'ID' | 'deletedAt'> {}

export interface PhoneInfoOutput
  extends Optional<PhoneInfoTypes, 'deletedAt' | 'updatedAt'> {}
