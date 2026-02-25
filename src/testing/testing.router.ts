import { Router , Request, Response} from 'express';
import { blogsDb } from '../blogs/db/blogs.db';
import { postsDb } from '../posts/db/posts.db';
import { HttpStatus } from '../common/http-statuses';

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
  blogsDb.length = 0;
  postsDb.length = 0;
  res.sendStatus(HttpStatus.NoContent);
});