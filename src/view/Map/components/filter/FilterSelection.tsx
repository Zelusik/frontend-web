import { useRef } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Text, Space, Button } from "@mantine/core";
import { useAppSelector } from "hooks/useReduxHooks";
import useSearch from "hooks/useSearch";

import { colors } from "constants/colors";
import { atmosphereKeyword } from "constants/globalData";

import Icon from "components/Icon";
import { typography } from "constants/typography";

const FilterSelection = () => {
  const router = useRouter();
  const filterRef = useRef<any>(null);
  const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);
  const { handleFilterVisible, handleMood } = useSearch();

  const handleClickFilter = (val: any) => {
    if (mood === val) handleMood("");
    else handleMood(val);
  };

  const num: number =
    dayOfWeek.length + (foodType !== "" ? 1 : 0) + (mood !== "" ? 1 : 0);

  return (
    <Box pos="relative">
      <Flex
        ref={filterRef}
        h={36}
        pl={13}
        pr={13}
        pos="absolute"
        left={15}
        bg={colors["N0"]}
        style={{
          alignItems: "center",
          borderRadius: 48,
          border: `1.152px solid ${colors["Orange600"]}`,
        }}
        onClick={() => handleFilterVisible(true)}
      >
        <Icon icon="Filter" width={16} height={16} color="Orange600" />
        <Text ml={6} c={colors["Orange600"]} style={typography["Headline2"]}>
          {num}
        </Text>
      </Flex>
      <Flex>
        <Box miw={num > 9 ? 88 : 80} />
        <Flex pr={15} wrap="nowrap" gap={6} style={{ overflowX: "auto" }}>
          {atmosphereKeyword.map((data: any, idx: number) => {
            return (
              <Flex key={idx}>
                <Button
                  h={38}
                  radius={12}
                  c={colors[data.val === mood ? "N0" : "N100"]}
                  bg={colors[data.val === mood ? "Orange600" : "N0"]}
                  style={{
                    padding: "0 16px",
                    border: `1px solid ${
                      colors[data.val === mood ? "Orange600" : "N40"]
                    }`,
                  }}
                  onClick={() => handleClickFilter(data.val)}
                >
                  {data.val}
                </Button>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Space h={14} />
    </Box>
  );
};

export default FilterSelection;
