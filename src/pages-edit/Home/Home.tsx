import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";
import { globalValue } from "constants/globalValue";

import SearchTitle from "components/Title/SearchTitle";
import Text from "components/Text";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";

import StoreBox from "./components/StoreBox";

export default function Home() {
  const router = useRouter();
  const { height } = useDisplaySize();

  return (
    <>
      <SearchTitle type="home" />
      <HomeWrapper height={height - globalValue.BOTTOM_NAVIGATION_HEIGHT}>
        <Spacing size={70} />
        <Text typo="Headline6" color="N100">
          오늘은
          <br />
          어디로 갈까요?
        </Text>
        <Spacing size={30} />
        {HomeDatas.map((data: any) => {
          return <StoreBox key={data.id} id={0} />;
        })}
      </HomeWrapper>
      <BottomNavigation />
    </>
  );
}

const HomeWrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  padding: 0 20px;
  overflow-y: scroll;
`;

const HomeDatas = [
  {
    id: 1,
    profile: "https://i.ibb.co/0Z6FNN7/60pt.png",
    nickname: "고작가",
    time: 21,
    title: "소이연남",
    category: "카테고리",
    location: "지역",
    marked: true,
    following: true,
    image: "https://i.ibb.co/0Z6FNN7/60pt.png",
  },
  {
    id: 2,
    profile: "https://i.ibb.co/0Z6FNN7/60pt.png",
    nickname: "고작가",
    time: 21,
    title: "소이연남",
    category: "카테고리",
    location: "지역",
    marked: true,
    following: true,
    image: "https://i.ibb.co/0Z6FNN7/60pt.png",
  },
  {
    id: 3,
    profile: "https://i.ibb.co/0Z6FNN7/60pt.png",
    nickname: "고작가",
    time: 21,
    title: "소이연남",
    category: "카테고리",
    location: "지역",
    marked: true,
    following: true,
    image: "https://i.ibb.co/0Z6FNN7/60pt.png",
  },
];
