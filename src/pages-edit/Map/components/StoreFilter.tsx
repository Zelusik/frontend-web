import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { useRouter } from "next/router";

export default function StoreFilter({ text }: any) {
  const router = useRouter();
  const clickStoreFilter = () => {};

  return (
    <StoreFilterWrapper onClick={clickStoreFilter}>
      <Menu style={{ marginRight: 4 }}>{text}</Menu>
      <Menu>
        <Icon icon="BottomArrow" width={16} height={16} color={colors.N60} />
      </Menu>
    </StoreFilterWrapper>
  );
}

const StoreFilterWrapper = styled.div`
  padding: 0 15px;
  display: flex;
  ${css`
    ${typography.Paragraph5}
  `}
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;
