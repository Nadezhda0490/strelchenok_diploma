import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  emptyContentPost,
  partiallyUpdatedPost,
  post,
  postWithAdditionalData,
  updatedByOtherUserPost,
  updatedPost,
} from "../test-data/posts-data";

describe("PUT /posts/:id", () => {
  test("PUT /posts/:id - should update post", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(post.id))
      .send(updatedPost);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedPost);
    expect(response.body).toHaveProperty("id", post.id);
  });

  test("PUT /posts/:id - should update only post title", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(post.id))
      .send(partiallyUpdatedPost);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(partiallyUpdatedPost.title);
  });

  test("PUT /posts/:id - should allow changing the userId of an existing post", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(post.id))
      .send(updatedByOtherUserPost);

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(updatedByOtherUserPost.userId);
  });

  test("PUT /posts/:id - should accept extra fields in request body", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(post.id))
      .send(postWithAdditionalData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "userEmail",
      postWithAdditionalData.userEmail
    );
  });

  test("PUT /posts/:id - should allow updating post with empty title and body", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(post.id))
      .send(emptyContentPost);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("");
    expect(response.body.body).toBe("");
  });
});
