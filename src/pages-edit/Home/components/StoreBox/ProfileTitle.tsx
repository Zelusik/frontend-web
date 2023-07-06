import styled from "@emotion/styled";
import Image from "components/Image";
import DotSvg from "assets/dots_20.svg";
import Button from "components/Button";
import Spacing from "components/Spacing";

import CheckSvg from "assets/check_12.svg";
import PlusSvg from "assets/plus_12.svg";
import { colors } from "constants/colors";

export default function ProfileTitle() {
  return (
    <TitleWrapper>
      <MenuList>
        <Menu>
          <Image
            src="https://i.ibb.co/0Z6FNN7/60pt.png"
            width={30}
            height={30}
            radius={10}
          />
          <div>
            <div>고작가</div>
            <div>21시간 전에 방문</div>
          </div>
        </Menu>

        <Menu>
          <Button
            frontIcon={<CheckSvg />}
            text="팔로잉"
            width={74}
            height={34}
            radius={100}
            color={colors.N0}
            backgroundColor={colors.N100}
            margin="0 4px 0 0"
            fontMargin="0 0 0 4px"
          />
          <DotSvg />
        </Menu>
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
