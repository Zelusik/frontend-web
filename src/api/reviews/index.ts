import client from "api";

export const getFeed = async (page: number) =>
  await client
    .get("/reviews/feed", { params: { page } })
    .then(({ data }) => data)
    .catch((err) => err.response);
