import client from "api";

// 장소 북마크
export const postBookmarks = async (placeId: number) => {
  await client
    .post(
      "/v1/bookmarks",
      {},
      { headers: { "Eatery-API-Minor-Version": 1 }, params: { placeId } }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);
};
// 장소 북마크 취소
export const deleteBookmarks = async (placeId: number) =>
  await client
    .delete("/v1/bookmarks", {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: { placeId },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
