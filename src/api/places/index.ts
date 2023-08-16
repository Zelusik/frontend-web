import client from "api";

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
