export const endpoints = {
  posts: {
    getListOfPosts: "/posts",
    getPostById: (id: number | string) => `/posts/${id}`,
    createPost: "/posts",
    updatePost: (id: number | string) => `/posts/${id}`,
    deletePost: (id: number | string) => `/posts/${id}`,
  },
};
