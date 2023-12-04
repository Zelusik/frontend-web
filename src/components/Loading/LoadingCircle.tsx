import React from "react";
import Image from "next/image";
import LoadingGif from "assets/loadingCircle.gif";
import { Flex } from "components/core";

interface LoadingCircleProps {
  height?: string | number;
}

const LoadingCircle = ({ height = "auto" }: LoadingCircleProps) => {
  return (
    <Flex h={height} justify="center" align="center">
      <Image src={LoadingGif} alt="로딩중 이미지" width={28} height={28} />
    </Flex>
  );
};

export default LoadingCircle;
