import styled from "@emotion/styled";
import { deleteReview } from "api/reviews";
import AlertButton from "components/Button/AlertButton";
import RoundButton from "components/Button/RoundButton";
import { Text } from "components/core";
import { Route } from "constants/Route";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";

export default function ReviewDelete() {
  const router = useRouter();

  const { closeAlert } = useAlert();
  const handleDeleteReview = async () => {
    const res = await deleteReview(router.query.id);
    if (!res) {
      closeAlert();
      router.replace(Route.MYPAGE());
    }
  };
  return (
    <DeleteWrapper>
      <Text typo="Paragraph6" c="N100">
        리뷰를 삭제하시겠습니까?
      </Text>
      <ButtonWrapper>
        <AlertButton type="default" onClick={closeAlert}>
          취소
        </AlertButton>
        <AlertButton type="primary" onClick={handleDeleteReview}>
          확인
        </AlertButton>
      </ButtonWrapper>
    </DeleteWrapper>
  );
}

const DeleteWrapper = styled.div`
  padding: 10px 0 2px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  gap: 8px;
`;
