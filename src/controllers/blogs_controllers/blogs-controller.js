const statusCodes=require("http-status-codes");
const logger = require("../../config/winston-logger-config");

function pingController(req,res) {
    logger.info("Ping controller");
    res.status(statusCodes.OK).json({
        msg:"pong",
        error:{},
        details:"API service is live"
    })
}

function getBlogs(req,res) {
    res.status(statusCodes.NOT_IMPLEMENTED).json({
        msg:"Get blogs API is not implemented yet",
        error: "NOT IMPLEMENTED ERROR",
        details:"Coming soon"
    })
}

module.exports={
    pingController,
    getBlogs
}