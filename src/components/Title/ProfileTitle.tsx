import styled from "@emotion/styled";

import RoundButton from "components/Button/RoundButton";
import Dots from "components/Button/IconButton/Dots";
import Image from "components/Image";
import Text from "components/Text";

export default function ProfileTitle({ title, subTitle }: any) {
  const mine = false;

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
            src="https://i.ibb.co/2kSZX6Y/60pt.png"
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
            onClick={() => {
              alert("roundButton");
            }}
          />
          <div style={{ marginLeft: 4 }}>
            <Dots type={mine ? "delete-edit" : "share-report"} color="N80" />
          </div>
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

const MenuList = styled.div`
  width: 100%;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  margin: auto 0;

  display: flex;
  align-items: center;
`;
