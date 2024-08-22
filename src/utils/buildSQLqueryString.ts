function INSERTQueryString(tableName: string, params: Array<string>): string {
  let queryString: string = '';

  let queryParamName: string = '';

  let queryParamValues: string = '';

  for (let index = 0; index < params.length; index++) {
    const element = params[index];

    queryParamName = queryParamName + element + ',';

    queryParamValues = queryParamValues + '@' + element + ',';
  }

  queryParamName = queryParamName.substring(0, queryParamName.length - 1);
  queryParamValues = queryParamValues.substring(0, queryParamValues.length - 1);

  queryString = `INSERT into ${tableName} ( ${queryParamName} ) VALUES ( ${queryParamValues} )`;

  return queryString;
}

function UPDATEQueryString(tableName: string, params: Array<string>): string {
  let queryString: string = '';

  let queryParams: string = '';

  for (let index = 0; index < params.length; index++) {
    const element = params[index];

    queryParams = queryParams + `${element} = @${element},`;
  }

  queryParams = queryParams.substring(0, queryParams.length - 1);

  queryString = `UPDATE ${tableName} SET ${queryParams} `;

  return queryString;
}

export { INSERTQueryString, UPDATEQueryString };
