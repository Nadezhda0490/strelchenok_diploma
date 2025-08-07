import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  patchOnlyBody,
  patchAllFields,
  patchOnlyTitle,
  patchOnlyUserId,
  patchEmptyTitle,
  postRequestBody,
} from "../test-data/posts-data";

describe("PATCH /posts/:id", () => {
  test("should update only title by id", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(postRequestBody.id))
      .send(patchOnlyTitle);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(patchOnlyTitle.title);
    expect(response.body).toHaveProperty("id", postRequestBody.id);
  });

  test("should update only body by id", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(postRequestBody.id))
      .send(patchOnlyBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.body).toBe(patchOnlyBody.body);
    expect(response.body).toHaveProperty("id", postRequestBody.id);
  });

  test("should allow assigning post to another user", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(postRequestBody.id))
      .send(patchOnlyUserId);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userId", patchOnlyUserId.userId);
    expect(response.body).toHaveProperty("id", postRequestBody.id);
  });

  test("should update title and body by id", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(postRequestBody.id))
      .send(patchAllFields);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(patchAllFields);
    expect(response.body).toHaveProperty("id", postRequestBody.id);
  });

  test("should allow setting empty title by id", async () => {
    const response = await api
      .patch(endpoints.posts.updatePost(postRequestBody.id))
      .send(patchEmptyTitle);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title", patchEmptyTitle.title);
    expect(response.body).toHaveProperty("id", postRequestBody.id);
  });
});
