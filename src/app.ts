import express from "express";
import { NextFunction, Request, Response } from "express";
import { infoLogger, contextLogger } from "./logger/logger";
import helmet from "helmet";
import routes from "./routes";
import expressJSDocSwagger from "express-jsdoc-swagger";
import mongoose from "mongoose";
import exceptionHandler from "./handlers/exceptionHandler";

const app = express();

//Security settings
app.disable("x-powered-by");
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//swagger generate
const options = {
  info: {
    version: "1.0.0",
    title: "node-typescript-mongodb-boilerplate",
    license: {
      name: "APLv2",
    },
  },
  security: {
    BasicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
  // URL where SwaggerUI will be rendered
  swaggerUIPath: "/api-docs",
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: "/v3/api-docs",
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

//Init Swagger
expressJSDocSwagger(app)(options);

//Init MongoDB connection
mongoose.Promise = global.Promise;
const getDBConnection = () => {
  //https://stackoverflow.com/questions/39529870/ifprocess-env-node-env-production-always-false
  if (process.env.NODE_ENV.trim() === "development") return process.env.DATABASE_DEV;
  else if (process.env.NODE_ENV.trim() === "test") return process.env.DATABASE_TEST;
  else if (process.env.NODE_ENV.trim() === "production") return process.env.DATABASE_PROD;
};

const mongoPromise = mongoose.connect(getDBConnection());

mongoPromise.then(
  () => {
    contextLogger.info(`The application connected database ${getDBConnection()} successfully`);
    console.log("Connected to Database", getDBConnection());
  },
  (err: Error) => {
    infoLogger.error(`The application connected database ${getDBConnection()} failed`);
    console.log("Failed to connect database: ", err);
    return;
  }
);

//register router
app.use(`/api/${process.env.API_VER}`, routes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found");
  err.status = 404;
  // next(err);
  return res.status(404).end();
});

// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response) => {
  console.error("Global Error Caught", err.stack);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

//Global Error Caught
app.use(exceptionHandler);

export default app;
