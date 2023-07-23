import { useRouter } from "next/router";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import Input from "components/Input";
import { useState } from "react";
import TopNavigation from "components/TopNavigation";
import Spacing from "components/Spacing";
import useDisplaySize from "hooks/useDisplaySize";
import AllDelete from "./components/AllDelete";
import CurrentSelection from "./components/CurrentSelection";
import LocationSelection from "./components/LocationSelection";
import ProfileSelection from "./components/ProfileSelection";

const searchPlaceDatas = [
  { text: "강남구", where: 0 },
  { text: "강남구", where: 1 },
  { text: "강남구", where: 2 },
  { text: "강남구", where: 0 },
];

export default function SearchPlace() {
  const router = useRouter();
  const { height } = useDisplaySize();
  const [value, setValue] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <>
      <Wrapper>
        <BackTitle type="secondary" />
        <Input
          type="line"
          placeholder="지역, 음식점, 닉네임 검색"
          value={value}
          setValue={setValue}
        />
        <Spacing size={26} />
      </Wrapper>

      {value === "" ? (
        <>
          <Wrapper>
            <AllDelete />
            <Spacing size={30} />
          </Wrapper>

          <Wrapper height={height - 176}>
            {searchPlaceDatas.map((data: any, idx: number) => {
              return (
                <CurrentSelection
                  key={idx}
                  text={data.text}
                  where={data.where}
                />
              );
            })}
          </Wrapper>
        </>
      ) : (
        <TopNavigation
          type="search-place"
          titleList={["지역", "음식점", "닉네임"]}
          state={{ topFixed: false, currentIndex, setCurrentIndex }}
        >
          <Wrapper height={height - 160}>
            <Spacing size={20} />
            {["", "", ""].map((data: any, idx: number) => {
              return (
                <LocationSelection
                  key={idx}
                  text="강남구"
                  subText="상세주소"
                  searchLatter={value}
                />
              );
            })}
          </Wrapper>

          <Wrapper height={height - 160}>
            <Spacing size={20} />
            {["", "", ""].map((data: any, idx: number) => {
              return (
                <LocationSelection
                  key={idx}
                  text="강남구"
                  subText="상세주소"
                  searchLatter={value}
                />
              );
            })}
          </Wrapper>

          <Wrapper height={height - 160}>
            <Spacing size={20} />
            {["", "", ""].map((data: any, idx: number) => {
              return (
                <ProfileSelection
                  key={idx}
                  text="강남구"
                  searchLatter={value}
                />
              );
            })}
          </Wrapper>
        </TopNavigation>
      )}
    </>
  );
}

const Wrapper = styled.div<{ height?: number }>`
  height: ${({ height }) => height + "px"};
  padding: 0 20px;
  overflow: scroll;
`;
