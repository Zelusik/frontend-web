import BottomNavigation from "components/BottomNavigation";
import BottomSheet from "components/BottomSheet";
import BottomButton from "components/Button/BottomButton";
import RoundButton from "components/Button/RoundButton";
import Description from "components/Description";
import Edit from "components/Button/IconButton/Edit";
import Hashtags from "components/Hashtags";
import Heart from "components/Button/IconButton/Heart";
import Hr from "components/Hr";
import Spacing from "components/Spacing";
import Input from "components/Input";
import TextArea from "components/TextArea";
import BackTitle from "components/Title/BackTitle";
import ProfileTitle from "components/Title/ProfileTitle";
import StoreTitle from "components/Title/StoreTitle";
import TopNavigation from "components/TopNavigation";
import Dots from "components/Button/IconButton/Dots";
import { Copy } from "components/Icon/icons";

export default function Example({}: any) {
  return (
    <>
      {/* BottomNavigation: 바닥 아이콘 */}
      {/* <BottomNavigation /> */}

      {/* BottomSheet: */}
      {/* <BottomSheet
        state={{ action: true, bottomSheetMove: (newAction: any) => {} }}
      >
        Hi
      </BottomSheet> */}

      <RoundButton type="map-icon" act={true} textPadding="0 0 0 4px" />
      <RoundButton type="map-icon" act={false} textPadding="0 0 0 4px" />

      <RoundButton type="map-text" act={true} text="테스트용 입니다" />
      <RoundButton type="map-text" act={false} text="테스트용 입니다" />

      <RoundButton type="follow-icon" text="테스트용 입니다" act={true} />
      <RoundButton type="follow-icon" text="테스트용 입니다" act={false} />

      <BottomButton type="primary" text="테스트용 입니다" />
      <BottomButton type="default" text="테스트용 입니다" />

      <Copy />
      <Edit />
      <Dots />
      <Heart />

      <Description
        text={`그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를
          그림자는 피부가 풀밭에 위하여 얼음 온갖 것은 힘차게 구할 그리하였는가?
          열락의 없으면 튼튼하며, 역사를 모래뿐일 교향악이다. 위하여, 듣기만
          더운지라 살 싸인 듣는다. 풍부하게 얼음과 가치를`}
      />

      <Hashtags
        type="primary"
        hashtags={[
          "테스트용 입니다",
          "테스트용 입니다",
          "테스트용 입니다",
          "테스트용 입니다",
        ]}
      />
      <Hashtags
        type="default"
        hashtags={[
          "테스트용 입니다",
          "테스트용 입니다",
          "테스트용 입니다",
          "테스트용 입니다",
        ]}
      />

      <Hr height={10} />

      <Input type="shadow" placeholder="테스트용 입니다" />
      <Input type="line" placeholder="테스트용 입니다" />

      <TextArea size={150} />

      <BackTitle type="primary" text="테스트용 입니다" />
      <BackTitle type="secondary" titleText="테스트용 입니다" />
      <BackTitle type="default" text="테스트용 입니다" />

      <ProfileTitle
        type="home"
        title="테스트용 입니다"
        subTitle="테스트용 입니다"
      />
      <ProfileTitle
        type="store-detail"
        title="테스트용 입니다"
        subTitle="테스트용 입니다"
      />

      <Spacing size={20} />

      <StoreTitle
        type="primary"
        title="테스트용 입니다"
        subTitle="테스트용 입니다"
      />
      <Spacing size={20} />
      <StoreTitle
        type="secondary"
        title="테스트용 입니다"
        subTitle="테스트용 입니다"
      />
      {/* <StoreTitle
        type="default"
        title="테스트용 입니다"
        subTitle="테스트용 입니다"
      /> */}

      <Spacing size={20} />

      {/* <TopNavigation
        type="search-place"
        titleList={["지역", "음식점", "닉네임"]}
        state={{ topFixed: false, currentIndex: 0, setCurrentIndex: () => {} }}
      >
        <>Hi1</>
        <>Hi2</>
        <>Hi3</>
      </TopNavigation> */}
    </>
  );
}
