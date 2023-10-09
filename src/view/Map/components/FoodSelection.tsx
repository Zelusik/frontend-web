import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useAppSelector } from "hooks/useReduxHooks";
import useSearch from "hooks/useSearch";
import { TasteDataProps } from "models/globalDataModel";

import { Button, Flex, ScrollArea, Text } from "components/core";

import { tasteDatas } from "constants/globalData";
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
  const { visible } = useAppSelector((state) => state.mapBottomSheet);
  const { foodType } = useAppSelector((state) => state.search);
  const { handleFoodType, handleNewFoodType } = useSearch();

  const boxStyle = {
    boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.06)",
  };

  const clickFilterButton = (val: string) => {
    if (foodType === val) {
      handleNewFoodType("");
      handleFoodType("");
    } else handleFoodType(val);
  };

  return (
    <motion.div
      animate={{
        opacity: 1 - visible,
      }}
    >
      <ScrollArea
        scroll="x"
        h={42}
        ph={15}
        dis="flex"
        // dis={visible === 1 ? "none" : "flex"}
        gap={6}
      >
        <Button
          miw="fit-content"
          ph={16}
          leftGap={8}
          c="N100"
          bg="N0"
          typo="Heading2"
          radius={40}
          renderLeft={<Icon icon="Location" style={{ marginRight: -2 }} />}
          style={boxStyle}
          onClick={clickMyLocation}
        >
          내 주변
        </Button>
        <Button
          miw="fit-content"
          ph={16}
          leftGap={8}
          c={mark.isMarkShow ? "N0" : "N100"}
          bg={mark.isMarkShow ? "Orange600" : "N0"}
          typo="Heading2"
          radius={40}
          renderLeft={<Icon icon="Bookmark" style={{ marginRight: -2 }} />}
          style={boxStyle}
          onClick={() => mark.clickMarkShow()}
        >
          저장
        </Button>

        {tasteDatas.map((tasteData: TasteDataProps, idx: number) => {
          return (
            <Button
              key={idx}
              miw="fit-content"
              ph={16}
              c={tasteData.val === foodType ? "N0" : "N100"}
              bg={tasteData.val === foodType ? "Orange600" : "N0"}
              typo="Heading2"
              radius={40}
              style={boxStyle}
              onClick={() => clickFilterButton(tasteData.val)}
            >
              {tasteData.val}
            </Button>
          );
        })}
      </ScrollArea>
    </motion.div>
  );
}
