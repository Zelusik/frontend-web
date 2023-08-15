import client from "api";
import axios from "axios";
import { TermsType } from "types/auth";

export const KakaoLogin = async (kakaoAccessToken: string) =>
  await client
    .post("/auth/login/kakao", { kakaoAccessToken })
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const AppleLogin = async (userInfo: {
  identityToken: string;
  name: string;
}) =>
  await axios
    .post(`${process.env.BASE_URL}/auth/login/apple`, userInfo, {
      headers: { "Content-Type": "application/json" },
    })
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const PostTerms = async (token: any, termsData: TermsType) =>
  await client
    .post("/members/terms", termsData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);

export const PutTaste = async (token: any, favoriteFoodCategories: string[]) =>
  await client
    .put(
      "/members/favorite-food",
      { favoriteFoodCategories },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err.response);
