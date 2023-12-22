import React from "react";
import { Flex, Text } from "@/components/core";

interface StoreCountProps {
  count: number;
}

const StoreCount = ({ count }: StoreCountProps) => {
  return (
    <Flex h={17} mh={20} mt={16} mb={19} justify="space-between">
      <Text c="N50" typo="Headline1">
        {`총 ${count ? count : 0}개의 음식점`}
      </Text>
    </Flex>
  );
};

export default StoreCount;
