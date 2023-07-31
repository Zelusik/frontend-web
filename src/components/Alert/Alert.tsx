import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeAlertVisible } from "reducer/slices/alert/alertSlice";
import Sort from "./children/Sort";

const COMPONENT = {
  sort: <Sort />,
};

export default function Alert() {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.alert);

  const closeAlert = () => {
    dispatch(
      changeAlertVisible({
        type: "alert",
        value: [false, "sort"],
      })
    );
  };

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
