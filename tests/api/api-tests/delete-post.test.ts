import { api } from "../utils/api";
import { endpoints } from "../utils/endpoints";
import {
  invalidPostId,
  negativePostId,
  nonExistentPostId,
  postRequestBody,
} from "../test-data/posts-data";

describe("DELETE /posts/:id", () => {
  test("should delete post by id", async () => {
    const response = await api.delete(
      endpoints.posts.deletePost(postRequestBody.id)
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });

  test("should return 404 when deleting without ID", async () => {
    const response = await api.delete("/posts/").ok((res) => true);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({});
  });

  test("should respond gracefully to invalid ID", async () => {
    const response = await api
      .delete(endpoints.posts.deletePost(invalidPostId))
      .ok((res) => true);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });

  test("should return 200 and empty object for non-existing post ID", async () => {
    const response = await api
      .delete(endpoints.posts.deletePost(nonExistentPostId))
      .ok((res) => true);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });

  test("should handle negative post ID gracefully", async () => {
    const response = await api
      .delete(endpoints.posts.deletePost(negativePostId))
      .ok((res) => true);

    expect([200, 503]).toContain(response.statusCode);
    expect(response.body).toEqual({});
  });
});
