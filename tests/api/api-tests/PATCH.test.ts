import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  patchBody,
  patchFull,
  patchTitle,
  patchUserId,
  patchWithEmptyTitle,
  post,
} from "../test-data/posts-data";

describe("PATCH /posts/:id", () => {
  test("PATCH /posts/:id - should update only title", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(post.id))
      .send(patchTitle);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(patchTitle.title);
    expect(response.body).toHaveProperty("id", post.id);
  });

  test("PATCH /posts/:id - should update only body", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(post.id))
      .send(patchBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.body).toBe(patchBody.body);
    expect(response.body).toHaveProperty("id", post.id);
  });

  test("PATCH /posts/:id - should allow assigning post to another user", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(post.id))
      .send(patchUserId);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userId", patchUserId.userId);
    expect(response.body).toHaveProperty("id", post.id);
  });

  test("PATCH /posts/:id - should update title and body", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(post.id))
      .send(patchFull);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(patchFull);
    expect(response.body).toHaveProperty("id", post.id);
  });

  test("PATCH /posts/:id - should allow setting empty title", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(post.id))
      .send(patchWithEmptyTitle);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title", patchWithEmptyTitle.title);
    expect(response.body).toHaveProperty("id", post.id);
  });
});
