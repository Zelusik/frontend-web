import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "components/Image";
import { useRouter } from "next/router";
import { typography } from "constants/typography";
import Spacing from "components/Spacing";
import Dots from "components/Button/IconButton/Dots";
import Text from "components/Text";
export default function ProfileInfo({ mine }: any) {
  const router = useRouter();

  const ProfileDatas = [
    { desc: "게시글", count: 62 },
    { desc: "영향력", count: 240 },
    { desc: "팔로워", count: 763 },
    { desc: "팔로잉", count: 68 },
  ];

  return (
    <ProfileWrapper>
      <Menu style={{ marginRight: 24 }}>
        <Image
          alt="프로팔 사진"
          src="https://i.ibb.co/0Z6FNN7/60pt.png"
          type="default"
          size={74}
        />
      </Menu>
      <Menu>
        <div>
          <Text typo="Headline4" color="N100">
            강남작가
          </Text>
          <Spacing size={16} />

          <FollowWrapper>
            {ProfileDatas.map((data: any, idx: number) => {
              return (
                <FollowInner key={idx}>
                  <Text typo="Headline2" color="N100">
                    {data.count}
                  </Text>
                  <Text typo="Paragraph2" color="N100">
                    {data.desc}
                  </Text>
                </FollowInner>
              );
            })}
          </FollowWrapper>
        </div>
      </Menu>

      {mine ? null : (
        <IconWrapper>
          <Dots />
        </IconWrapper>
      )}
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;

  position: relative;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;

const FollowWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const FollowInner = styled.div`
  text-align: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
