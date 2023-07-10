import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "components/Image";

export default function ProfileTitle({
  imageSide,
  title,
  subTitle,
  backIcon,

  titleColor,
  titleTypo,
  subTitleColor,
  subTitleTypo,
}: any) {
  return (
    <TitleWrapper>
      <MenuList>
        <Menu>
          <Image
            src="https://i.ibb.co/0Z6FNN7/60pt.png"
            width={imageSide}
            height={imageSide}
            radius={10}
            margin={"0 8px 0 0"}
          />
          <div>
            {title && (
              <FontTitle typo={titleTypo} color={titleColor}>
                {title}
              </FontTitle>
            )}
            {subTitle && (
              <FontSubTitle typo={subTitleTypo} color={subTitleColor}>
                {subTitle}
              </FontSubTitle>
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
  height: 37px;
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

const FontTitle = styled.div<{ typo: any; color: any }>`
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color}
`;

const FontSubTitle = styled.div<{ typo: any; color: any }>`
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color}
`;
