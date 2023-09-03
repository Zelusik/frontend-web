/* eslint-disable react-hooks/exhaustive-deps */
import { KakaoLogin } from "api/auth";
import axios from "axios";
import { Route } from "constants/Route";
import { useAppDispatch } from "hooks/useReduxHooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { changeAuthState } from "reducer/slices/auth/authSlice";
import { setCookie } from "utils/cookie";

const KakaoRedirectPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const code = router.query.code;
  const redirectUrl = process.env.KAKAO_REDIRECT_URI;

  const handleKakaoLogin = async () => {
    await axios
      .post(
        "https://kauth.kakao.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_REST_API_KEY,
          redirect_uri: redirectUrl,
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(async ({ data }) => {
        const { tokens, loggedInMember } = await KakaoLogin(data.access_token);
        dispatch(
          changeAuthState({
            type: "accessToken",
            value: tokens.accessToken,
          })
        );
        dispatch(
          changeAuthState({
            type: "refreshToken",
            value: tokens.refreshToken,
          })
        );
        setCookie("accessToken", tokens.accessToken, 1);
        setCookie("refreshToken", tokens.refreshToken, 30);
        if (loggedInMember.termsInfo) {
          router.push(Route.HOME());
        } else {
          router.push(Route.TERMS());
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (code) {
      handleKakaoLogin();
    }
  }, [code]);
  return <></>;
};

export default KakaoRedirectPage;
