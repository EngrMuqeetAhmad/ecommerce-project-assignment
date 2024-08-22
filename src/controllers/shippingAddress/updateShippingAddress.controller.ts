import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../config/dbConnection';
import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';

async function userUpdateShippingAddress(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const {
    addressID,
    newAddressLine1,
    newAddressLine2,
    newRegion,
    newPostalCode,
    newCountry,
  } = req.body;

  //validation:
  if (
    !addressID ||
    !newAddressLine1 ||
    !newAddressLine2 ||
    !newRegion ||
    !newPostalCode ||
    !newCountry
  ) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: addressID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
      addressLine1: {
        value: newAddressLine1,
        type: sql.NVarChar,
      },
      addressLine2: {
        value: newAddressLine2,
        type: sql.NVarChar,
      },
      region: {
        value: newRegion,
        type: sql.VarChar,
      },
      postalCode: {
        value: newPostalCode,
        type: sql.VarChar,
      },

      country: {
        value: newCountry,
        type: sql.VarChar,
      },
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryAddShippingAddress = `UPDATE userShippingAddress SET addressLine1 = @addressLine1, addressLine2 =@addressLine2, region = @region, postalCode = @postalCode, country = @country WHERE ID = @ID AND userID = @userID`;

      const resultAddShippingAddress: QueryResult = await queryInDatabase(
        queryAddShippingAddress,
        params,
        pool,
      );

      if (resultAddShippingAddress.data.rowsAffected == 0) {
        res.json({ message: 'error updating shipping address' });
        return;
      }

      res.json({ message: 'Success- updating shipping address' });
      return;
    } catch (error) {
      res.json({ message: `updating failed` });
      await pool?.close();
      return;
    }
  }
}

export { userUpdateShippingAddress };
