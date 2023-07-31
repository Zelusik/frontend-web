import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

export default function Number({ currentIndex, imageLength }: any) {
  return (
    <NumberWrapper>
      <Menu>
        {currentIndex + 1}/{imageLength}
      </Menu>
    </NumberWrapper>
  );
}

const NumberWrapper = styled.div`
  padding: 4px 11px;
  display: inline;

  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);

  border-radius: 25px;
  background: rgba(32, 35, 48, 0.6);

  ${css`
    ${typography.Paragraph2}
  `}
  color: ${colors.N0};
`;

const MenuList = styled.div`
  display: flex;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;
