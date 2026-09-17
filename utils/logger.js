import winston from "winston";


function padding(message, size=2, fill="0") {
  return String(message).padStart(size, fill);
}

function timestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = padding(now.getMonth() + 1);
  const day = padding(now.getDate());
  const hour = padding(now.getHours());
  const minute = padding(now.getMinutes());
  const second = padding(now.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// LOG_LEVELS:
//   error: 0
//   warn: 1
//   info: 2
//   http: 3
//   verbose: 4
//   debug: 5
//   silly: 6

export const logger = winston.createLogger({
  level: "verbose",
  format: winston.format.combine(
    winston.format.timestamp({ format: timestamp }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, error }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message} ${error?.message ? error.message : ""}`
    })
  ),
  transports: [new winston.transports.Console()]
});
