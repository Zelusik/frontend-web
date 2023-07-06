import styled from "@emotion/styled";
import AuthApple from "components/Icon/icons/AuthApple";
import AuthDescription from "components/Icon/icons/AuthDescription";
import AuthKakao from "components/Icon/icons/AuthKakao";
import AuthLogo from "components/Icon/icons/AuthLogo";
import { colors } from "constants/colors";
import React, { useEffect, useState } from "react";

const LoginTemplate = () => {
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      setUserAgent(navigator.userAgent.toLowerCase());
    }
  }, []);

  return (
    <LoginTemplateWrapper>
      <LogoWrapper>
        <AuthLogo />
        <AuthDescription />
      </LogoWrapper>
      <ButtonWrapper>
        <AuthKakao />
        {userAgent.indexOf("android") === -1 && <AuthApple />}
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
  gap: 16px;

  cursor: pointer;
`;
export default LoginTemplate;
