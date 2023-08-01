import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "components/Image";
import { useRouter } from "next/router";
import { typography } from "constants/typography";
import Spacing from "components/Spacing";
export default function ProfileInfo() {
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
          <Name>강남작가</Name>
          <Spacing size={16} />

          <FollowWrapper>
            {ProfileDatas.map((data: any, idx: number) => {
              return (
                <FollowInner key={idx}>
                  <Count>{data.count}</Count>
                  <div>{data.desc}</div>
                </FollowInner>
              );
            })}
          </FollowWrapper>
        </div>
      </Menu>
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

const Name = styled.div`
  ${css`
    ${typography.Headline4}
  `}
`;

const FollowWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const FollowInner = styled.div`
  text-align: center;
  ${css`
    ${typography.Paragraph2}
  `}
`;

const Count = styled.div`
  ${css`
    ${typography.Headline2}
  `}
`;
