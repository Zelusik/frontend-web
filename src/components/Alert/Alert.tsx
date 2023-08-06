import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import useAlert from "hooks/useAlert";
import { useAppSelector } from "hooks/useReduxHooks";
import Logout from "./children/Logout";
import ReviewDelete from "./children/ReviewDelete";
import Sort from "./children/Sort";
import WriteReview from "./children/WriteReview";

const COMPONENT: any = {
  sort: <Sort />,
  "write-review": <WriteReview />,
  "review-delete": <ReviewDelete />,
  logout: <Logout />,
};

export default function Alert() {
  const { type } = useAppSelector((state) => state.alert);
  const { closeAlert } = useAlert();

  return (
    <>
      <Background onClick={closeAlert} />
      <AlertWrapper>{COMPONENT[type]}</AlertWrapper>
    </>
  );
}

const Background = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: 100%;

  opacity: 0.4;
  position: absolute;
  top: 0;
  background-color: ${colors.N100};
  z-index: 998;
`;

const AlertWrapper = styled.div`
  width: 72%;
  max-width: 300px;
  padding: 35px 22px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 16px;
  background-color: ${colors.N0};
  z-index: 999;
`;
