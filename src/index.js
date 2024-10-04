const express=require("express");
const { PORT, GMAIL_EMAIL } = require("./config/server-config");
const apiRouter = require("./routes");
const transporter = require("./config/mail-config");

const app=express();

app.use("/api",apiRouter);   // here /api has a meaning, generally this prefix is used when the routes here are actually apis that are made to be used exposed api, if these were routes for serving static files like html pages or someting /home for home page, then in that case /api prefix was not used

app.listen(PORT, async (req,res)=>{
    console.log(`Server is listening at ${PORT}`);
   try {
    const response= await transporter.sendMail({
        from: GMAIL_EMAIL,
        to: "abhijeet7771204@gmail.com",
        text: "Hi, is notification service working"
   })
   console.log(response);
   } catch (error) {
        console.log(error);
   }   
})