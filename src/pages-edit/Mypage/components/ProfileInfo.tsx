import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "components/Image";
import { useRouter } from "next/router";
import { typography } from "constants/typography";
import Spacing from "components/Spacing";
import Dots from "components/Button/IconButton/Dots";
import Text from "components/Text";
import RoundButton from "components/Button/RoundButton";
export default function ProfileInfo({ mine, myProfile }: any) {
  const router = useRouter();

  const ProfileDatas = [
    { desc: "게시글", count: myProfile.numOfReviews },
    { desc: "영향력", count: myProfile.influence },
    { desc: "팔로워", count: myProfile.numOfFollowers },
    { desc: "팔로잉", count: myProfile.numOfFollowings },
  ];

  return (
    <Wrapper>
      <Menu style={{ marginRight: 24 }}>
        <Image
          alt="프로필 사진"
          src={myProfile.profileImage.thumbnailImageUrl}
          type="default"
          size={74}
        />
      </Menu>
      {/* <Menu> */}
      <div style={{ width: "100%" }}>
        <TitleWrapper>
          <Menu>
            <Text typo="Headline4" color="N100">
              {myProfile.nickname}
            </Text>
          </Menu>
          {mine ? undefined : (
            <Menu>
              <RoundButton type="follow-icon" />
            </Menu>
          )}
        </TitleWrapper>
        <Spacing size={16} />

        <FollowWrapper>
          {ProfileDatas.map((data: any, idx: number) => {
            return (
              <div key={idx}>
                <Text typo="Headline2" color="N100">
                  {data.count}
                </Text>
                <Text typo="Paragraph2" color="N100">
                  {data.desc}
                </Text>
              </div>
            );
          })}
        </FollowWrapper>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 88px;
  display: flex;

  position: relative;
  align-items: center;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 40px;

  margin: auto;
  display: flex;

  justify-content: space-between;
  height: fit-content;
`;

const FollowWrapper = styled.div`
  display: flex;
  gap: 20px;
  text-align: center;
`;
