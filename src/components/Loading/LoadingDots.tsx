import React from "react";
import styled from "@emotion/styled";
import LoadingGif from "assets/loadingDots.gif";
import Image from "next/image";

const LoadingDots = () => {
  return (
    <Wrapper>
      <Image
        src={LoadingGif}
        alt="로딩 Gif"
        width={40}
        height={40}
        unoptimized={true}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ height: any }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 70px;
  height: 70px;

  border-radius: 12px;
  background: rgba(245, 147, 0, 0.1);
`;

export default LoadingDots;
