import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";
import Spacing from "components/Spacing";
import LogoTitle from "./components/LogoTitle";
import StoreBox from "./components/StoreBox/StoreBox";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Spacing size={45} />
      <LogoTitle />
      <Spacing size={20} />
      <div style={{ height: "68px" }}>
        오늘은
        <br />
        어디로 갈까요?
      </div>
      <Spacing size={30} />
      {HomeDatas.map((data: any) => {
        return <StoreBox key={data.id} />;
      })}
      <Spacing size={88} />
      <BottomNavigation />
    </>
  );
}

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
