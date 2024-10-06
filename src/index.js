const express=require("express");
const { PORT, GMAIL_EMAIL, GMAIL_APP_PASS } = require("./config/server-config");
const { Queue } =require("./config");
const apiRouter = require("./routes");
const {EmailService}=require("./services");
const amqplib=require("amqplib");

const emailService=new EmailService();

const app=express();

async function connectQueue() {
    try {
        const connection=await amqplib.connect("amqp://localhost");
        const channel=await connection.createChannel();
        await channel.assertQueue("noti-queue");

        channel.consume('noti-queue', (msgBuffer) => {
            console.log(msgBuffer);
            if (msgBuffer !== null) {
                const messageString=msgBuffer.content.toString();
                const message=JSON.parse(messageString);
                console.log('Received:', messageString);
                const details=`Booking Done for the Booking id: ${message.body.id} and Flight id is ${message.body.flightId}`;
                emailService.sendMail(
                    GMAIL_EMAIL,
                    message.recipientEmail,
                    message.subject,
                    details
                )
                channel.ack(msgBuffer);
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function name(params) {
    
}


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.text());

app.use("/api",apiRouter);   // here /api has a meaning, generally this prefix is used when the routes here are actually apis that are made to be used exposed api, if these were routes for serving static files like html pages or someting /home for home page, then in that case /api prefix was not used

app.listen(PORT, async (req,res)=>{
    console.log(`Server is listening at ${PORT}`); 
    await connectQueue(); 
})