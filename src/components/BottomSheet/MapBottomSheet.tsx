import { forwardRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import useMapBottomSheet from "hooks/useMapBottomSheet";
import { globalValue } from "constants/globalValue";
import { css, keyframes } from "@emotion/react";
import { match } from "ts-pattern";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import {
  changeAction,
  changeVisible,
  changeVisibleType,
} from "reducer/slices/bottomSheet/mapBottomSheetSlice";
import { changeFilterAction } from "reducer/slices/search/searchSlice";

const MapBottomSheet = forwardRef(function Div(
  { children, ...props }: any,
  ref
) {
  const dispatch = useAppDispatch();
  const { visible, actionDelay } = useAppSelector(
    (state) => state.mapBottomSheet
  );

  const handleClickFilter = () => {
    dispatch(
      changeFilterAction({
        type: "search",
        value: false,
      })
    );
  };

  const handleMove = (move: number) => {
    dispatch(
      changeVisible({
        type: "mapBottomSheet",
        value: move,
      })
    );
  };

  const handleClickShow = () => {
    dispatch(
      changeVisibleType({
        type: "mapBottomSheet",
        value: [1, "primary"],
      })
    );
  };

  const handleClickBackground = () => {
    dispatch(
      changeAction({
        type: "mapBottomSheet",
        value: false,
      })
    );
    setTimeout(() => {
      dispatch(
        changeVisible({
          type: "mapBottomSheet",
          value: 0,
        })
      );
    }, 300);
  };

  const { height } = useDisplaySize();
  const { sheet, content } = useMapBottomSheet({
    visible,
    handleClickShow,
    handleClickBackground,
    handleMove,
    handleClickFilter,
  });

  return (
    <>
      <Background visible={visible} />
      <BottomSheetWrapper
        ref={sheet}
        actionDelay={actionDelay}
        visible={visible}
        height={height - (82 + globalValue.BOTTOM_NAVIGATION_HEIGHT)}
      >
        <HandleWrapper>
          <Handle />
        </HandleWrapper>
        <BottomSheetContent ref={content}>{children}</BottomSheetContent>
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
  background-color: #000;
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
  background-color: ${colors.N0};

  transition: transform 300ms ease-out;
`;

// bottom: ${({ height }) =>
// `calc(${-height + globalValue.BOTTOM_NAVIGATION_HEIGHT + height * 0.3}px)`};

const HandleWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const Handle = styled.div`
  width: 36px;
  height: 4px;
  margin: 8px auto;

  border-radius: 2px;
  background-color: ${colors.N40};
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

export default MapBottomSheet;
