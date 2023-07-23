import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import Image from "components/Image";

import { typography } from "constants/typography";
import { Route } from "constants/Route";
import StoreTitle from "components/Title/StoreTitle";
import ProfileTitle from "components/Title/ProfileTitle";
import Description from "components/Description";
import Hashtags from "components/Hashtags";
import SlideImage from "components/Image/SlideImage";

export default function ReivewBox({ id }: any) {
  const router = useRouter();

  return (
    <>
      <MenuWrapper>
        <ProfileTitle type="store-detail" title="고작가" subTitle="움맘마" />
        <Spacing size={16} />
      </MenuWrapper>

      <SlideImage
        images={[
          "https://i.ibb.co/0Z6FNN7/60pt.png",
          "https://i.ibb.co/0Z6FNN7/60pt.png",
          "https://i.ibb.co/0Z6FNN7/60pt.png",
        ]}
      />

      <MenuWrapper>
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
      </MenuWrapper>

      <Hashtags
        type="default"
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

const BoxWrapper = styled.div`
  width: 100%;
`;

const MenuWrapper = styled.div`
  padding: 0 20px;
`;

const ImageWrapper = styled.div`
  padding-left: 20px;
`;
