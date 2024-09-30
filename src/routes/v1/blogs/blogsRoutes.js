const express=require('express');
const blogsController = require('../../../controllers');

const blogsRouter=express.Router();

blogsRouter.get("/ping",blogsController.pingController);
blogsRouter.get("/",blogsController.getBlogs);

module.exports=blogsRouter;