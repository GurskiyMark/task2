import { Request, Response } from "express";
import { postsDb } from "../db/posts.db";
import { HttpStatus } from "../../common/http-statuses";
import { createErrorResponse } from "../../common/error-messages";
import { postsInputDtoValidation } from "../postInputDtoValidation";
import { Posts } from "../db/posts.entity";


export const getPostsListHandler = (req: Request, res: Response) => {
    res.send(postsDb);
}

export const getPostHandler = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res
            .status(HttpStatus.BadRequest)
            .send(createErrorResponse([
                { field: 'id', message: 'Invalid id' }
            ]));
    }
    const post = postsDb.find((el) => el.id === id)

    if (!post) {
        return res.status(HttpStatus.NotFound).send(createErrorResponse([{ field: 'id', message: 'Blog not found' }]))
    }

    res.send(post);
}

export const createPostHandler = (req: Request, res: Response) => {

    const errors = postsInputDtoValidation(req.body);
    if (errors.length > 0) {
        return res.status(HttpStatus.BadRequest).send(createErrorResponse(errors))
    };

    const newPost: Posts = {
        id: new Date().getTime(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: new Date().getTime(),
        blogName: 'abc',
    }



    postsDb.push(newPost);
    res.status(HttpStatus.Created).send(newPost)
}

export const updatePostHandler = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res
            .status(HttpStatus.BadRequest)
            .send(createErrorResponse([
                { field: 'id', message: 'Invalid id' }
            ]));
    }

    const index = postsDb.findIndex((el) => el.id === id)

    if (index < 0) {
        return res.status(HttpStatus.NotFound).send(createErrorResponse([{ field: 'id', message: 'post not found' }]))
    }

    const errors = postsInputDtoValidation(req.body);
    if (errors.length > 0) {
        return res.status(HttpStatus.BadRequest).send(createErrorResponse(errors))
    };

    const post = postsDb[index];
    post.title = req.body.title;
    post.shortDescription = req.body.shortDescription;
    post.content = req.body.content;
    post.blogId = req.body.content;
    post.blogName = req.body.blogName

    res.sendStatus(HttpStatus.NoContent);
}

export const deletePostHandler = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res
            .status(HttpStatus.BadRequest)
            .send(createErrorResponse([
                { field: 'id', message: 'Invalid id' }
            ]));
    }

    const index = postsDb.findIndex((el) => el.id === id)

    if (index < 0) {
        return res.status(HttpStatus.NotFound).send(createErrorResponse([{ field: 'id', message: 'post not found' }]))
    }

    postsDb.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
}