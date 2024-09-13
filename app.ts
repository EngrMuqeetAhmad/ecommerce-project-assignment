// var createError = require("http-errors");
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import { AppRouter } from './src/app.routes';
import apiKeyAuth from './src/middlewares/ApiKeyAuth.middleware';
import { sequelize } from './src/config/dbConnection';
import { User } from './src/models/user.model';
import { PhoneInfo } from './src/models/phoneInfo.model';
import { ShippingAddress } from './src/models/shippingAddress.model';
import { Payment } from './src/models/payment.model';
import { UserWish } from './src/models/userWish.model';
import { UserOrder } from './src/models/userOrder.model';
import { UserCart } from './src/models/userCart.model';
import { Reviews } from './src/models/review.model';
import { Category } from './src/models/category.model';
import { SubCategory } from './src/models/subCategory.model';
import { Product } from './src/models/product.model';
import { ProductVariation } from './src/models/productVariation.model';
import { VariationImage } from './src/models/variationImage.model';
import { VariationTypeModel } from './src/models/variantionType.models';
import { VariationTypeValueModel } from './src/models/variantTypeValue.model';
import { BaseProduct } from './src/models/baseProduct.model';
import cors from 'cors';
///

dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({force: false, alter: false});
    console.log('Connected to database successflly');
    console.log('Database sync successfully');
  } catch (error: any) {
    console.log('Error connecting to database', error);
  }
})();

const PORT = process.env.SERVER_PORT || 3001;
var app = express();

const key: string = `${process.env.SERVER_KEY}`;
const crt: string = `${process.env.SERVER_CRT}`;

const sslOptions = {
  key: fs.readFileSync(path.resolve(key)),
  cert: fs.readFileSync(path.resolve(crt)),
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/v1/', apiKeyAuth, AppRouter);

// https.createServer(sslOptions, app)
app.listen(PORT, (err: any) => {
  if (err) {
    console.log(`there is an error ${err.message}`);
  } else {
    console.log(`Server is listening at port ${PORT}`);
  }
});
