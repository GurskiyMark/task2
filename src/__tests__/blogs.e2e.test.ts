import request from 'supertest';
import express, { Express } from 'express';
import { setupApp } from '../app';
import { myURL } from '../common/paths';
import { HttpStatus } from '../common/http-statuses';
import {CreateBlogInputDto } from '../blogs/blogs.dto';


describe(`Blogs API`, () => {
  const app = express();
  setupApp(app);

  const testBlogData: CreateBlogInputDto = {
    name: 'Anna',
    description: 'abc',
    websiteUrl: 'https://example.com',
  }

  const createBlog = async (data: Partial<CreateBlogInputDto> = {}) => {
    const res = await request(app)
      .post(myURL.BLOGS_PATH)
      .send({ ...testBlogData, ...data })
      .expect(HttpStatus.Created);

    return res.body;
  };



  beforeEach(async () => {
    await request(app)
      .delete(`${myURL.TESTING_PATH}/all-data`)
      .expect(HttpStatus.NoContent)
  })

  it(`🟢should return 200 and empty array`, async () => {
    const res = await request(app)
      .get(myURL.BLOGS_PATH)
      .expect(HttpStatus.Ok);

    expect(res.body).toEqual([]);
  })

  it(`🟢should create a new blog and return 201 status, POST blogs`, async () => {
    const input = { ...testBlogData, name: 'test' }
    const newBlog = await createBlog({name: 'test'});
    expect(newBlog.id).toBeDefined()
    expect(newBlog).toEqual({...input, id:newBlog.id})

  });

  it('🟢should create 3 new blog and return this new 2 blogs; GET blogs', async () => {
    const newBlog1 = await createBlog({ name: 'Blog 1' })
    const newBlog2 = await createBlog({ name: 'Blog 2' })
    const newBlog3 = await createBlog({ name: 'Blog 3' })

    const resGet = await request(app)
      .get(myURL.BLOGS_PATH)
      .expect(HttpStatus.Ok);

    expect(resGet.body).toEqual(expect.arrayContaining([newBlog1, newBlog2, newBlog3]))
    expect(resGet.body.length).toBe(3)
  });

  it(`🟢should return blog by id and return 200; GET:id blogs`, async () => {
    const createRes = await createBlog()
    const getRes = await request(app)
      .get(`${myURL.BLOGS_PATH}/${createRes.id}`)
      .expect(HttpStatus.Ok)

    expect(getRes.body).toEqual(createRes)
  });

  it(`🟢should update blog by id and return 204; PUT`, async () => {
    const createRes = await createBlog({
      name: 'original name',
      description: 'original description',
      websiteUrl: 'https://original.com'
    });

    const updateData = {name: 'update name'};

    await request(app)
      .put(`${myURL.BLOGS_PATH}/${createRes.id}`)
      .send(updateData)
      .expect(HttpStatus.NoContent)

      const getRes = await request(app)
      .get(`${myURL.BLOGS_PATH}/${createRes.id}`)
      .expect(HttpStatus.Ok)

      expect(getRes.body).toEqual({
        id: createRes.id,
        name: updateData.name,
        description: createRes.description,
        websiteUrl: createRes.websiteUrl
      }) 
    })

  it('🟢should delete blog by id and return 204', async () => {
    const blog = await createBlog({name: 'to-delete'});
    await request(app)
      .delete(`${myURL.BLOGS_PATH}/${blog.id}`)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${myURL.BLOGS_PATH}/${blog.id}`)
      .expect(HttpStatus.NotFound);
  });

});