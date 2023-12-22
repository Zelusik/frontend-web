import { forwardRef, useEffect } from "react";
import styled from "@emotion/styled";
import { colors } from "@/constants/colors";
import { useAppSelector } from "@/hooks/useReduxHooks";

import { globalValue } from "@/constants/globalValue";
import { Box, Flex } from "@/components/core";

export const MapStoreDetail = forwardRef(function Div(
  { children, ...props }: any,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);
  const { store } = useAppSelector((state) => state.search);
  //   const { visible, actionDelay } = useAppSelector(
  //     (state) => state.mapBottomSheet
  //   );

  useEffect(() => {}, []);

  return (
    <>
      <Wrapper ref={ref} height={display.height}>
        <Flex w="100%" mih={20}>
          <Box w={36} h={4} m="8px auto" radius={2} bg="N40" />
        </Flex>
        {children}
      </Wrapper>
    </>
  );
});

const Wrapper = styled.div<{
  height: number;
}>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: ${({ height }) => height}px;

  display: flex;
  flex-direction: column;

  position: fixed;
  bottom: ${({ height }) => -height}px;

  border-radius: 16px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  color: ${({ color }) => color};
  background-color: ${colors.N0};

  transition: transform 300ms ease-out;
  background: ${colors["N0"]};
`;
//   top: ${({ height }) => `calc(82px + ${height * 0.7}px)`};
