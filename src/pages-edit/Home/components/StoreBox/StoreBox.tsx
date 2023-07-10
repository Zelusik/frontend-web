import { useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import ProfileTitle from "components/Title/ProfileTitle";
import Image from "components/Image";
import Setting from "components/Setting";
import Button from "components/Button";
import { colors } from "constants/colors";

import CheckSvg from "assets/check_12.svg";

export default function StoreBox() {
  const router = useRouter();

  return (
    <BoxWrapper>
      <ProfileTitle
        imageSide={30}
        title="고작가"
        subTitle="움맘마"
        backIcon={
          <>
            <Button
              frontIcon={<CheckSvg />}
              text="팔로잉"
              width={74}
              height={34}
              radius={100}
              color={colors.N0}
              backgroundColor={colors.N100}
              fontMargin="0 0 0 4px"
            />
            <Setting margin={"0 0 0 4px"} />
          </>
        }
      />
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
