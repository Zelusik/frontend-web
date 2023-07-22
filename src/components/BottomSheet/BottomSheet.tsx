import { forwardRef, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import useBottomSheet from "hooks/useBottomSheet";
import { globalValue } from "constants/globalValue";
import { keyframes } from "@emotion/react";
import { match } from "ts-pattern";

const BottomSheet = forwardRef(function Div(
  { children, type = "setting", state, ...props }: any,
  forwardedRef
) {
  // const { MIN_Y, MAX_Y, BOTTOM_SHEET_HEIGHT } = BottomSheetOption();

  const [MIN_Y, setMIN] = useState<number>(
    globalValue.BOTTOM_NAVIGATION_HEIGHT + 844 * 0.24 + 82
  );
  const [MAX_Y, setMAX] = useState<number>(844);
  const [BOTTOM_SHEET_HEIGHT, setBottomSheetHeight] = useState<number>(
    844 - (globalValue.BOTTOM_NAVIGATION_HEIGHT + 82)
  );

  const { sheet, content } = useBottomSheet({ state, MIN_Y, MAX_Y });

  return (
    <>
      <Background
        visible={state.action}
        shadow={match(type)
          .with("setting", () => 0.7)
          .with("map", () => 0.4)
          .exhaustive()}
      />
      <Wrapper ref={sheet} BOTTOM_SHEET_HEIGHT={BOTTOM_SHEET_HEIGHT}>
        <HandleWrapper>
          <Handle />
        </HandleWrapper>
        <BottomSheetContent ref={content}>{children}</BottomSheetContent>
      </Wrapper>
    </>
  );
});

const fade = (visible: boolean, shadow: number) => keyframes`
  from {
    opacity: ${visible ? 0 : shadow};
  }
  to {
    opacity: ${visible ? shadow : 0};
  }
`;

const Background = styled.div<{ visible: boolean; shadow: number }>`
  width: 100%;
  max-width: 820px;
  height: 100%;

  position: absolute;
  top: 0;

  opacity: 0;
  background-color: ${colors.Shadow};
  animation: ${(props) => fade(props.visible, props.shadow)} 0.3s forwards;
`;

const Wrapper = styled.div<{ BOTTOM_SHEET_HEIGHT: number }>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: ${({ BOTTOM_SHEET_HEIGHT }) => BOTTOM_SHEET_HEIGHT}px;

  display: flex;
  flex-direction: column;

  position: fixed;
  top: calc(100% - ${globalValue.BOTTOM_NAVIGATION_HEIGHT}px - 24%);

  border-radius: 16px 16px 0 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  background-color: ${colors.N0};

  transition: transform 0.3s ease-out;
`;

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

export default BottomSheet;
