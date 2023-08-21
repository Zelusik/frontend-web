import axios from "axios";

export const KAKAO_URL = "//dapi.kakao.com/v2";
export const NEXT_PUBLIC_KAKAO_APP_JS_KEY = "91ce271bfa0a93ac384a49249667fb36";
export const KAKAO_APP_REST_KEY = "142ac34ab1b6ad4e75caaeb81758b4b4";

export const getCoordToAddress = async (params: any) =>
  await axios
    .get(`${KAKAO_URL}/local/geo/coord2address.json?`, {
      headers: { Authorization: `KakaoAK ${KAKAO_APP_REST_KEY}` },
      params: params,
    })
    .then(({ data }) => {
      return data.documents;
    })
    .catch((err) => console.log(err.response));

export const getKeyword = async (params: any) =>
  await axios
    .get(`${KAKAO_URL}/local/search/keyword.json?`, {
      headers: { Authorization: `KakaoAK ${KAKAO_APP_REST_KEY}` },
      params: params,
    })
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const kakaoSearchKeyword = async ({ x, y, keyword, page }: any) => {
  return await axios
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_SEARCH_API_KEY}`,
      },
      params: {
        page: page,
        query: keyword || "음식점",
        category_group_code: "FD6,CE7",
        size: 15,
        sort: "distance",
        x: x !== null && x !== undefined ? x : undefined,
        y: y !== null && y !== undefined ? y : undefined,
        radius: 1000,
      },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
};
