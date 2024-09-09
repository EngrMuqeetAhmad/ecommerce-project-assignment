import { Optional } from 'sequelize';

export interface ShippingAddressTypes {
  ID: number;
  addressLine1?: string;
  addressLine2: string;
  region: string;
  city: string;
  country: string;
  postalCode: string;
  userID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ShippingAddressInput
  extends Optional<ShippingAddressTypes, 'ID' | 'deletedAt'> {}
export interface ShippingAddressOutput
  extends Optional<ShippingAddressTypes, 'deletedAt'> {}
