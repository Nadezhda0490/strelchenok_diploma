export const postRequestBody = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};

export const nonExistingPostId = 11111;

export const newPostRequestBody = {
  userId: 12,
  title: "new post creation",
  body: "Example of a new post added via a test request",
};

export const postRequestBodyFrom0User = {
  userId: 0,
  title: "new post from zero user id",
  body: "post body from zero user id",
};

export const postWithoutBody = {
  userId: 256,
  title: "Post without body",
};

export const updatedPostRequestBody = {
  userId: postRequestBody.userId,
  id: postRequestBody.id,
  title: "updated title",
  body: "updated body",
};

export const postRequestBodyPartiallyUpdated = {
  userId: postRequestBody.userId,
  id: postRequestBody.id,
  title: "partially updated title",
  body: postRequestBody.body,
};

export const postRequestBodyWithExtraField = {
  userId: postRequestBody.userId,
  id: postRequestBody.id,
  title: postRequestBody.title,
  body: postRequestBody.body,
  userEmail: "test@example.com",
};

export const postUpdatedByAnotherUser = {
  userId: 444,
  id: postRequestBody.id,
  title: postRequestBody.title,
  body: postRequestBody.body,
};

export const postWithEmptyContent = {
  userId: postRequestBody.userId,
  id: postRequestBody.id,
  title: "",
  body: "",
};

export const patchOnlyTitle = {
  title: "patched title",
};
export const patchOnlyBody = {
  body: "patched body",
};

export const patchOnlyUserId = {
  userId: 567,
};

export const patchAllFields = {
  title: "patched title",
  body: "patched body",
};

export const patchEmptyTitle = {
  title: "",
};

export const invalidPostId = "invalidID";

export const nonExistentPostId = 100009;

export const negativePostId = -1;
