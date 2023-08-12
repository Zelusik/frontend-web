import client from "api";

export const getMarkKeywords = async () =>
  await client
    .get("/places/bookmarks/filtering-keywords")
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMarkPlaces = async (placeInfo: {
  type: string;
  keyword: string;
  page: number;
  size: number;
}) =>
  await client
    .get("/places/bookmarks", { params: placeInfo })
    .then(({ data }) => data)
    .catch((err) => err.response);
