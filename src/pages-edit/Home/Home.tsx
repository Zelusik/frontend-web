import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";
import { globalValue } from "constants/globalValue";

import SearchTitle from "components/Title/SearchTitle";
import Text from "components/Text";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";

import StoreCard from "./components/StoreCard";

export default function Home() {
  const { height } = useDisplaySize();

  return (
    <>
      <SearchTitle type="home" />
      <Wrapper height={height}>
        <Spacing size={70} />
        <Text typo="Headline6" color="N100">
          오늘은
          <br />
          어디로 갈까요?
        </Text>
        <Spacing size={30} />
        {HomeDatas.map((data: any) => {
          return <StoreCard key={data.id} id={0} />;
        })}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height - globalValue.BOTTOM_NAVIGATION_HEIGHT}px;
  padding: 0 20px;
  overflow-y: scroll;
`;

const HomeDatas = [
  {
    id: 1,
    profile: "https://i.ibb.co/2kSZX6Y/60pt.png",
    nickname: "고작가",
    time: 21,
    title: "소이연남",
    category: "카테고리",
    location: "지역",
    marked: true,
    following: true,
    image: "https://i.ibb.co/2kSZX6Y/60pt.png",
  },
  {
    id: 2,
    profile: "https://i.ibb.co/2kSZX6Y/60pt.png",
    nickname: "고작가",
    time: 21,
    title: "소이연남",
    category: "카테고리",
    location: "지역",
    marked: true,
    following: true,
    image: "https://i.ibb.co/2kSZX6Y/60pt.png",
  },
  {
    id: 3,
    profile: "https://i.ibb.co/2kSZX6Y/60pt.png",
    nickname: "고작가",
    time: 21,
    title: "소이연남",
    category: "카테고리",
    location: "지역",
    marked: true,
    following: true,
    image: "https://i.ibb.co/2kSZX6Y/60pt.png",
  },
];
