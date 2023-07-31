import client from "api";

// 메뉴 데이터 생성
export const postMenu = async (placeId: string) =>
  await client
    .post(`/places/${placeId}/menus`)
    .then(({ data }) => data)
    .catch((err) => err.response);

// 메뉴 데이터 조회
export const getMenus = async (placeId: string) =>
  await client
    .get(`/places/${placeId}/menus`)
    .then(({ data }) => data)
    .catch((err) => err.response);

// 메뉴 데이터 추가
export const patchMenu = async (placeId: string, menu: string) =>
  await client
    .patch(`/places/${placeId}/menus`, { menu: menu })
    .then(({ data }) => data)
    .catch((err) => err.response);
