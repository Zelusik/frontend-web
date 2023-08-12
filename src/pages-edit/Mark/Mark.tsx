import { useRouter } from "next/router";
import BottomNavigation from "components/BottomNavigation";
import styled from "@emotion/styled";
import MarkHeader from "./components/MarkHeader";
import KeywordBar from "./components/KeywordBar";
import SortingHeader from "./components/SortingHeader";
import FoodComponents from "./components/FoodComponents";
import useGetMarkPlaces from "hooks/queries/mark/useGetMarkPlaces";

export default function Mark() {
  const router = useRouter();
  const { data } = useGetMarkPlaces();

  return (
    <>
      {data && (
        <>
          <MarkWrapper>
            <MarkHeader />
            <KeywordBar />
            <SortingHeader count={data.numOfElements} />
            <div className="place-box">
              {data.contents.map((placeInfo: any) => (
                <FoodComponents key={placeInfo.id} placeInfo={placeInfo} />
              ))}
            </div>
          </MarkWrapper>
          <BottomNavigation />
        </>
      )}
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
