export const postsPath = "/posts";
export const aboutPath = "/about";
export const profilePath = "/profile";
export const savedPostPath = "/saved";
export const createPostPath = "/posts/create";
export const notificationPath = "/notifications";

export const singlePostPath = (id: string | number) => `${postsPath}/${id}`;
export const editPostPath = (id: string | number) => `${postsPath}/${id}/edit`;

export const resetPasswordPath = "/auth/reset-password";
export const changePasswordPath = "/auth/change-password";
