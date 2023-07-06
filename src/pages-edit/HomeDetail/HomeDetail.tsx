import { useRouter } from "next/router";
import styled from "@emotion/styled";

import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import Image from "components/Image";
import ProfileTitle from "components/Title/ProfileTitle";
import Hashtags from "./components/Hashtags";
import Info from "./components/Info";

export default function HomeDetail() {
  const router = useRouter();

  return (
    <>
      <Image
        src="https://i.ibb.co/0Z6FNN7/60pt.png"
        // height={400}
        ratio={9 / 10}
      />
      <HomeDetailWrapper>
        <Spacing size={20} />
        <ProfileTitle />
        <Spacing size={30} />
        <Hashtags />
        <Spacing size={16} />
        {/* contents */}
        <div>
          그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를 더보기
        </div>
      </HomeDetailWrapper>
      <Spacing size={40} />
      <Image src="https://i.ibb.co/0Z6FNN7/60pt.png" ratio={36 / 23} />
      <Spacing size={40} />
      <HomeDetailWrapper>
        {["", ""].map((data: any, idx: number) => {
          return <Info key={idx} />;
        })}
      </HomeDetailWrapper>
    </>
  );
}

const HomeDetailWrapper = styled.div`
  padding: 0 20px;
`;
