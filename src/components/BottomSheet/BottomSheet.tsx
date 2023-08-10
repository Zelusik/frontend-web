"use client";
import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

import useBottomSheet from "hooks/useBottomSheet";
import { useAppSelector } from "hooks/useReduxHooks";
import useDisplaySize from "hooks/useDisplaySize";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";

import SelectMenu from "./children/SelectMenu";
import RegisterMenu from "./children/RegisterMenu";
import ReportStore from "./children/ReportStore";
import DeleteEdit from "./children/DeleteEdit";
import ShareReport from "./children/ShareReport";

interface Props {
  children?: any;
}

const BottomSheet = forwardRef(function Div(
  { children, ...props }: Props,
  ref
) {
  const { height } = useDisplaySize();
  const COMPONENT_HEIGHT: any = {
    "share-report": 146,
    "delete-edit": 146,
    "report-store": 100,
    selectMenu: height * 0.8,
    registerMenu: 80,
  };
  const COMPONENT: any = {
    "share-report": <ShareReport />,
    "delete-edit": <DeleteEdit />,
    "report-store": <ReportStore />,
    selectMenu: <SelectMenu />,
    registerMenu: <RegisterMenu />,
  };

  const { closeBottomSheet } = useBottomSheet({});
  const { type, visible, actionDelay } = useAppSelector(
    (state) => state.bottomSheet
  );
  const BOTTOMSHEET_HEIGHT = COMPONENT_HEIGHT[type];

  const handleClickBackground = () => {
    closeBottomSheet(sheet);
  };

  const { sheet, content } = useBottomSheet({
    use: "use",
    visible,
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
  max-width: ${globalValue.MAX_WIDTH}px;
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
