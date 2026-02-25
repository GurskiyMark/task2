import { Router } from "express";
import { createBlogHandler, deleteBlogHandler, getBlogHandler, getBlogsListHandler, updateBlogHandler } from "./blogs.handlers";
import { blogBodyValidation, blogUpdateBodyValidation  } from "../Blogs.Validation";
import { idValidation } from "../../common/validations/id.validator";
import { inputValidationResultMiddleware } from "../../common/middleware/inputValidationResultMiddleware";






export const blogsRouter = Router();


blogsRouter.get('', getBlogsListHandler);
blogsRouter.get('/:id',idValidation, inputValidationResultMiddleware, getBlogHandler);
blogsRouter.post('',blogBodyValidation, inputValidationResultMiddleware, createBlogHandler);
blogsRouter.put('/:id',idValidation, blogUpdateBodyValidation, inputValidationResultMiddleware, updateBlogHandler);
blogsRouter.delete('/:id',idValidation, inputValidationResultMiddleware, deleteBlogHandler);

ё