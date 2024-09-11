import { NextFunction, Request, Response } from 'express';

import { Product } from '../models/product.model';
import { ProductTypes } from '../types';
import { CartProduct } from '../types/CartProductJunction.types';
import { CartProductJunction } from '../models/junctionModels/CartProduct.model';

export async function calculatePayment(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { cartID } = req.body.user;
  //
  let totalAmount: number = 0;

  //if total amount is greater than 3000 Rs., there will be 5 % discount plus free Shipping
  const discount: number = 5; //percent
  const shippingFee: number = 200; //Rs.

  let CartProduct: Array<Pick<CartProduct, 'productId' | 'quantity'>>;
  const result: any = await CartProductJunction.findAll({
    include: ['productId', 'quantity'],
    where: {
      cartId: cartID,
    },
  });

  CartProduct = result.map(
    (item: Pick<CartProduct, 'productId' | 'quantity'>) => ({
      productId: item.productId,
      quantity: item.quantity,
    }),
  );

  if (CartProduct.length > 0) {
    CartProduct?.forEach(
      async (item: Pick<CartProduct, 'productId' | 'quantity'>) => {
        let product: Pick<ProductTypes, 'price'>;
        const result: any = await Product.findOne({
          include: ['price'],
          where: {
            id: item?.productId,
          },
        });
        product = {
          price: result.price,
        };
        if (product != null) {
          totalAmount = item.quantity * product.price;

          if (totalAmount >= 3000) {
            totalAmount = totalAmount - shippingFee;
            totalAmount = totalAmount - (totalAmount * discount) / 100; // discount
            req.body.totalAmount = totalAmount;
            next();
          } else {
            req.body.totalAmount = totalAmount;
            next();
          }
        }
      },
    );
  } else {
    res.json({ error: 'error calculating payment' });
    return;
  }
}
