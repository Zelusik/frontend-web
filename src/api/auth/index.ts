import client from "api";
import axios from "axios";

export const KakaoLogin = async (kakaoAccessToken: string) =>
  await client
    .post(
      "/v1/auth/login/kakao",
      { kakaoAccessToken },
      { headers: { "Eatery-API-Minor-Version": 1 } }
    )
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));

export const AppleLogin = async (userInfo: {
  identityToken: string;
  name: string;
}) =>
  await axios
    .post(`${process.env.BASE_URL}/v1/auth/login/apple`, userInfo, {
      headers: { "Content-Type": "application/json", "Eatery-API-Minor-Version": 1 },
    })
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
