import { queryInDatabase, QueryResult } from './queryInDatabase';
import { connectToDatabase } from '../config/dbConnection';

async function ControllerFunctionTemplate(
  params: any,
  query: string,
  messages: any,
  res: any,
) {
  console.log(query, params);

  const pool: object | undefined | any = await connectToDatabase();

  try {
    const result: QueryResult = await queryInDatabase(query, params, pool);

    if (result.data.rowsAffected == 0) {
      res.json({ message: messages.errorMessage, data: undefined });
      return;
    }

    res.json({ message: messages.successMessage, data: result });
    return;
  } catch (error) {
    res.json({ message: `creation failed` });
    await pool?.close();
    return;
  }
}

export { ControllerFunctionTemplate };
