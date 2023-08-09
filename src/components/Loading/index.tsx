import React from "react";
import styled from "@emotion/styled";
import loading from "assets/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <LoadingWrapper>
      <Image
        src={loading}
        alt="로딩 Gif"
        width={40}
        height={40}
        unoptimized={true}
      />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 70px;
  height: 70px;

  border-radius: 12px;
  background: rgba(245, 147, 0, 0.1);
`;
export default Loading;
