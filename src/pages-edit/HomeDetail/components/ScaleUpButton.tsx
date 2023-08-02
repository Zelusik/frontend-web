import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import { colors } from "constants/colors";
import { Route } from "constants/Route";
import { typography } from "constants/typography";
import { useRouter } from "next/navigation";

export default function ScaleUpButton({}: any) {
  const router = useRouter();
  const handleClickScaleUp = () => {
    router.push(Route.MAP_DETAIL());
  };

  return (
    <ButtonWrapper onClick={handleClickScaleUp}>
      <Menu style={{ marginRight: 4 }}>크게 보기</Menu>
      <Menu>
        <Icon icon="ScaleUp" />
      </Menu>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  height: 33px;
  padding: 0 8px;

  display: flex;
  position: absolute;
  top: 15px;
  right: 15px;

  border-radius: 6px;
  background-color: ${colors.N0};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
  z-index: 900;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;

  ${css`
    ${typography.Heading2}
  `};
`;
