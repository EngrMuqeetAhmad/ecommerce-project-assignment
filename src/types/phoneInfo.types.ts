import { Optional } from 'sequelize';

export interface PhoneInfoTypes {
  id: number;
  countryCode: number;
  phoneNumber: string;
  userId: number;
  primary: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PhoneInfoInput extends Omit<PhoneInfoTypes, 'id'> {}

export interface PhoneInfoOutput
  extends Optional<PhoneInfoTypes, 'deletedAt' | 'updatedAt'> {}

export interface PhoneInfoUpdate
  extends Omit<
    PhoneInfoTypes,
    | 'id'
    | 'userId'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'phoneNumber'
    | 'countryCode'
  > {}
