import dotenv from 'dotenv';
import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../config/dbConnection';
import { User, UserPhoneNO } from '../../types/userTypes';
import { INSERTQueryString } from '../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../utils/controllerFunctionTemplate';
import { hashString } from '../../utils/passwordHashednSalated';
import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';
import userExists from '../../validators/userExists.validation';

async function userRegister(req: any, res: any, next: any) {
  dotenv.config();

  const { firstName, secondName, email, countryCode, phoneNo, password } =
    req.body;

  //validation:
  if (
    !firstName ||
    !secondName ||
    !email ||
    !countryCode ||
    !phoneNo ||
    !password
  ) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    //validation for existing email
    const emailRegistered: QueryResult = await userExists(email);
    if (emailRegistered?.data.rowsAffected != 0 ? true : false) {
      res.json({ message: 'user already exists with given email ID' });
      return;
    }
    /////
    ///stripe configuration

    const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

    const UserID: string = uuid();
    const UserPhoneNoID: string = uuid();
    const hashedPassword: string = hashString(password);

    let customer;
    try {
      customer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${secondName}`,
      });
    } catch (error) {
      console.log('error creating customer in stripe');
      res.json({ message: 'an error occured - stripe' });
      return;
    }

    ///creating objects/query params
    const userPhoneNo: UserPhoneNO = {
      ID: {
        value: UserPhoneNoID,
        type: sql.Char,
      },
      userID: {
        value: UserID,
        type: sql.Char,
      },
      countryCode: {
        value: countryCode,
        type: sql.Char,
      },
      phoneNo: {
        value: phoneNo,
        type: sql.VarChar,
      },
    };

    const user: object = {
      ID: {
        value: UserID,
        type: sql.Char,
      },
      userFirstName: {
        value: firstName,
        type: sql.NVarChar,
      },
      userSecondName: {
        value: secondName,
        type: sql.NVarChar,
      },
      userEmail: {
        value: email,
        type: sql.NVarChar,
      },
      userPhoneNoID: {
        value: UserPhoneNoID,
        type: sql.Char,
      },
      isVerified: {
        value: '0',
        type: sql.Char,
      },
      role: {
        value: 'admin',
        type: sql.NVarChar,
      },
      stripeID: {
        value: customer?.id,
        type: sql.NVarChar,
      },
      //hashed and salted password
      userPassword: {
        value: hashedPassword,
        type: sql.NVarChar,
      },
    };

    const tableName: string = 'userTable';

    let query: string = INSERTQueryString(tableName, Object.keys(user));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };

    await ControllerFunctionTemplate(user, query, messages, res);

    const tableNamePhoneNumber: string = 'userPhoneNumber';

    query = INSERTQueryString(tableNamePhoneNumber, Object.keys(userPhoneNo));

    const messages1: object = {
      errorMessage: `Error adding into ${tableNamePhoneNumber}`,
      successMessage: `Success Adding into ${tableNamePhoneNumber}`,
    };

    await ControllerFunctionTemplate(user, query, messages1, res);

    return;
  }
}

export default userRegister;
