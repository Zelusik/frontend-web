import React from "react";
import { Flex, Text } from "@mantine/core";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

interface StoreCountProps {
  count: number;
}

const StoreCount = ({ count }: StoreCountProps) => {
  return (
    <Flex h={17} m={20} mt={16} mb={19} justify="space-between">
      <Text c={colors["N50"]} style={typography["Headline1"]}>
        {`총 ${count}개의 음식점`}
      </Text>
      {/* <StoreFilter /> */}
    </Flex>
  );
};

export default StoreCount;
