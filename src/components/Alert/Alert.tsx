import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import useAlert from "hooks/useAlert";
import { useAppSelector } from "hooks/useReduxHooks";

import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import Logout from "./children/Logout";
import ReviewDelete from "./children/ReviewDelete";
import Sort from "./children/Sort";
import WriteReview from "./children/WriteReview";
import CopyText from "./children/CopyText";

const COMPONENT: any = {
  sort: <Sort />,
  "write-review": <WriteReview />,
  "review-delete": <ReviewDelete />,
  logout: <Logout />,
  "copy-text": <CopyText />,
};

export default function Alert() {
  const { type } = useAppSelector((state) => state.alert);
  const { closeAlert } = useAlert();

  return (
    <>
      <Background onClick={closeAlert} />
      <Wrapper>{COMPONENT[type]}</Wrapper>
    </>
  );
}

const fade = () => keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.4;
  }
`;

const slide = () => keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -70%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const Background = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: 100%;

  position: absolute;
  top: 0;

  animation: ${fade()} 200ms forwards;
  background-color: ${colors.N100};
  z-index: 998;
`;

const Wrapper = styled.div`
  width: 72%;
  max-width: 300px;
  padding: 35px 22px;

  position: absolute;
  top: 50%;
  left: 50%;

  border-radius: 16px;
  background-color: ${colors.N0};

  animation: ${slide()} 400ms forwards;
  transition: transform 200ms ease-out;
  z-index: 999;
`;
