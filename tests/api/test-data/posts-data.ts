export const post = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};

export const notExistingPost = 11111;

export const newPost = {
  userId: 12,
  title: "new post creation",
  body: "Example of a new post added via a test request",
};

export const postFrom0User = {
  userId: 0,
  title: "new post from zero user id",
  body: "post body from zero user id",
};

export const postWithoutBody = {
  userId: 256,
  title: "Post without body",
};

export const updatedPost = {
  userId: post.userId,
  id: post.id,
  title: "updated title",
  body: "updated body",
};

export const partiallyUpdatedPost = {
  userId: post.userId,
  id: post.id,
  title: "partially updated title",
  body: post.body,
};

export const postWithAdditionalData = {
  userId: post.userId,
  id: post.id,
  title: post.title,
  body: post.body,
  userEmail: "test@example.com",
};

export const updatedByOtherUserPost = {
  userId: 444,
  id: post.id,
  title: post.title,
  body: post.body,
};

export const emptyContentPost = {
  userId: post.userId,
  id: post.id,
  title: "",
  body: "",
};

export const patchTitle = {
  title: "patched title",
};
export const patchBody = {
  body: "patched body",
};

export const patchUserId = {
  userId: 567,
};

export const patchFull = {
  title: "patched title",
  body: "patched body",
};

export const patchWithEmptyTitle = {
  title: "",
};

export const invalidPostId = "invalidID";

export const nonExistentPostId = 100009;

export const negativePostId = -1;
