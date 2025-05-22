import winston from "winston";
import path from "path";

export const serverLog = path.join(process.cwd(), "src", "utils", "Logs", "server.logger.log")
export const userLog = path.join(process.cwd(), "src", "utils", "Logs", "user.logger.log")

export const logger = winston.createLogger({
    level:'infon',
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({level, message, timestamp}) => {
            return `${timestamp} [level > ${level.toUpperCase()}] : ${message}`;
        })
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:serverLog,level:'error'}),
        new winston.transports.File({filename:userLog,level:'info'})
    ]
});

