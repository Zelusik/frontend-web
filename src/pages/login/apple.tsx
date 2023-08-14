import { AppleLogin } from "api/auth";
import { Route } from "constants/Route";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { setCookie } from "utils/cookie";

const AppleRedirectPage = ({ tokens, loggedInMember }: any) => {
  const router = useRouter();

  useEffect(() => {
    setCookie("accessToken", tokens.accessToken, 1);
    setCookie("refreshToken", tokens.refreshToken, 30);
    if (loggedInMember.termsInfo) {
      router.push(Route.HOME());
    } else {
      router.push(Route.TERMS());
    }
  }, []);
  return <></>;
};

export default AppleRedirectPage;

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const { user, id_token } = req.body;

  const { tokens, loggedInMember } = await AppleLogin({
    identityToken: id_token,
    name: user.name,
  });

  return {
    props: {
      tokens,
      loggedInMember,
    },
  };
}
