import { AppleLogin } from "api/auth";
import { Route } from "constants/Route";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { setCookie } from "utils/cookie";

const AppleRedirectPage = () => {
  const router = useRouter();
  const id_token = router.asPath.split("id_token=")[1];

  const handleAppleLogin = async () => {
    if (id_token) {
      const { tokens, loggedInMember } = await AppleLogin({
        identityToken: id_token,
        name: "",
      });
      setCookie("accessToken", tokens.accessToken, 1);
      setCookie("refreshToken", tokens.refreshToken, 30);
      if (loggedInMember.termsInfo) {
        router.push(Route.HOME());
      } else {
        router.push(Route.TERMS());
      }
    }
  };

  useEffect(() => {
    if (id_token) {
      handleAppleLogin();
    }
  }, [id_token]);

  return <></>;
};

export default AppleRedirectPage;
