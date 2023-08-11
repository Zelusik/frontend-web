import client from "api";

export const getMarkKeywords = async () =>
  await client
    .get("/places/bookmarks/filtering-keywords")
    .then(({ data }) => data)
    .catch((err) => err.response);
