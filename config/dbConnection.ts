import sql from "mssql";
import dotenv from "dotenv";
async function connectToDatabase() {
  dotenv.config();
  const connectionString = `Server=${process.env.SERVER_NAME},${process.env.PORT};Database=${process.env.DATABASE_NAME};User Id=${process.env.USER};Password=${process.env.PASSWORD};Encrypt=true;TrustServerCertificate=true`;
  try {
    let pool = await sql.connect(connectionString);
    console.log(`Connected to Database: ${pool}`);
    return pool;
  } catch (error) {
    console.log(`An error occured  ${error}`);
  }
}

export { connectToDatabase };
