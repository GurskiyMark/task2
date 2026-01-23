import { Router } from "express";
import { createPostHandler, deletePostHandler, getPostHandler, getPostsListHandler, updatePostHandler } from "./posts.handlers";



export const postsRouter = Router();
 
postsRouter
    .get('', getPostsListHandler)
    .get('/:id', getPostHandler)
    .post('', createPostHandler)
    .put('/:id', updatePostHandler)
    .delete('/:id', deletePostHandler);

    