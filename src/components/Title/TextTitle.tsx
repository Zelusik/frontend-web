import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Edit from "components/Edit";
import { colors } from "constants/colors";

export default function TextTitle({
  title,
  subtitle,
  backIcon,

  titleColor,
  titleTypo,
  titleMargin,

  subTitleColor,
  subTitleTypo,
  subTitleMargin,
}: any) {
  return (
    <TitleWrapper>
      <MenuList>
        <Menu>
          <div>
            {title && (
              <Title typo={titleTypo} color={titleColor} margin={titleMargin}>
                {title}
              </Title>
            )}
            {subtitle && (
              <SubTitle
                typo={subTitleTypo}
                color={subTitleColor}
                margin={subTitleMargin}
              >
                {subtitle}
              </SubTitle>
            )}
          </div>
        </Menu>

        <Menu>{backIcon}</Menu>
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
`;

const MenuList = styled.ul`
  width: 100%;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
`;

const Menu = styled.li`
  margin: auto 0;

  display: flex;
  align-items: center;
`;

const Title = styled.div<{ typo: any; color: any; margin: any }>`
  margin: ${({ margin }) => margin};
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color}
`;

const SubTitle = styled.div<{ typo: any; color: any; margin: any }>`
  margin: ${({ margin }) => margin};
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color}
`;
