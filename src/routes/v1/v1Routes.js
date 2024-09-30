const express=require('express');
const blogsRouter = require('./blogs/blogsRoutes');

const v1Router=express.Router();

v1Router.use("/blogs",blogsRouter);

module.exports=v1Router;