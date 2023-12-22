import styled from "@emotion/styled";
import Icon from "@/components/Icon";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LoginTemplate = () => {
  const redirectUrl = process.env.KAKAO_REDIRECT_URI;
  const kakaoUrl = `${process.env.KAKAO_AUTH_URL}/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`;
  const appleUrl = `https://appleid.apple.com/auth/authorize?response_type=code%20id_token&response_mode=fragment&client_id=${process.env.APPLE_CLIENT_ID}&redirect_uri=${process.env.APPLE_REDIRECT_URL}&state=signin`;

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
          <Link href={appleUrl}>
            <Icon icon="AuthApple" />
          </Link>
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
`;
export default LoginTemplate;
