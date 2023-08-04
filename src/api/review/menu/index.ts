import client from "api";
import { GetKeyWrodsProps } from "hooks/queries/review/useGetMenuKeywords";

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

// 메뉴 키워드 조회
export const getMenuKeywords = async (keywordData: GetKeyWrodsProps) =>
  await client
    .get("/menu-keywords", {
      params: {
        placeCategory: keywordData.placeCategory,
        menus: keywordData.menus.join(","),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
