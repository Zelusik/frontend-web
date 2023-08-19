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
import useDebounce from "hooks/useDebounce";
import NoneText from "./components/NoneText";
import { useAppSelector } from "hooks/useReduxHooks";
import useSearch from "hooks/useSearch";

export default function SearchPlace() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const { height } = useDisplaySize();
  const { value } = useAppSelector((state) => state.search);

  const [newValue, setNewValue] = useState<string>(value);
  const [currentSelection, setCurrentSelection] = useState<any>([]);

  const keyword = useDebounce(newValue, 300);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const local = JSON.parse(String(localStorage.getItem("currentSelection")));
    if (local) {
      setCurrentSelection(local);
    } else {
      localStorage.setItem("currentSelection", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (newValue === "") {
      setCurrentIndex(0);
    }
  }, [newValue]);

  const { data, isLoading } = useGetSearch(currentIndex, keyword);

  return (
    <>
      <Wrapper>
        <BackTitle type="black-left-text" />
        <Input
          type="line"
          placeholder="지역, 음식점, 닉네임 검색"
          value={newValue}
          setValue={setNewValue}
        />
        <Spacing size={26} />
      </Wrapper>

      {newValue === "" ? (
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
                  newValue={newValue}
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
              data?.contents && data?.contents.length !== 0 ? (
                <>
                  <Spacing size={20} />
                  {data?.contents.map((data: any, idx: number) => {
                    return <Selection key={idx} type="location" data={data} />;
                  })}
                </>
              ) : (
                <NoneText text="지역" />
              )
            ) : undefined}
          </Wrapper>

          <Wrapper height={height - 160}>
            {currentIndex === 1 && !isLoading ? (
              data?.documents && data?.documents.length !== 0 ? (
                <>
                  <Spacing size={20} />
                  {data?.documents.map((data: any, idx: number) => {
                    return <Selection key={idx} type="store" data={data} />;
                  })}
                </>
              ) : (
                <NoneText text="음식점" />
              )
            ) : undefined}
          </Wrapper>

          <Wrapper height={height - 160}>
            {currentIndex === 2 && !isLoading ? (
              data?.contents && data?.contents.length !== 0 ? (
                <>
                  <Spacing size={20} />
                  {data?.contents.map((data: any, idx: number) => {
                    return <ProfileSelection key={idx} data={data} />;
                  })}
                </>
              ) : (
                <NoneText text="닉네임" />
              )
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
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
`;
