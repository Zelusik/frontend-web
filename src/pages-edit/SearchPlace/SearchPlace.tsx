import { useRouter } from "next/router";
import BackTitle from "components/Title/BackTitle";
import styled from "@emotion/styled";
import Input from "components/Input";
import { useEffect, useRef, useState } from "react";
import TopNavigation from "components/TopNavigation";
import Spacing from "components/Spacing";
import useDisplaySize from "hooks/useDisplaySize";
import AllDelete from "./components/AllDelete";
import CurrentSelection from "./components/CurrentSelection";
import ProfileSelection from "./components/ProfileSelection";
import Selection from "./components/Selection";

export default function SearchPlace() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const { height } = useDisplaySize();

  const [currentSelection, setCurrentSelection] = useState<any>([]);

  const [value, setValue] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // localStorage.setItem("currentSelection", JSON.stringify([]));
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      setCurrentSelection(local);
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }
  }, []);

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
            <AllDelete setCurrentSelection={setCurrentSelection} />
            <Spacing size={30} />
          </Wrapper>

          <Wrapper height={height - 176}>
            {currentSelection.map((data: any, idx: number) => {
              return (
                <CurrentSelection
                  key={idx}
                  idx={idx}
                  text={data.text}
                  where={data.type}
                  setCurrentSelection={setCurrentSelection}
                />
              );
            })}
          </Wrapper>
        </>
      ) : (
        <TopNavigation
          type="search-place"
          scrollRef={scrollRef}
          scrollTop={0}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          titleList={["지역", "음식점", "닉네임"]}
        >
          <Wrapper height={height - 160}>
            <Spacing size={20} />
            {["", "", "", "", "", "", "", "", "", "", "", ""].map(
              (data: any, idx: number) => {
                return (
                  <Selection
                    key={idx}
                    type="location"
                    text="강남구"
                    location="상세주소"
                  />
                );
              }
            )}
          </Wrapper>

          <Wrapper height={height - 160}>
            <Spacing size={20} />
            {["", "", ""].map((data: any, idx: number) => {
              return (
                <Selection
                  key={idx}
                  type="store"
                  text="강남구"
                  location="상세주소"
                />
              );
            })}
          </Wrapper>

          <Wrapper height={height - 160}>
            <Spacing size={20} />
            {["", "", ""].map((data: any, idx: number) => {
              return <ProfileSelection key={idx} text="강남구" />;
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
