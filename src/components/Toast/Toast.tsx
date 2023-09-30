import React, { useEffect } from "react";
import { keyframes } from "@emotion/react";
import { colors } from "constants/colors";
import styled from "@emotion/styled";
import Icon from "components/Icon/Icon";
import { typography } from "constants/typo";

const fadeInDown = keyframes`
   0% {
        transform: translate3d(0,-3px,0) translateX(-50%);
        opacity: 0.5;
    }

    30% {
        transform: translate3d(0,10px,0) translateX(-50%);
        opacity: 1
    }

    78% {
      transform: translate3d(0,10px,0) translateX(-50%);
      opacity: 1
  }

    100%{
      transform: translate3d(0,-3px,0) translateX(-50%);
      opacity: 0;
    }
`;

const Toast = ({ message, close }: { message: string; close: () => void }) => {
  useEffect(() => {
    setTimeout(() => {
      close();
    }, 3000);
  }, []);

  return (
    <ToastWrapper>
      <Icon icon="Warn" />
      {message}
    </ToastWrapper>
  );
};

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 90px;
  left: 50%;

  display: flex;
  flex-direction: row;
  gap: 8px;

  width: fit-content;

  border-radius: 100px;
  background-color: rgba(32, 35, 48, 0.8);
  padding: 13px 25px;
  color: ${colors.N0} !important;

  align-items: center;
  white-space: nowrap;

  animation: ${fadeInDown} 2s forwards;
  z-index: 1000;

  ${typography.Paragraph5}
`;

export default Toast;
