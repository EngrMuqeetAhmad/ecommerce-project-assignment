import sql from "mssql";

async function queryInDatabase(
  query: string,
  params: any | object,
  dbConnectionPool: any | undefined
) {
  try {
    const request: any = await dbConnectionPool?.request();

    for (const param in params) {
      const { value, type } = params[param];
      request.input(param, type, value);
    }

    const queryResult: any = await request?.query(query);

    console.log(`create Query Result ${queryResult?.recordSet}`);
    return true;
  } catch (error) {
    console.log(`Error create query the database ${error}`);
    return false;
  }
}


export { queryInDatabase };
