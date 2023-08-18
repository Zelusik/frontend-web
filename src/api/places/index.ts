import client from "api";

export const getPlaces = async (kakaoId: string) =>
  await client
    .get(`/places?`, { params: { kakaoPid: kakaoId } })
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const postPlaces = async (placeInfo: any) =>
  await client
    .post(`/places?`, placeInfo)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const getPlacesId = async (placeId: number) =>
  await client
    .get(`/places/${placeId}`)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const getPlacesSearch = async (params: any) =>
  await client
    .get(`/places/search?`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const getPlacesNear = async (params: any) =>
  await client
    .get(`/places/near?`, params)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
