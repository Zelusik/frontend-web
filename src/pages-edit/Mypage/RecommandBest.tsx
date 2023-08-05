import styled from "@emotion/styled";
import BottomButton from "components/Button/BottomButton";
import Spacing from "components/Spacing";
import Text from "components/Text";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import ReviewList from "./components/ReviewList";

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
        <ReviewList type="recommand-best" datas={ReviewDatas} />
        <Spacing size={146 + 124} />
      </RecommandBestWrapper>

      <Gradient />
      <ButtonWrapper>
        <BottomButton type="default">초기화</BottomButton>
        <BottomButton type="primary">저장하기</BottomButton>
      </ButtonWrapper>
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

const Gradient = styled.div`
  width: 100%;
  height: 30px;

  position: absolute;
  bottom: 94px;
  z-index: 800;
  background: linear-gradient(transparent, ${colors.N0});
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 94px;
  padding: 0 17.5px;

  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 0;
  z-index: 800;
  background-color: ${colors.N0};
`;
