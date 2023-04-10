import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';

const logDirectory = join(__dirname, '..', 'logs'); // Set the log directory path
const logFile = new transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  dirname: logDirectory,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
});

const logConsole = new transports.Console({
  format: format.combine(format.colorize(), format.simple()),
});

export const logger = createLogger({
  level: 'info', // Set the log level as desired
  transports: [
    logFile, // Add the file transport to write logs to the local file
    logConsole, // Add the console transport to write logs to the console
  ],
});
