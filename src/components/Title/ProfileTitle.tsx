import styled from "@emotion/styled";
import Image from "components/Image";
import Button from "components/Button";
import Spacing from "components/Spacing";

import CheckSvg from "assets/check_12.svg";
import PlusSvg from "assets/plus_12.svg";
import { colors } from "constants/colors";

export default function ProfileTitle({
  imageSide,
  title,
  subTitle,
  backIcon,
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
            {title && <div>{title}</div>}
            {subTitle && <div>{subTitle}</div>}
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
