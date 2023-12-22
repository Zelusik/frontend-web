import client from "@/api";
import { GetKeyWrodsProps } from "@/hooks/queries/review/useGetMenuKeywords";

// 메뉴 키워드 조회
export const getMenuKeywords = async (keywordData: GetKeyWrodsProps) =>
  await client
    .get("/v1/menu-keywords", {
      headers: { "Eatery-API-Minor-Version": 1 },
      params: {
        placeCategory: keywordData.placeCategory,
        menus: keywordData.menus.join(","),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
