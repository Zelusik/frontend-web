import { useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import ProfileTitle from "./ProfileTitle";
import Image from "components/Image";

export default function StoreBox() {
  const router = useRouter();

  return (
    <BoxWrapper>
      <ProfileTitle />
      <Spacing size={16} />
      <Image
        src="https://i.ibb.co/0Z6FNN7/60pt.png"
        ratio={8 / 9}
        radius={20}
      />
      <Spacing size={30} />
    </BoxWrapper>
  );
}

const BoxWrapper = styled.div`
  width: 100%;
`;
