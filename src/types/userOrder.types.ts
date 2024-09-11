
export interface UserOrderTypes {
  id: number;
  userId: number;
  status: string;
  shippingAddressID: number;
  paymentID: string;
  totalAmount: number; // total price after tax/discount/additional/ calculations
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserOrderInput extends Omit<UserOrderTypes, 'id'> {}

export interface UserOrderOutput
  extends Omit<UserOrderTypes, 'deletedAt' | 'paymentID'> {}

export interface UserOrderAndProductOutput extends UserOrderOutput {
  products: Array<{
    price: number;
    detials: string;
    baseProductID: number;
    info: {
      quantity: number;
    };
  }>;
}
