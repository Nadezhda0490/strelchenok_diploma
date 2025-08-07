import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  newPostRequestBody,
  postRequestBodyFrom0User,
  postWithoutBody,
} from "../test-data/posts-data";

describe("POST /posts", () => {
  test("should create a new post", async () => {
    const response = await api
      .post(endpoints.posts.createPost)
      .send(newPostRequestBody);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newPostRequestBody);
    expect(response.body).toHaveProperty("id");
  });

  test("should accept numeric userId", async () => {
    const response = await api
      .post(endpoints.posts.createPost)
      .send(newPostRequestBody);

    expect(response.statusCode).toBe(201);
    expect(typeof response.body.userId).toBe("number");
  });

  test("should accept string values for title and body", async () => {
    const response = await api
      .post(endpoints.posts.createPost)
      .send(newPostRequestBody);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newPostRequestBody);
    expect(typeof response.body.title).toBe("string");
    expect(typeof response.body.body).toBe("string");
  });

  test("should accept post with userId set to zero", async () => {
    const response = await api
      .post(endpoints.posts.createPost)
      .send(postRequestBodyFrom0User);

    expect(response.statusCode).toBe(201);
    expect(response.body.userId).toBe(0);
  });

  test("should create post without body", async () => {
    const response = await api
      .post(endpoints.posts.createPost)
      .send(postWithoutBody);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(postWithoutBody);
  });
});
