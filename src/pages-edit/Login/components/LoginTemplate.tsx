import styled from "@emotion/styled";
import Icon from "components/Icon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AppleLogin from "react-apple-login";

const LoginTemplate = () => {
  const redirectUrl = process.env.KAKAO_REDIRECT_URI;
  const kakaoUrl = `${process.env.KAKAO_AUTH_URL}/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`;

  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      setUserAgent(navigator.userAgent.toLowerCase());
    }
  }, []);

  return (
    <LoginTemplateWrapper>
      <LogoWrapper>
        <Icon icon="AuthLogo" />
        <Icon icon="AuthDescription" />
      </LogoWrapper>
      <ButtonWrapper>
        <Link href={kakaoUrl}>
          <Icon icon="AuthKakao" />
        </Link>
        {userAgent.indexOf("android") === -1 && (
          <AppleLogin
            clientId={process.env.APPLE_CLIENT_ID}
            redirectURI={process.env.APPLE_REDIRECT_URL}
            responseType={"code id_token"}
            responseMode={"form_post"}
            usePopup={false}
            scope={"name email"}
            state={"signin"}
          />
        )}
      </ButtonWrapper>
    </LoginTemplateWrapper>
  );
};

const LoginTemplateWrapper = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffab2c;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 30%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 80px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  cursor: pointer;

  #appleid-signin {
    margin-top: 16px;
    position: relative;
    svg {
      display: none;
    }
  }
  #appleid-signin::before {
    content: url("/assets/authApple.svg");
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default LoginTemplate;
