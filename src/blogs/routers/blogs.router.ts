import { Router } from "express";
import { createBlogHandler, deleteBlogHandler, getBlogHandler, getBlogsListHandler, updateBlogHandler } from "./blogs.handlers";



export const blogsRouter = Router();


blogsRouter.get('', getBlogsListHandler);
blogsRouter.get('/:id', getBlogHandler);
blogsRouter.post('', createBlogHandler);
blogsRouter.put('/:id', updateBlogHandler);
blogsRouter.delete('/:id', deleteBlogHandler);

