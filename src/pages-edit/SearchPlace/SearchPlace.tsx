import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";
import useGetSearch from "hooks/queries/search-places/useGetSearch";

import BackTitle from "components/Title/BackTitle";
import Input from "components/Input";
import TopNavigation from "components/TopNavigation";
import Spacing from "components/Spacing";

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
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      setCurrentSelection(local);
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }
  }, []);

  const { data, isLoading } = useGetSearch(currentIndex, value);

  const buttonAction = (val: string) => {
    const newInclude = data.new ? data.new.includes(val) : false;
    return newInclude;
  };

  return (
    <>
      <Wrapper>
        <BackTitle type="black-left-text" />
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
                  data={data}
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
            {currentIndex === 0 && !isLoading ? (
              <>
                <Spacing size={20} />
                {data?.contents.map((data: any, idx: number) => {
                  return <Selection key={idx} type="location" data={data} />;
                })}
              </>
            ) : undefined}
          </Wrapper>

          <Wrapper height={height - 160}>
            {currentIndex === 1 && !isLoading ? (
              <>
                <Spacing size={20} />
                {data?.contents.map((data: any, idx: number) => {
                  return <Selection key={idx} type="store" data={data} />;
                })}
              </>
            ) : undefined}
          </Wrapper>

          <Wrapper height={height - 160}>
            {currentIndex === 2 && !isLoading ? (
              <>
                <Spacing size={20} />
                {data?.contents.map((data: any, idx: number) => {
                  return <ProfileSelection key={idx} text={data.name} />;
                })}
              </>
            ) : undefined}
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
