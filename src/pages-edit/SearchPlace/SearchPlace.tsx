// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import styled from "@emotion/styled";
// import useDisplaySize from "hooks/useDisplaySize";
// import useGetSearch from "hooks/queries/search-places/useGetSearch";

// import BackTitle from "components/Title/BackTitle";
// import Input from "components/Input";
// import TopNavigation from "components/TopNavigation";
// import Spacing from "components/Spacing";

// import AllDelete from "./components/AllDelete";
// import CurrentSelection from "./components/CurrentSelection";
// import ProfileSelection from "./components/ProfileSelection";
// import Selection from "./components/Selection";
// import useDebounce from "hooks/useDebounce";
// import NoneText from "./components/NoneText";
// import { useAppSelector } from "hooks/useReduxHooks";
// import useSearch from "hooks/useSearch";

// export default function SearchPlace() {
//   const router = useRouter();
//   const scrollRef = useRef<any>(null);
//   const { height } = useDisplaySize();
//   const { value } = useAppSelector((state) => state.search);

//   const [newValue, setNewValue] = useState<string>(value);
//   const [currentSelection, setCurrentSelection] = useState<any>([]);

//   const keyword = useDebounce(newValue, 300);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   useEffect(() => {
//     const local = JSON.parse(String(localStorage.getItem("currentSelection")));
//     if (local) {
//       setCurrentSelection(local);
//     } else {
//       localStorage.setItem("currentSelection", JSON.stringify([]));
//     }
//   }, []);

//   useEffect(() => {
//     if (newValue === "") {
//       setCurrentIndex(0);
//     }
//   }, [newValue]);

//   const { data, isLoading } = useGetSearch(currentIndex, keyword);

//   return (
//     <>
//       <Inner>
// <BackTitle type="black-left-text" />
// <Input
//   type="line"
//   placeholder="지역, 음식점, 닉네임 검색"
//   value={newValue}
//   setValue={setNewValue}
// />
// <Spacing size={26} />
//       </Inner>

//       <Wrapper>
//         {newValue === "" ? (
//           <>
//             <Inner>
//               <AllDelete setCurrentSelection={setCurrentSelection} />
//               <Spacing size={30} />
//             </Inner>

//             <Inner height={height - 176}>
//               {currentSelection.map((data: any, idx: number) => {
//                 return (
//                   <CurrentSelection
//                     key={idx}
//                     idx={idx}
//                     data={data}
//                     newValue={newValue}
//                     setCurrentSelection={setCurrentSelection}
//                   />
//                 );
//               })}
//             </Inner>
//           </>
//         ) : (
//           <TopNavigation
//             type="search-place"
//             scrollRef={scrollRef}
//             scrollTop={0}
//             topFixed={true}
//             currentIndex={currentIndex}
//             setCurrentIndex={setCurrentIndex}
//             titleList={["지역", "음식점", "닉네임"]}
//           >
//             <div style={{ height: "auto" }}>
//               {currentIndex === 0 && !isLoading ? (
//                 data?.contents && data?.contents.length !== 0 ? (
//                   <>
//                     <Spacing size={20} />
//                     {data?.contents.map((data: any, idx: number) => {
//                       return (
//                         <Selection key={idx} type="location" data={data} />
//                       );
//                     })}
//                   </>
//                 ) : (
//                   <NoneText text="지역" />
//                 )
//               ) : undefined}
//             </div>

//             <Inner height={height - 160}>
// {currentIndex === 1 && !isLoading ? (
//   data?.documents && data?.documents.length !== 0 ? (
//     <>
//       <Spacing size={20} />
//       {data?.documents.map((data: any, idx: number) => {
//         return <Selection key={idx} type="store" data={data} />;
//       })}
//     </>
//   ) : (
//     <NoneText text="음식점" />
//   )
// ) : undefined}
//             </Inner>

//             <Inner height={height - 160}>
// {currentIndex === 2 && !isLoading ? (
//   data?.contents && data?.contents.length !== 0 ? (
//     <>
//       <Spacing size={20} />
//       {data?.contents.map((data: any, idx: number) => {
//         return <ProfileSelection key={idx} data={data} />;
//       })}
//     </>
//   ) : (
//     <NoneText text="닉네임" />
//   )
// ) : undefined}
//             </Inner>
//           </TopNavigation>
//         )}
//       </Wrapper>
//     </>
//   );
// }

