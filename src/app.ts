import express, { Express } from "express";
import { myURL } from "./common/paths";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { postsRouter } from "./posts/routers/posts.router";



export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(200).send('task 2');
    });

    // app.use(myURL.TESTING_PATH);
    app.use(myURL.BLOGS_PATH, blogsRouter);
    app.use(myURL.POSTS_PATH, postsRouter);


    return app;
}