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
