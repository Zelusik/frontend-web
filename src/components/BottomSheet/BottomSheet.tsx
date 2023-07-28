"use client";
import { forwardRef } from "react";
import { colors } from "constants/colors";
import useBottomSheet from "hooks/useBottomSheet";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import {
  changeAction,
  changeVisible,
} from "reducer/slices/bottomSheet/bottomSheetSlice";
import { css, keyframes, styled } from "styled-components";
import Report from "./children/Report";

interface Props {
  children?: any;
}

const COMPONENT_HEIGHT = { report: 146 };
const COMPONENT = { report: <Report /> };

const BottomSheet = forwardRef(function Div(
  { children, ...props }: Props,
  ref
) {
  const dispatch = useAppDispatch();
  const { type, visible, actionDelay } = useAppSelector(
    (state) => state.bottomSheet
  );
  const BOTTOMSHEET_HEIGHT = COMPONENT_HEIGHT[type];

  const handleMove = (move: number) => {
    if (move)
      dispatch(
        changeVisible({
          type: "bottomSheet",
          value: move,
        })
      );
    else
      dispatch(
        changeVisible({
          type: "bottomSheet",
          value: move,
        })
      );
  };

  const handleClickBackground = () => {
    dispatch(
      changeAction({
        type: "bottomSheet",
        value: false,
      })
    );
    sheet.current!.style.setProperty("transform", `translateY(-${0}px)`);
    setTimeout(() => {
      dispatch(
        changeVisible({
          type: "bottomSheet",
          value: 0,
        })
      );
    }, 300);
  };

  const { sheet, content } = useBottomSheet({
    visible,
    handleClickBackground,
    handleMove,
    BOTTOMSHEET_HEIGHT,
  });

  return (
    <>
      <Background
        actionDelay={actionDelay}
        visible={visible}
        onClick={handleClickBackground}
      />
      <BottomSheetWrapper
        ref={sheet}
        actionDelay={actionDelay}
        visible={visible}
        height={BOTTOMSHEET_HEIGHT}
      >
        <HandleWrapper>
          <Handle />
        </HandleWrapper>
        <ContentWrapper ref={content}>{COMPONENT[type]}</ContentWrapper>
      </BottomSheetWrapper>
    </>
  );
});

const fade = (actionDelay: number) => keyframes`
  from {
    opacity: ${actionDelay ? 0 : 0.7};
  }
  to {
    opacity: ${actionDelay ? 0.7 : 0};
  }
`;

const slide = (actionDelay: number, height: number) => keyframes`
  from {
    transform: translateY(${actionDelay ? 0 : -height + "px"});
  }
  to {
    transform: translateY(${actionDelay ? -height + "px" : 0});
  }
`;

const Background = styled.div<{
  actionDelay: number;
  visible: number;
}>`
  width: 100%;
  height: 100%;

  display: flex;
  position: absolute;
  top: 0;

  ${({ actionDelay, visible }) =>
    visible === 0 || visible === 1
      ? css`
          animation: ${fade(actionDelay)} 300ms forwards;
        `
      : css`
          opacity: ${visible * 0.7};
        `}
  background-color: #000;
  z-index: 998;
`;

const HandleWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;

  background-color: transparent;
`;

const Handle = styled.div`
  width: 36px;
  height: 4px;
  margin: auto;
  display: flex;

  background-color: ${colors.N40};
`;

const BottomSheetWrapper = styled.div<{
  height: number;
  actionDelay: number;
  visible: number;
}>`
  width: 100%;
  height: ${({ height }) => height + "px"};

  display: flex;
  flex-direction: column;

  position: fixed;
  bottom: ${({ height }) => -height + "px"}; // -height

  border-radius: 16px 16px 0 0;
  color: ${({ color }) => color};
  background-color: ${colors.N0};
  z-index: 999;

  transition: transform 300ms ease-out;

  ${({ height, actionDelay, visible }) =>
    visible === 1
      ? css`
          animation: ${slide(actionDelay, height)} 300ms forwards;
        `
      : css``}
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

export default BottomSheet;
