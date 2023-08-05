import styled from "@emotion/styled";
import Spacing from "components/Spacing";
import Text from "components/Text";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import ReviewBox from "./components/ReviewBox";

// 15 개
const ReviewDatas = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

export default function RecommandBest() {
  return (
    <>
      <TitleWrapper>
        <BackTitle type="black-x-button" text="추천 베스트 수정하기" />
        <Spacing size={20} />
        <Text typo="Headline5">
          추천 베스트 3를
          <br />
          선택해주세요!
        </Text>
        <Spacing size={20} />
      </TitleWrapper>
      <Spacing size={146} />

      <RecommandBestWrapper>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {ReviewDatas.map((data: any, idx: number) => {
            return <ReviewBox key={idx} />;
          })}
        </div>
        <Spacing size={146} />
      </RecommandBestWrapper>
    </>
  );
}

const RecommandBestWrapper = styled.div`
  height: 100%;
  padding: 0 20px;
  overflow-y: scroll;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 0 20px;

  position: fixed;
  top: 0;
  z-index: 800;
  background-color: ${colors.N0};
`;
