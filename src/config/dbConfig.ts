// dbConfig.js

// let config: object = {
//   user: "sa",
//   password: "Galaxy#20@24",
//   server: "MULLT-3985", // e.g., 'localhost' or 'your_server.database.windows.net'
//   database: "ecommerce-database",
//   options: {
//     encrypt: false, // Use this if you're on Azure
//     trustServerCertificate: true, // Change to false if you're not working locally
//   },
// };

// module.exports = config;

// dbConfig.js

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  server: process.env.SERVER_NAME,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

module.exports = config;
