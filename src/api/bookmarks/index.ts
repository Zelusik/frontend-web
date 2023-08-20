import client from "api";

// 장소 북마크
export const postBookmarks = async (placeId: number) =>
  await client
    .post("/bookmarks", {}, { params: { placeId } })
    .then(({ data }) => data)
    .catch((err) => err.response);

// 장소 북마크 취소
export const deleteBookmarks = async (placeId: number) =>
  await client
    .delete("/bookmarks", { params: { placeId } })
    .then(({ data }) => data)
    .catch((err) => err.response);
