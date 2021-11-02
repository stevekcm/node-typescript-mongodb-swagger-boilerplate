import http from "http";
import moment from "moment";

import app from "./app";
import { contextLogger, infoLogger } from "./logger/logger";

//Normalize a port into a number, string, or false.
const normalizePort = (val: string) => {
  const myPort = parseInt(val, 10);

  if (isNaN(myPort)) {
    return val;
  }

  if (myPort >= 0) {
    return myPort;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);
app.set("etag", false); // avoid the 304 response from json GET request

// Create HTTP server.
const server = http.createServer(app);

// Event listener for HTTP server "error" event.
const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    infoLogger.error(error);
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      infoLogger.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      infoLogger.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  console.log("Service is listening on " + bind);
  contextLogger.info(`Service is listening on ${bind} at ${moment().format()}`);
};

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
