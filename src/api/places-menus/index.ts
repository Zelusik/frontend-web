import client from "@/api";

// 메뉴 데이터 생성
export const postMenu = async (placeId: string) =>
  await client
    .post(
      `/v1/places/${placeId}/menus`,
      {},
      {
        headers: { "Eatery-API-Minor-Version": 1 },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);

// 메뉴 데이터 조회
export const getMenus = async (placeId: string) =>
  await client
    .get(`/v1/places/${placeId}/menus`, {
      headers: { "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

// 메뉴 데이터 추가
export const patchMenu = async (placeId: string, menu: string) =>
  await client
    .patch(
      `/v1/places/${placeId}/menus`,
      { menu: menu },
      { headers: { "Eatery-API-Minor-Version": 1 } }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);
