import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import ProfileTitle from "./ProfileTitle";
import Image from "components/Image";

import { typography } from "constants/typography";
import { Route } from "constants/Route";

export default function StoreBox({ id }: any) {
  const router = useRouter();

  return (
    <BoxWrapper>
      <ProfileTitle title="고작가" subTitle="움맘마" />
      <Spacing size={16} />
      <Image
        src="https://i.ibb.co/0Z6FNN7/60pt.png"
        ratio={8 / 9}
        radius={20}
        onClick={() => {
          router.push(Route.HOME_DETAIL());
        }}
      />
      <Spacing size={30} />
    </BoxWrapper>
  );
}

const BoxWrapper = styled.div`
  width: 100%;
`;
