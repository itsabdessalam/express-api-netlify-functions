export default function expressApp(functionName) {
  const routerBasePath =
      process.env.NODE_ENV === "dev"
        ? `/${functionName}`
        : `/.netlify/functions/${functionName}/`,
    createError = require("http-errors"),
    express = require("express"),
    logger = require("morgan"),
    helmet = require("helmet"),
    routes = require("./routes"),
    app = express();

  // CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(logger("dev"));

  // security
  app.use(helmet());

  // built-in middleware as body-parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

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
