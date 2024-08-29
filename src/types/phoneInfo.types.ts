import { Optional } from 'sequelize';

export interface PhoneInfoTypes {
  ID: number;
  countryCode: number;
  phoneNumber: string;
  userID: number;
  primary: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PhoneInfoInput
  extends Optional<PhoneInfoTypes, 'ID' | 'deletedAt'> {}

export interface PhoneInfoOutput
  extends Optional<PhoneInfoTypes, 'deletedAt' | 'updatedAt'> {}

export interface PhoneInfoUpdate
  extends Omit<
    PhoneInfoTypes,
    | 'ID'
    | 'userID'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'phoneNumber'
    | 'countryCode'
  > {}