// const Wrapper = styled.div<{ height: number }>`
//   height: ${({ height }) => height}px;
//   overflow-y: scroll;
// `;

// const Inner = styled.div<{ height?: number }>`
//   height: ${({ height }) => height + "px"};
//   padding: 0 20px;
// `;

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import useDisplaySize from "hooks/useDisplaySize";
import { useAppSelector } from "hooks/useReduxHooks";
import useDebounce from "hooks/useDebounce";
import useGetSearch from "hooks/queries/search-places/useGetSearch";

import { colors } from "constants/colors";
import TopNavigation from "components/TopNavigation";
import Spacing from "components/Spacing";
import BackTitle from "components/Title/BackTitle";
import Input from "components/Input";
import NoneText from "./components/NoneText";
import ProfileSelection from "./components/ProfileSelection";
import Selection from "./components/Selection";
import AllDelete from "./components/AllDelete";
import CurrentSelection from "./components/CurrentSelection";

export default function SearchPlace() {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const { width, height } = useDisplaySize();
  const { value } = useAppSelector((state) => state.search);

  const [titleChange, setTitleChange] = useState<boolean>(false);
  const [topFixed, setTopFixed] = useState<boolean>(false);

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
      <TitleWrapper visible={titleChange}>
        <BackTitle type="black-left-text" />
        <Input
          type="line"
          placeholder="지역, 음식점, 닉네임 검색"
          value={newValue}
          setValue={setNewValue}
        />
        <Spacing size={26} />
      </TitleWrapper>

      <Wrapper ref={scrollRef} height={height}>
        {newValue === "" ? (
          <>
            <Spacing size={124} />
            <Inner>
              <AllDelete setCurrentSelection={setCurrentSelection} />
              <Spacing size={30} />
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
            </Inner>
          </>
        ) : (
          <TopNavigation
            type="search-place"
            scrollRef={scrollRef}
            scrollTop={0}
            topFixed={true}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            titleList={["지역", "음식점", "닉네임"]}
          >
            <TopNavigationInner
              height={
                data?.contents?.length > (height - 181) / 79
                  ? "auto"
                  : height - 35 + "px"
              }
            >
              <Spacing size={146} />
              {currentIndex === 0 && !isLoading ? (
                data?.contents && data?.contents.length !== 0 ? (
                  data?.contents.map((data: any, idx: number) => {
                    return <Selection key={idx} type="location" data={data} />;
                  })
                ) : (
                  <NoneText text="지역" />
                )
              ) : undefined}
            </TopNavigationInner>
            <TopNavigationInner
              height={
                data?.documents?.length > (height - 181) / 79
                  ? "auto"
                  : height - 35 + "px"
              }
            >
              <Spacing size={146} />
              {currentIndex === 1 && !isLoading ? (
                data?.documents && data?.documents.length !== 0 ? (
                  data?.documents.map((data: any, idx: number) => {
                    return <Selection key={idx} type="store" data={data} />;
                  })
                ) : (
                  <NoneText text="음식점" />
                )
              ) : undefined}
            </TopNavigationInner>
            <TopNavigationInner
              height={
                data?.contents?.length > (height - 181) / 62
                  ? "auto"
                  : height - 35 + "px"
              }
            >
              <Spacing size={146} />
              {currentIndex === 2 && !isLoading ? (
                data?.contents && data?.contents.length !== 0 ? (
                  data?.contents.map((data: any, idx: number) => {
                    return <ProfileSelection key={idx} data={data} />;
                  })
                ) : (
                  <NoneText text="닉네임" />
                )
              ) : undefined}
            </TopNavigationInner>
          </TopNavigation>
        )}
      </Wrapper>
    </>
  );
}

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible && 0};
    background-color: ${visible ? `transparent` : `${colors.N0}`};
  }
  to {
    opacity: ${visible && 1};
    background-color: ${visible ? `${colors.N0}` : `transparent`};
  }
`;

const TitleWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  padding: 0 20px;

  position: fixed;
  top: 0;
  z-index: 900;

  background-color: ${colors.N0};
`;

const Wrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;
  background-color: ${colors.N0};
`;

const Inner = styled.div<{ height?: number }>`
  height: ${({ height }) => height + "px"};
  padding: 0 20px;
`;

const TopNavigationInner = styled.div<{ height: any }>`
  height: ${({ height }) => height};
  padding: 0 20px;
`;
