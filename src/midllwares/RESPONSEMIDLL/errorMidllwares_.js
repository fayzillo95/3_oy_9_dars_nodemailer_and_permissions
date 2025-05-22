import fs from "fs";
import path from "path";
import {logger} from "../../utils/Logs/winston.logger.js";

export default (error, req, res, next) => {
    if (error.status) {
        logger.info(error.message)
        return res.status(error.status).json({
            message: error.message,
            success: false,
            data: null
        });
    } else {
        res.status(500).json({
            message: "Internal server error !",
            success: false,
            data: null
        })
    }
    logger.error(error.message)
}
