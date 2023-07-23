import { useRouter } from "next/router";
import styled from "@emotion/styled";
import LocationTitle from "./LocationTitle";
import Spacing from "components/Spacing";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Hashtags from "components/Hashtags";

export default function StoreBox() {
  const router = useRouter();

  return (
    <Wrapper
      onClick={() => {
        router.push("/store-detail");
      }}
    >
      <Image
        src="https://i.ibb.co/0Z6FNN7/60pt.png"
        ratio={330 / 192}
        radius={12}
      />
      <Spacing size={16} />
      <StoreTitle
        type="secondary"
        title="소이연남"
        subtitle="아시안푸드"
        onClick={() => {
          // router.push(Route.HOME_DETAIL());
        }}
      />
      <Spacing size={10} />
      <Hashtags
        hashtags={["단체모임에 딱", "데이트에 최고", "웨이팅 있음"]}
        side={0}
      />
      <Spacing size={30} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0 15px;
`;
