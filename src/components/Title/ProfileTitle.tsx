import { css } from "@emotion/react";
import styled from "@emotion/styled";
import RoundButton from "components/Button/RoundButton";
import Dots from "components/Button/IconButton/Dots";
import Image from "components/Image";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import Text from "components/Text";

export default function ProfileTitle({ title, subTitle }: any) {
  return (
    <TitleWrapper>
      <MenuList>
        <Menu
          onClick={() => {
            alert("profile");
          }}
        >
          <Image
            alt="프로필 이미지"
            src="https://i.ibb.co/0Z6FNN7/60pt.png"
            type="default"
          />
          <div style={{ marginLeft: 8 }}>
            {title && (
              <Text typo="Headline2" color="N100">
                {title}
              </Text>
            )}
            {subTitle && (
              <Text typo="Paragraph2" color="N100">
                {subTitle}
              </Text>
            )}
          </div>
        </Menu>

        <Menu>
          <RoundButton
            type="follow-icon"
            action={true}
            textPadding="0 0 0 4px"
            onClick={() => {
              alert("roundButton");
            }}
          />
          <Dots margin="0 0 0 4px" color="N80" />
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
