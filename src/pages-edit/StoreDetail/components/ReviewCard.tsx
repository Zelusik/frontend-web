import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import ProfileTitle from "components/Title/ProfileTitle";
import Description from "components/Description";
import Hashtags from "components/Hashtags";
import SlideImage from "components/Image/SlideImage";

export default function ReivewCard({ id }: any) {
  const router = useRouter();
  const mine = false;

  return (
    <>
      <Wrapper>
        <ProfileTitle
          type={mine ? "mine" : "follow"}
          title="고작가"
          subTitle="움맘마"
        />
        <Spacing size={16} />
      </Wrapper>

      <SlideImage
        images={[
          "https://i.ibb.co/2kSZX6Y/60pt.png",
          "https://i.ibb.co/2kSZX6Y/60pt.png",
          "https://i.ibb.co/2kSZX6Y/60pt.png",
        ]}
      />

      <Wrapper>
        <Spacing size={10} />
        <Description
          text={`그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를
          그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를`}
        />
        <Spacing size={10} />
      </Wrapper>

      <Hashtags
        type="secondary"
        hashtags={[
          "단체모임에 딱",
          "데이트에 최고",
          "웨이팅 있음",
          "웨이팅 있음",
        ]}
      />
      <Spacing size={40} />
    </>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
`;
