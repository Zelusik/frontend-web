import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ArrowSvg from "assets/arrow_24.svg";

export default function BackTitle({
  width,
  height,
  style,

  text,
  backIcon,

  textColor,
  textTypo,
  textMargin,
}: any) {
  const router = useRouter();

  return (
    <TitleWrapper style={{ width: width, height: height }} styles={style}>
      <MenuList>
        <Menu
          onClick={() => {
            router.back();
          }}
        >
          <ArrowSvg />
        </Menu>
        <Menu>
          <div>
            {text && (
              <Title color={textColor} typo={textTypo} margin={textMargin}>
                {text}
              </Title>
            )}
          </div>
        </Menu>
        <Menu>{backIcon}</Menu>
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<{ styles: any }>`
  display: flex;
  ${({ styles }) => css`
    ${styles}
  `}
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
