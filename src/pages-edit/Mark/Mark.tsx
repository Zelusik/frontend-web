import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";
import styled from "@emotion/styled";
import MarkHeader from "./components/MarkHeader";
import KeywordBar from "./components/KeywordBar";
import SortingHeader from "./components/SortingHeader";
import FoodComponents from "./components/FoodComponents";

export default function Mark() {
  const router = useRouter();

  const placeInfo = [
    {
      name: "소이연남",
      category: "음식카테고리",
      region: "지역",
      keyword: ["단체모임에 딱", "데이트에 최고", "웨이팅 있음"],
      images: [
        "https://eatery-s3-dev.s3.ap-northeast-2.amazonaws.com/review/thumbnail/f2922855-cb99-4b8e-8aa7-59350b1ae6a6.png",
        "https://eatery-s3-dev.s3.ap-northeast-2.amazonaws.com/review/thumbnail/2bdb402c-f55a-431f-a54d-7b020912b472.png",
      ],
    },
    {
      name: "소이연남",
      category: "음식카테고리",
      region: "지역",
    },
    {
      name: "소이연남",
      category: "음식카테고리",
      region: "지역",
      keyword: ["단체모임에 딱", "데이트에 최고", "웨이팅 있음"],
    },
  ];
  return (
    <>
      <MarkWrapper>
        <MarkHeader />
        <KeywordBar />
        <SortingHeader count={placeInfo.length} />
        <div className="place-box">
          {placeInfo.map((foodInfo, index) => (
            <FoodComponents key={index} foodInfo={foodInfo} />
          ))}
        </div>
      </MarkWrapper>
      <BottomNavigation />
    </>
  );
}

const MarkWrapper = styled.div`
  height: 100%;
  overflow-y: auto;

  .place-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    overflow-y: auto;
    padding: 0 15px;
  }
`;
