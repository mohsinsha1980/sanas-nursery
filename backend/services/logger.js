import { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    new DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true, // to compress old logs
    }),
  ],
});

const log = (data) => {
  logger.log(
    data.level,
    `User : ${data.user || ""} | URL : ${data.url || ""} | message : ${
      data.message || ""
    }`
  );
};

export default { log };
