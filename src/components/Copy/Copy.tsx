import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

export default function Copy() {
  return (
    <MenuList>
      <Menu typo={{}}>
        <Icon
          icon="Copy"
          width={16}
          height={16}
          margin={"0 2px 0 0"}
          onClick={() => {
            alert("copy");
          }}
        />
      </Menu>
      <Menu typo={typography.Paragraph1}>복사</Menu>
    </MenuList>
  );
}

const MenuList = styled.div`
  width: 100%;
  margin: auto 0;

  display: flex;
`;

const Menu = styled.span<{ typo: any }>`
  margin: auto 0;

  display: flex;
  align-items: center;
  ${({ typo }) =>
    css`
      ${typo}
    `}
  color: ${colors.Mint};
`;
