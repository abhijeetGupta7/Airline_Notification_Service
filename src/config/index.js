module.exports={
    transporter:require("./mail-config"),
    serverConfig:require("./server-config"),
    logger:require("./winston-logger-config"),
    Queue: require("./queue-config")
}