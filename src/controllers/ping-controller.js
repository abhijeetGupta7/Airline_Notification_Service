const { StatusCodes } = require("http-status-codes");

function pingController(req,res) {
    return res.status(StatusCodes.OK).json({
        msg:"Pong"
    });
}

module.exports=pingController