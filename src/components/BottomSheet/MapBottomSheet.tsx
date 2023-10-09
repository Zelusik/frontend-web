import { forwardRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

import { colors } from "constants/colors";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppSelector } from "hooks/useReduxHooks";

import { globalValue } from "constants/globalValue";
import { Box, Flex, ScrollArea } from "components/core";

const MapBottomSheet = forwardRef(function Div(
  { children, sheet, content, ...props }: any,
  ref: any
) {
  const { height } = useDisplaySize();
  const { visible, actionDelay } = useAppSelector(
    (state) => state.mapBottomSheet
  );

  useEffect(() => {
    if (visible) {
      const BOTTOM_SHEET_HEIGHT =
        window.innerHeight - 82 - globalValue.BOTTOM_NAVIGATION_HEIGHT;
      const TOP = BOTTOM_SHEET_HEIGHT * 0.7;

      sheet.current!.style.setProperty("transform", `translateY(${-TOP}px)`);
      sheet.current!.style.setProperty("transition", `transform 0ms ease-out`);

      setTimeout(() => {
        sheet.current!.style.setProperty(
          "transition",
          `transform 300ms ease-out`
        );
      }, 100);
    }
  }, []);

  return (
    <>
      <motion.div
        animate={{
          opacity: visible,
        }}
      >
        <Background visible={visible} />
      </motion.div>
      <BottomSheetWrapper
        ref={sheet}
        actionDelay={actionDelay}
        visible={visible}
        height={height - (82 + globalValue.BOTTOM_NAVIGATION_HEIGHT)}
      >
        <Flex w="100%" mih={20}>
          <Box w={36} h={4} m="8px auto" radius={2} bg="N40" />
        </Flex>
        <ScrollArea
          veiwportRef={content}
          scroll="y"
          style={{
            overflow: "hidden",
            "-webkit-overflow-scrolling": "touch",
          }}
        >
          {children}
        </ScrollArea>
      </BottomSheetWrapper>
    </>
  );
});

const Background = styled.div<{
  visible: number;
}>`
  width: 100%;
  height: 100%;

  display: ${({ visible }) => (visible !== 0 ? "flex" : "none")};
  position: absolute;
  top: 0;

  opacity: 0.4;

  ${({ visible }) =>
    visible === 0 || visible === 1
      ? css``
      : css`
          opacity: ${visible * 0.4};
        `}
  background-color: ${colors.N100};
`;

const BottomSheetWrapper = styled.div<{
  height: number;
  actionDelay: number;
  visible: number;
}>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: ${({ height }) => height}px;

  display: flex;
  flex-direction: column;

  position: fixed;
  top: ${({ height }) => `calc(82px + ${height * 0.7}px)`};

  border-radius: 16px 16px 0 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  color: ${({ color }) => color};
  background-color: ${colors["N0"]};

  transition: transform 300ms ease-out;
`;

export default MapBottomSheet;
