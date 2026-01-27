import { Router } from "express";
import { createPostHandler, deletePostHandler, getPostHandler, getPostsListHandler, updatePostHandler } from "./posts.handlers";
import { idValidation } from "../../common/validations/id.validator";
import { postBodyValidation } from "../posts.Validations";
import { inputValidationResultMiddleware } from "../../common/middleware/inputValidationResultMiddleware";



export const postsRouter = Router();
 
postsRouter
    .get('', getPostsListHandler)
    .get('/:id', idValidation, inputValidationResultMiddleware, getPostHandler)
    .post('', postBodyValidation, inputValidationResultMiddleware, createPostHandler)
    .put('/:id', idValidation, postBodyValidation, inputValidationResultMiddleware, updatePostHandler)
    .delete('/:id', idValidation, inputValidationResultMiddleware, deletePostHandler);

    