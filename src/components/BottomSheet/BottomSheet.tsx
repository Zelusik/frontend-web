import { forwardRef } from "react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { BOTTOM_SHEET_HEIGHT } from "./BottomSheetOption";
import useBottomSheet from "hooks/useBottomSheet";
import { globalValue } from "constants/globalValue";
import { keyframes } from "@emotion/react";

const BottomSheet = forwardRef(function Div(
  { children, ...props }: any,
  forwardedRef
) {
  const MIN_Y = globalValue.BOTTOM_NAVIGATION_HEIGHT + 844 * 0.24 + 82; //132
  const MAX_Y = 844 - 0;
  const BOTTOM_SHEET_HEIGHT = 844 - (globalValue.BOTTOM_NAVIGATION_HEIGHT + 82);

  const { sheet, content } = useBottomSheet({ MIN_Y, MAX_Y });

  return (
    <>
      {/* <Background visible={true} /> */}
      <Wrapper ref={sheet}>
        <HandleWrapper>
          <Handle />
        </HandleWrapper>
        <BottomSheetContent>{children}</BottomSheetContent>
      </Wrapper>
    </>
  );
  // <Wrapper>{children}</Wrapper>;
});

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible ? 0 : 0.7};
  }
  to {
    opacity: ${visible ? 0.7 : 0};
  }
`;

const Background = styled.div<{ visible: boolean }>`
  width: 100%;
  max-width: 820px;
  height: 100%;

  position: absolute;
  top: 0;

  opacity: 0;
  background-color: ${colors.Shadow};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: ${BOTTOM_SHEET_HEIGHT}px;

  position: fixed;
  top: calc(100% - ${globalValue.BOTTOM_NAVIGATION_HEIGHT}px - 24%);

  border-radius: 16px 16px 0 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  background-color: ${colors.N0};

  transition: transform 0.3s ease-out;
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const HandleWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
`;
const Handle = styled.div`
  width: 36px;
  height: 4px;
  margin: auto;

  border-radius: 2px;
  background-color: ${colors.N40};
`;

export default BottomSheet;
