import { ControllerFunctionTemplate } from '../../utils/controllerFunctionTemplate';

async function getProductWithVariationCombinations(req: any, res: any) {
  const { ID, role } = req.user;

  const { baseProductID } = req.params;

  if (!baseProductID) {
    res.status(403).json({ message: 'BAD Request' });
    return;
  } else {
    const sql = require('mssql');

    const params: object = {
      productID: {
        value: baseProductID,
        type: sql.Char,
      },
    };

    const query: string = `SELECT 
                            p.productTitle, p.productDescription, 
                            pv.stockQuantity, 
                            p.basePrice + pv.additionalPrice AS FinalPrice,
                            STRING_AGG(vValue.productVariationTypeValue, ', ') WITHIN GROUP (ORDER BY vt.productVariationName) AS VariationDetails,
                            STRING_AGG(pvImages.path, ',')  VariationImages
                            
                        FROM 
                            Product p
                        JOIN 
                            ProductVariation pv ON p.ID = pv.productID
                        JOIN 
                            ProductVariationDetails pvd ON pv.ID = pvd.productVariationID
                        JOIN
                            ProductVariationImages pvImages ON pvd.ID = pvImages.productVariationDetailsID
                        JOIN 
                            ProductVariationTypeValue vValue ON pvd.productVariationTypeValueID = vValue.ID
                        JOIN 
                            productVariationType vt ON vValue.productVariationTypeID = vt.ID
                        WHERE 
                            p.ID = @productID
                        GROUP BY 
                            p.productTitle, p.productDescription ,pv.stockQuantity, p.basePrice + pv.additionalPrice
                        
                        `;

    const messages: object = {
      errorMessage: `Error getting the product with given id`,
      successMessage: `Success  - product found`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export default getProductWithVariationCombinations;
