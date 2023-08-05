import styled from "@emotion/styled";
import { colors } from "constants/colors";
import useAlert from "hooks/useAlert";
import { useAppSelector } from "hooks/useReduxHooks";
import Sort from "./children/Sort";
import WriteReview from "./children/WriteReview";

const COMPONENT = {
  sort: <Sort />,
  "write-review": <WriteReview />,
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
  height: 100%;

  opacity: 0.4;
  position: absolute;
  top: 0;
  background-color: ${colors.N100};
  z-index: 998;
`;

const AlertWrapper = styled.div`
  width: 72%;
  max-width: 272px;
  padding: 26px 20px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 16px;
  background-color: ${colors.N0};
  z-index: 999;
`;
