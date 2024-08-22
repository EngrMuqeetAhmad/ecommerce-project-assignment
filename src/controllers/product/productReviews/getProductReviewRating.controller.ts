import sql from 'mssql';
import { connectToDatabase } from '../../../config/dbConnection';

import { Role } from '../../../types/userTypes';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function getProductReviewRating(req: any, res: any) {
  const { ID, role } = req.user; //user ID
  const { reviewID } = req.body;

  //validation:
  if (!reviewID) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    const queryGetBaseProduct =
      'SELECT ID, userMessage, rating, timestamp, productVariationID FROM productVariationID WHERE ID=@ID';

    const params = {
      ID: { value: reviewID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(
      params,
      queryGetBaseProduct,
      messages,
      res,
    );
    return;
  }
}

export { getProductReviewRating };
