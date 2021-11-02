import log4js from "log4js";

class Logger {
  private static logDir: string = process.env.logDir ?? "./logs";
  private static instance: log4js.Log4js = log4js.configure({
    appenders: {
      context: { type: "dateFile", filename: `${Logger.logDir}/context.log` },
      info: { type: "dateFile", filename: `${Logger.logDir}/info.log` },
      console: { type: "console" },
    },
    categories: {
      context: { appenders: ["context", "info", "console"], level: "info" },
      info: { appenders: ["info", "console"], level: "info" },
      default: { appenders: ["console"], level: "debug" },
    },
  });

  static contextLogger: log4js.Logger = Logger.instance.getLogger("context");
  static infoLogger: log4js.Logger = Logger.instance.getLogger("info");
}

export const contextLogger: log4js.Logger = Logger.contextLogger;
export const infoLogger: log4js.Logger = Logger.infoLogger;
