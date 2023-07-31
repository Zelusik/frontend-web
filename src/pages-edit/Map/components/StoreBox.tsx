import { useRouter } from "next/router";
import styled from "@emotion/styled";
import LocationTitle from "./LocationTitle";
import Spacing from "components/Spacing";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import Hashtags from "components/Hashtags";
import { Route } from "constants/Route";
import { useAppDispatch } from "hooks/useReduxHooks";
import {
  changeAction,
  changeVisible,
} from "reducer/slices/bottomSheet/mapBottomSheetSlice";

export default function StoreBox() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClickBackground = () => {
    dispatch(
      changeVisible({
        type: "mapBottomSheet",
        value: 0,
      })
    );
  };

  return (
    <Wrapper
      onClick={() => {
        handleClickBackground();
        router.push(Route.STORE_DETAIL());
      }}
    >
      <Inner>
        <Image
          alt="음식 사진"
          src="https://i.ibb.co/2kSZX6Y/60pt.png"
          type="map-bottom-sheet"
        />
        <Spacing size={16} />
        <StoreTitle
          type="secondary"
          title="소이연남"
          subTitle="아시안푸드"
          onClick={() => {
            // router.push(Route.HOME_DETAIL());
          }}
        />
        <Spacing size={10} />
      </Inner>

      <Hashtags
        hashtags={[
          "단체모임에 딱",
          "데이트에 최고",
          "웨이팅 있음",
          "웨이팅 있음",
        ]}
        side={15}
      />
      <Spacing size={30} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  padding: 0 15px;
`;
