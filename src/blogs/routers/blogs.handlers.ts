import { Request, Response } from 'express';
import { blogsDb } from '../db/blogs.db';
import { HttpStatus } from '../../common/http-statuses';
import { createErrorResponse } from '../../common/error-messages';
import { Blogs } from '../db/blog.entity';
import { BlogOutputDto, CreateBlogInputDto, UpdateBlogInputDto } from '../blogs.dto';


/*
Request:
 < Params, ResBody, ReqBody, ReqQuery, Locals > 

*/


export const getBlogsListHandler = (req: Request, res: Response) => {
    res.send(blogsDb)
}

export const getBlogHandler = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const blog = blogsDb.find((el) => el.id === id)

    if (!blog) {
        return res.status(HttpStatus.NotFound).send(createErrorResponse([{ field: 'id', message: 'Blog not found' }]))
    }

    res.send(blog);
}

export const createBlogHandler = (req: Request, res: Response) => {
    const newBlog: Blogs = {
        id: new Date().getTime(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    }

    blogsDb.push(newBlog);
    res.status(HttpStatus.Created).send(newBlog);
}

export const updateBlogHandler = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = blogsDb.findIndex(el => el.id === id);

    if (index < 0) {
        return res.status(HttpStatus.NotFound).send(
            createErrorResponse([{ field: 'id', message: 'blog not found' }])
        );
    }

    const blog = blogsDb[index];
    blog.name = req.body.name;
    blog.description = req.body.description;
    blog.websiteUrl = req.body.websiteUrl;

    res.sendStatus(HttpStatus.NoContent);
};


export const deleteBlogHandler = (req: Request, res: Response) => {
    
    const id = Number(req.params.id);
    const index = blogsDb.findIndex((el) => el.id === id)

    if (index < 0) {
        return res.status(HttpStatus.NotFound).send(createErrorResponse([{ field: 'id', message: 'blog not found' }]))
    }

    blogsDb.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
}

