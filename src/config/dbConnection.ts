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

import { Sequelize } from "sequelize";
dotenv.config();
const sequelize: any = new Sequelize(
  `${process.env.DATABASE_NAME}`,
  `${process.env.USER}`,
  `${process.env.PASSWORD}`,
  {
    host: process.env.SERVER_NAME,
    port: parseInt(`${process.env.PORT}`, 10),
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      options: {
        encrypt: false, // necessary for Azure, etc.
      },
    },
    logging: console.log,
  }
);

export { connectToDatabase, sequelize };
