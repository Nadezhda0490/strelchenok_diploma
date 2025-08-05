import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import { notExistingPost, post } from "../test-data/posts-data";

describe("GET /posts", () => {
  test("GET /posts - should return list of posts", async () => {
    const response = await api.get(endpoints.posts.getListOfPosts);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /posts/:id - should get post by ID", async () => {
    const response = await api.get(endpoints.posts.getPostById(post.id));

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(post);
  });

  test("GET /posts/:id - should return 404 for non-existing post", async () => {
    const response = await api
      .get(endpoints.posts.getPostById(notExistingPost))
      .ok((res) => true);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({});
  });

  test("GET /posts/:id - should contain all required fields", async () => {
    const response = await api.get(endpoints.posts.getPostById(post.id));

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("body");
  });

  test("GET /posts/:id - should return post with correct data types", async () => {
    const response = await api.get(endpoints.posts.getPostById(post.id));

    expect(typeof response.body.userId).toBe("number");
    expect(typeof response.body.id).toBe("number");
    expect(typeof response.body.title).toBe("string");
    expect(typeof response.body.body).toBe("string");
  });
});
