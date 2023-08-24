import React from "react";
import styled from "@emotion/styled";
import LoadingGif from "assets/loadingCircle.gif";
import Image from "next/image";

const LoadingCircle = ({ size }: any) => {
  return (
    <Wrapper height={size}>
      <Image
        src={LoadingGif}
        alt="로딩 Gif"
        width={28}
        height={28}
        unoptimized={true}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : `100vh`)};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingCircle;
