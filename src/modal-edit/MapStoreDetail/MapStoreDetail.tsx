import { forwardRef, useEffect } from "react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppSelector } from "hooks/useReduxHooks";

import { globalValue } from "constants/globalValue";

const MapStoreDetail = forwardRef(function Div(
  { children, ...props }: any,
  ref: any
) {
  const { height } = useDisplaySize();
  const { store } = useAppSelector((state) => state.search);
  //   const { visible, actionDelay } = useAppSelector(
  //     (state) => state.mapBottomSheet
  //   );

  useEffect(() => {}, []);

  return (
    <>
      <Wrapper ref={ref} height={height}>
        Hi
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
  //   bottom: 0;
  bottom: ${({ height }) => -height}px;

  border-radius: 16px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  color: ${({ color }) => color};
  background-color: ${colors.N0};

  transition: transform 300ms ease-out;
  background: yellowgreen;
`;
//   top: ${({ height }) => `calc(82px + ${height * 0.7}px)`};

export default MapStoreDetail;
