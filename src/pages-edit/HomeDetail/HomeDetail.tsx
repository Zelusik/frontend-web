import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Spacing from "components/Spacing";
import Image from "components/Image";
import ProfileTitle from "components/Title/ProfileTitle";
import Hashtags from "./components/Hashtags";
import Info from "./components/Info";
import Description from "components/Description";
import TextTitle from "components/Title/TextTitle";
import Edit from "components/Edit";
import Mark from "components/Heart";
import Hr from "components/Hr";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import BackTitle from "components/Title/BackTitle";
import Setting from "components/Setting";

export default function HomeDetail() {
  const router = useRouter();

  return (
    <>
      <HomeDetailWrapper style={{ width: "100%", position: "absolute" }}>
        <Spacing size={45} />
        <BackTitle height={50} backIcon={<Setting />} />
      </HomeDetailWrapper>

      <Image src="https://i.ibb.co/0Z6FNN7/60pt.png" ratio={9 / 10} />
      <HomeDetailWrapper>
        <Spacing size={20} />
        <TextTitle
          title="소이연남"
          titleTypo={typography.Headline5}
          subtitle="음식 카테고리 지역"
          subTitleTypo={typography.Paragraph1}
          backIcon={
            <>
              <Edit />
              <Mark margin={"0 0 0 20px"} />
            </>
          }
        />
      </HomeDetailWrapper>

      <Spacing size={30} />
      <Hashtags
        typo={typography.Paragraph4}
        hashtags={["단체모임에 딱", "데이트에 최고", "웨이팅 있음"]}
      />
      <Spacing size={16} />

      <HomeDetailWrapper>
        <Description
          text={`그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를
          그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를`}
          typo={typography.Paragraph2}
        />
        <Spacing size={15} />
        <Hr height={1} color={colors.N20} />
        <Spacing size={16} />
        <ProfileTitle
          imageSide={24}
          title="고작가"
          titleColor={colors.N80}
          titleTypo={typography.Paragraph2}
        />
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
