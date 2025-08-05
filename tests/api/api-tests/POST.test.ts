import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  newPost,
  postFrom0User,
  postWithoutBody,
} from "../test-data/posts-data";

describe("POST /posts", () => {
  test("POST /posts - should create a new post", async () => {
    const response = await api.post(endpoints.posts.createPost).send(newPost);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newPost);
    expect(response.body).toHaveProperty("id");
  });

  test("POST /posts - should accept numeric userId", async () => {
    const response = await api.post(endpoints.posts.createPost).send(newPost);

    expect(response.statusCode).toBe(201);
    expect(typeof response.body.userId).toBe("number");
  });

  test("POST /posts -should accept string values for title and body", async () => {
    const response = await api.post(endpoints.posts.createPost).send(newPost);

    expect(response.statusCode).toBe(201);
    expect(typeof response.body.title).toBe("string");
    expect(typeof response.body.body).toBe("string");
  });

  test("POST /posts - should accept post with userId set to zero", async () => {
    const response = await api
      .post(endpoints.posts.createPost)
      .send(postFrom0User);

    expect(response.statusCode).toBe(201);
    expect(response.body.userId).toBe(0);
  });

  test("POST /posts - should create post without body", async () => {
    const response = await api
      .post(endpoints.posts.createPost)
      .send(postWithoutBody);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(postWithoutBody);
  });
});
