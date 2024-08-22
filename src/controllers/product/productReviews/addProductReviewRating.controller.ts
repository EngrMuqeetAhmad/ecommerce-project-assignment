import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../../config/dbConnection';
import { INSERTQueryString } from '../../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function addProductReviewRating(req: any, res: any) {
  const { ID, role } = req.user;
  const { userMessage, timestamp, rating, productVariationID, userID } =
    req.body;

  //validation:
  if (!userMessage || !timestamp || !rating || !productVariationID || !userID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////
    const reviewID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: reviewID,
        type: sql.Char,
      },
      userMessage: {
        value: userMessage, //this is userID
        type: sql.NVarChar,
      },
      timestamp: {
        value: timestamp,
        type: sql.SmallDateTime,
      },
      rating: {
        value: rating,
        type: sql.Char,
      },
      productVariationID: {
        value: productVariationID,
        type: sql.Char,
      },
      userID: {
        value: userID,
        type: sql.Char,
      },
    };

    const tableName: string = 'ProductUserReviewRating';
    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { addProductReviewRating };
