import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  postWithEmptyContent,
  postRequestBodyPartiallyUpdated,
  postRequestBody,
  postRequestBodyWithExtraField,
  postUpdatedByAnotherUser,
  updatedPostRequestBody,
} from "../test-data/posts-data";

describe("PUT /posts/:id", () => {
  test("should update post by id", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(postRequestBody.id))
      .send(updatedPostRequestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedPostRequestBody);
    expect(response.body).toHaveProperty("id", postRequestBody.id);
  });

  test("should update only post title by id", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(postRequestBody.id))
      .send(postRequestBodyPartiallyUpdated);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(postRequestBodyPartiallyUpdated.title);
  });

  test("should allow changing the userId of an existing post", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(postRequestBody.id))
      .send(postUpdatedByAnotherUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(postUpdatedByAnotherUser.userId);
  });

  test("should accept extra fields in request body", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(postRequestBody.id))
      .send(postRequestBodyWithExtraField);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "userEmail",
      postRequestBodyWithExtraField.userEmail
    );
  });

  test("should allow updating post with empty title and body", async () => {
    const response = await api
      .put(endpoints.posts.updatePost(postRequestBody.id))
      .send(postWithEmptyContent);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("");
    expect(response.body.body).toBe("");
  });
});
