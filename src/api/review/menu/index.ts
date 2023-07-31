import client from "api";

export const postMenu = async (placeId: string) =>
  await client
    .post(`/places/${placeId}/menus`)
    .then(({ data }) => data)
    .catch((err) => err.response);

export const getMenus = async (placeId: string) =>
  await client
    .get(`/places/${placeId}/menus`)
    .then(({ data }) => data)
    .catch((err) => err.response);
