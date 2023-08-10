import styled from "@emotion/styled";
import RoundButton from "components/Button/RoundButton";
import Text from "components/Text";

export default function WriteReview() {
  return (
    <SortWrapper>
      <Text typo="Paragraph6" color="N100">
        아직 작성된 리뷰가 없어
        <br />
        나만의 추천 베스트를
        <br />
        선택할 수 없습니다🥲
      </Text>
      <ButtonWrapper>
        <RoundButton type="mypage-alert">리뷰 작성하러 가기</RoundButton>
      </ButtonWrapper>
    </SortWrapper>
  );
}

const SortWrapper = styled.div`
  padding-top: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ButtonWrapper = styled.div`
  margin: auto;
  display: flex;
`;
