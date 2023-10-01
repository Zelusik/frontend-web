import client from "api";
import { PlaceType } from "types/review";

export const placesApi = {
  getFilteringKeywords: async () =>
    await client
      .get("/v1/places/bookmarks/filtering-keywords", {
        headers: { "Eatery-API-Minor-Version": 1 },
      })
      .then(({ data }) => data)
      .catch((err) => err.response),

  getBookmarks: async (placeInfo: {
    type: string;
    keyword: string;
    page: number;
    size: number;
  }) =>
    await client
      .get("/v1/places/bookmarks", {
        headers: { "Eatery-API-Minor-Version": 1 },
        params: placeInfo,
      })
      .then(({ data }) => data)
      .catch((err) => err.response),
};

export const getPlaces = async (kakaoId: string) =>
  await client
    .get(`/v1/places?`, {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: { kakaoPid: kakaoId },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const postPlaces = async (placeInfo: PlaceType) =>
  await client
    .post(`/v1/places?`, placeInfo, {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

// 북마크에 저장한 장소 조회
export const getMarkPlaces = async (placeInfo: {
  type: string;
  keyword: string;
  page: number;
  size: number;
}) =>
  await client
    .get("/v1/places/bookmarks", {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: placeInfo,
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

// 저장한 장소들에 대한 필터링 키워드 조회
export const getMarkKeywords = async () =>
  await client
    .get("/v1/places/bookmarks/filtering-keywords", {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getPlacesId = async (placeId: number) =>
  await client
    .get(`/v1/places/${placeId}`, {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getPlacesSearch = async (params: any) => {
  params.headers = { "Eatery-API-Minor-Version": 1 };
  return await client
    .get(`/v1/places/search?`, params)
    .then(({ data }) => data)
    .catch((err) => err.response);
};

export const getPlacesNear = async (params: any) => {
  params.headers = { "Eatery-API-Minor-Version": 1 };
  return await client
    .get(`/v1/places/near?`, params)
    .then(({ data }) => data)
    .catch((err) => err.response);
};

// kakaoPid로 장소 존재 여부 조회
export const existencePlace = async (kakaoPid: string) =>
  await client
    .get(`/v1/places/existence`, {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: { kakaoPid },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
