import React from "react";
import Image from "next/image";
import { Flex } from "@/components/core";

interface LoadingCircleProps {
  height?: string | number;
}

export const LoadingCircle = ({ height = "auto" }: LoadingCircleProps) => {
  return (
    <Flex h={height} justify="center" align="center">
      <Image
        src="/assets/loadingCircle.git"
        alt="로딩중 이미지"
        width={28}
        height={28}
      />
    </Flex>
  );
};
