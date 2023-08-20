import client from "api";
import axios from "axios";

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
