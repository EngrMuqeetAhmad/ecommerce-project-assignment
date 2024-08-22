import sql from 'mssql';
import { ControllerFunctionTemplate } from '../../../../utils/controllerFunctionTemplate';

async function deleteVariationType(req: any, res: any) {
  const { ID, role } = req.user;
  const { variationTypeID } = req.body;

  //validation:
  if (!variationTypeID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: variationTypeID,
        type: sql.Char,
      },
    };
    const query = `DELETE FROM ProductVariationType WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting Base Product variation Type`,
      successMessage: `success deleting base product variation Type`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteVariationType };
