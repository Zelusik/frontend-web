import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Box, Flex, Text, Space, Button } from "@mantine/core";
import useSearch from "hooks/useSearch";

import { colors } from "constants/colors";
import { Route } from "constants/Route";
import BottomButton from "components/Button/BottomButton";
import Gradient from "components/Common/Gradient";
import { useAppSelector } from "hooks/useReduxHooks";
import { equals } from "utils/equals";
import { typography } from "constants/typography";

interface FilterButtonProps {
  filter: any;
}

const FilterButton = ({ filter }: FilterButtonProps) => {
  const router = useRouter();
  const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);
  const {
    handleSearchType,
    handleFilterVisible,
    updateSelection,
    deleteSelection,
  } = useSearch();

  const handleClickSelection = () => {
    handleSearchType("location");
    router.push(Route.MAP());
  };

  return (
    <>
      <Gradient size={30} />
      <Box
        pos="fixed"
        bottom={0}
        bg={colors["N0"]}
        style={{
          width: "100%",
          padding: "0 17.5px",
        }}
        onClick={handleClickSelection}
      >
        <Flex gap={8}>
          <Button
            h={54}
            c={colors["N80"]}
            bg={colors["N0"]}
            radius={8}
            style={{
              ...typography["Paragraph6"],
              width: "100%",
              border: `1px solid ${colors["N40"]}`,
            }}
            disabled={false}
            onClick={() => {
              handleFilterVisible(false);
              deleteSelection();
            }}
          >
            초기화
          </Button>
          <Button
            h={54}
            radius={8}
            c={colors["N0"]}
            bg={
              foodType === filter.pickFoodType &&
              equals(dayOfWeek, filter.pickDayOfWeek) &&
              mood === filter.pickMood
                ? "rgba(245, 147, 0 , .4)"
                : colors["Orange600"]
            }
            style={{
              ...typography["Paragraph6"],
              width: "100%",
            }}
            disabled={
              foodType === filter.pickFoodType &&
              equals(dayOfWeek, filter.pickDayOfWeek) &&
              mood === filter.pickMood
            }
            onClick={() => {
              // handleFilterVisible(false);
              updateSelection(
                filter.pickFoodType,
                filter.pickDayOfWeek,
                filter.pickMood
              );
            }}
          >
            확인
          </Button>
        </Flex>
        <Space h={40} />
      </Box>
    </>
  );
};

export default FilterButton;
