import { Optional } from 'sequelize';

export interface ShippingAddressTypes {
  id: number;
  addressLine1?: string;
  addressLine2: string;
  region: string;
  city: string;
  country: string;
  postalCode: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ShippingAddressInput
  extends Omit<ShippingAddressTypes, 'id'> {}
export interface ShippingAddressOutput
  extends Optional<ShippingAddressTypes, 'deletedAt'> {}
