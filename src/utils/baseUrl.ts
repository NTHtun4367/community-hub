export const getBaseUrl = () => {
  const env = process.env.NODE_ENV;

  const baseUrl =
    env === "development" ? "http://localhost:3000" : "https://domain.com";

  return baseUrl;
};
