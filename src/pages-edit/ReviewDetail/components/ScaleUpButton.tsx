import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

import { colors } from "constants/colors";
import { Route } from "constants/Route";
import Icon from "components/Icon";
import Text from "components/Text";

export default function ScaleUpButton({}: any) {
  const router = useRouter();

  const handleClickScaleUp = () => {
    router.push(Route.MAP_DETAIL());
  };

  return (
    <Wrapper onClick={handleClickScaleUp}>
      <Text typo="Heading2" color="N100" style={{ marginRight: 4 }}>
        크게 보기
      </Text>
      <Icon icon="ScaleUp" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 33px;
  padding: 0 8px;

  display: flex;
  position: absolute;
  top: 15px;
  right: 15px;

  align-items: center;
  border-radius: 6px;
  background-color: ${colors.N0};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
  z-index: 899;
`;
