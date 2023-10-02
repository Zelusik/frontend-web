import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { Box, Flex, Text, Button, Space } from "@mantine/core";

import RoundButton from "components/Button/RoundButton";
import { useAppSelector } from "hooks/useReduxHooks";
import { tasteDatas } from "constants/globalData";
import useSearch from "hooks/useSearch";
import { colors } from "constants/colors";
import { TasteDataProps } from "models/globalDataModel";
import { typography } from "constants/typography";
import Icon from "components/Icon";

interface FoodSelectionProps {
  mark: any;
  clickMyLocation: () => void;
}

export default function FoodSelection({
  mark,
  clickMyLocation,
}: FoodSelectionProps) {
  const router = useRouter();
  const { visible, actionDelay } = useAppSelector(
    (state) => state.mapBottomSheet
  );
  const { foodType } = useAppSelector((state) => state.search);
  const { handleFoodType, handleNewFoodType } = useSearch();

  const boxStyle = {
    padding: "0 16px",
    boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.06)",
  };

  const clickFilterButton = (val: string) => {
    if (foodType === val) {
      handleNewFoodType("");
      handleFoodType("");
    } else handleFoodType(val);
  };

  return (
    <Flex
      h={42}
      opacity={1 - visible}
      wrap="nowrap"
      gap={6}
      style={{
        padding: "0 15px",
        display: visible === 1 ? "none" : "flex",
        overflowX: "auto",
      }}
    >
      <Button
        radius={40}
        c={colors["N100"]}
        bg={colors["N0"]}
        leftSection={<Icon icon="Location" style={{ marginRight: -2 }} />}
        style={{
          ...typography["Heading2"],
          ...boxStyle,
        }}
        onClick={clickMyLocation}
      >
        내 주변
      </Button>
      <Button
        radius={40}
        c={colors[mark.isMarkShow ? "N0" : "N100"]}
        bg={colors[mark.isMarkShow ? "Orange600" : "N0"]}
        leftSection={<Icon icon="Bookmark" style={{ marginRight: -2 }} />}
        style={{
          ...typography["Heading2"],
          ...boxStyle,
        }}
        onClick={() => mark.clickMarkShow()}
      >
        저장
      </Button>

      {tasteDatas.map((tasteData: TasteDataProps, idx: number) => {
        return (
          <Button
            key={idx}
            radius={40}
            c={colors[tasteData.val === foodType ? "N0" : "N100"]}
            bg={colors[tasteData.val === foodType ? "Orange600" : "N0"]}
            leftSection={
              typeof tasteData.icon === "string" && (
                <Icon icon={tasteData?.icon} style={{ marginRight: -2 }} />
              )
            }
            style={{
              ...typography["Heading2"],
              ...boxStyle,
            }}
            onClick={() => clickFilterButton(tasteData.val)}
          >
            {tasteData.val}
          </Button>
        );
      })}
    </Flex>
  );
}

const fade = (actionDelay: number) => keyframes`
  from {
    opacity: ${actionDelay ? 1 : 0};
  }
  to {
    opacity: ${actionDelay ? 0 : 1};
  }
`;

const ScrollInner = styled.div`
  height: 42px;
  display: flex;
  overflow: auto;
`;

const ButtonWrapper = styled.div<{ left: boolean; right: boolean }>`
  height: 40px;
  margin: auto;
  margin-left: ${({ left }) => (left ? "15px" : "0")};
  margin-right: ${({ right }) => (right ? "15px" : "6px")};

  display: inline-block;
  border-radius: 40px;
`;
