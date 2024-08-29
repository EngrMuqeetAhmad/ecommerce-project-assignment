import { NextFunction, Request, Response } from 'express';
import { CartProductJunction } from '../models/junctionModels/CartProduct.model';
import { Product } from '../models/product.model';
import { CartProduct, ProductTypes } from '../types';

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

  let CartProduct: Array<Pick<CartProduct, 'productID' | 'quantity'>>;
  const result: any = await CartProductJunction.findAll({
    include: ['productID', 'quantity'],
    where: {
      cartID: cartID,
    },
  });

  CartProduct = result.map(
    (item: Pick<CartProduct, 'productID' | 'quantity'>) => ({
      productID: item.productID,
      quantity: item.quantity,
    }),
  );

  if (CartProduct.length > 0) {
    CartProduct?.forEach(
      async (item: Pick<CartProduct, 'productID' | 'quantity'>) => {
        let product: Pick<ProductTypes, 'price'>;
        const result: any = await Product.findOne({
          include: ['price'],
          where: {
            ID: item?.productID,
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
