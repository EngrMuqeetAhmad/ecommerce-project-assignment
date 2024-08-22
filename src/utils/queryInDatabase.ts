type QueryResult = {
  success: boolean;
  data: {
    rowsAffected: number;
    recordSet: any;
  };
};

async function queryInDatabase(
  query: string,
  params: any | object,
  dbConnectionPool: any | undefined,
): Promise<QueryResult> {
  let result: QueryResult = {
    success: false,
    data: {
      rowsAffected: 0,
      recordSet: undefined,
    },
  };
  try {
    const request: any = await dbConnectionPool?.request();

    for (const param in params) {
      const { value, type } = params[param];
      request.input(param, type, value);
    }

    const queryResult: any = await request?.query(query);
    result = {
      success: true,
      data: {
        rowsAffected: queryResult?.rowsAffected,
        recordSet: queryResult?.recordset,
      },
    };

    return result;
  } catch (error) {
    console.log(`Error create query the database ${error}`);

    return result;
  }
}

export { queryInDatabase, QueryResult };
