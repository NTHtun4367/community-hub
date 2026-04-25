export const postsPath = "/posts";
export const aboutPath = "/about";

export const singlePostPath = (id: string | number) => `${postsPath}/${id}`;
export const editPostPath = (id: string | number) => `${postsPath}/${id}/edit`;

export const signUpPath = "/auth/sign-up";
export const signInPath = "/auth/sign-in";
export const forgotPasswordPath = "/auth/forgot-password";
