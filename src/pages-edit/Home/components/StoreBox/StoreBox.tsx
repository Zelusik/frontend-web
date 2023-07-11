import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import ProfileTitle from "components/Title/ProfileTitle";
import Image from "components/Image";
import Setting from "components/Setting";
import { colors } from "constants/colors";

import { typography } from "constants/typography";
import { Route } from "constants/Route";
import RoundButton from "components/Button/RoundButton";

export default function StoreBox({ id }: any) {
  const router = useRouter();
  const act = true;

  return (
    <BoxWrapper>
      <ProfileTitle
        onClick={() => {
          router.push(Route.HOME_DETAIL());
        }}
        imageSide={30}
        title="고작가"
        titleTypo={typography.Headline2}
        subTitle="움맘마"
        subTitleTypo={typography.Paragraph2}
        backIcon={
          <>
            <RoundButton
              type="follow"
              act={act}
              textPadding="0 0 0 4px"
              onClick={() => {
                alert(act);
              }}
            />
            <Setting margin="0 0 0 4px" color={colors.N80} />
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
