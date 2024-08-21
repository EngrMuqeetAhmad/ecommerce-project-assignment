// var createError = require("http-errors");
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import { AppRouter } from "./src/controllers/router";
import apiKeyAuth from "./src/middleware/ApiKeyAuth.middleware";
import { sequelize } from "./src/config/dbConnection";
///
dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successflly");
    await sequelize.sync();
  } catch (error) {
    console.log("Error connecting to database", error);
  }
})();

const PORT = 3000;
var app = express();

const sslOptions = {
  key: fs.readFileSync(
    path.resolve("C:\\Users\\muqeet.ahmad\\Desktop", "server.key")
  ),
  cert: fs.readFileSync(
    path.resolve("C:\\Users\\muqeet.ahmad\\Desktop", "server.crt")
  ),
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/v1/", apiKeyAuth, AppRouter);

https.createServer(sslOptions, app).listen(PORT, (err: any) => {
  if (err) {
    console.log(`there is an error ${err.message}`);
  } else {
    console.log(`Server is listening at port ${PORT}`);
  }
});

// module.exports = app;
