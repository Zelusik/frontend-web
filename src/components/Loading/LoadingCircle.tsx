import React from "react";
import Image from "next/image";
import { Center } from "@mantine/core";
import LoadingGif from "assets/loadingCircle.gif";

interface LoadingCircleProps {
  height?: string | number;
}

const LoadingCircle = ({ height = "auto" }: LoadingCircleProps) => {
  return (
    <Center h={height}>
      <Image src={LoadingGif} alt="로딩중 이미지" width={28} height={28} />
    </Center>
  );
};

export default LoadingCircle;
