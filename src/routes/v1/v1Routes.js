const express=require('express');
const emailRouter = require('./email-router');
const { pingController } = require('../../controllers');

const v1Router=express.Router();

v1Router.use("/email",emailRouter);
v1Router.get("/ping",pingController);

module.exports=v1Router;