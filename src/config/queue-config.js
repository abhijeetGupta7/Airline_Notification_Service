const amqplib = require('amqplib');

let connection,channel;

async function connectQueue() {
    try {
        connection=await amqplib.connect("amqp://localhost");
        channel=await connection.createChannel();
        await channel.assertQueue("noti-queue");
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    connectQueue
}