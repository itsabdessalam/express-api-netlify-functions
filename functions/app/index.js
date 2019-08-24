/* Express App */
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

/* My express App */
export default function expressApp(functionName) {
  const routerBasePath =
      process.env.NODE_ENV === "dev"
        ? `/${functionName}`
        : `/.netlify/functions/${functionName}/`,
    bodyParser = require("body-parser"),
    createError = require("http-errors"),
    express = require("express"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    logger = require("morgan"),
    helmet = require("helmet"),
    routes = require("./routes"),
    app = express(),
    router = express.Router();
  // CORS
  //   app.use((req, res, next) => {
  //     // res.header("Access-Control-Allow-Origin", "*");
  //     // res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  //     // res.header(
  //     //   "Access-Control-Allow-Headers",
  //     //   "Origin, X-Requested-With, Content-Type, Accept"
  //     // );
  //     next();
  //   });

  app.use(logger("dev"));
  // security
  app.use(helmet());
  // body-parser
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // routes
  app.use(routerBasePath, routes);
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404, `Cannot ${req.method} ${req.originalUrl}`));
  });
  // error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
  });

  return app;
}
