const { emailController } = require('../../controllers');

const emailRouter=require('express').Router();

emailRouter.post("/",emailController.createTicket);

module.exports=emailRouter;

