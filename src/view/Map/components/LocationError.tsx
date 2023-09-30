import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import Text from "components/Text";
import useGetCoordToAddress from "hooks/queries/map/useGetCoordToAddress";
import BobpoolSvg from "assets/bobpool_error.svg";
import useDisplaySize from "hooks/useDisplaySize";
import Spacing from "components/Spacing";
import { globalValue } from "constants/globalValue";
import { colors } from "constants/colors";
import useAlert from "hooks/useAlert";

export default function LocationError({}: any) {
  const router = useRouter();
  const { height } = useDisplaySize();
  const { openAlert } = useAlert();

  return (
    <>
      <Spacing size={116} />
      <Wrapper height={`calc(100% - 116px - ${height * 0.24}px)`}>
        <Inner>
          <Inner>
            <BobpoolSvg />
          </Inner>
          <Spacing size={20} />
          <Text typo="Paragraph4" color="N100">
            지도 권한을 허용해야 볼 수 있어요.
          </Text>
          <Spacing size={6} />
          {/* <ButtonWrapper> */}
          <Button onClick={() => openAlert("location-setting")}>
            <Text typo="Paragraph1" color="N100">
              설정 방법 보기
            </Text>
          </Button>
          {/* </ButtonWrapper> */}
        </Inner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div<{ height: any }>`
  width: 100%;
  height: ${({ height }) => height};
  display: flex;
`;

const Inner = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  padding: 10px 20px;
  margin: auto;
  display: flex;

  border-radius: 999px;
  background-color: ${colors.Orange200};
`;
