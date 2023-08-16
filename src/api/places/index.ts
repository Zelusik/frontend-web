import client from "api";

// 북마크에 저장한 장소 조회
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

// 저장한 장소들에 대한 필터링 키워드 조회
export const getMarkKeywords = async () =>
  await client
    .get("/places/bookmarks/filtering-keywords")
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getPlacesId = async (placeId: number) =>
  await client
    .get(`/places/${placeId}`, {}, {})
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const getPlacesSearch = async (params: string) =>
  await client
    .get(`/places/search?`, params, {})
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
