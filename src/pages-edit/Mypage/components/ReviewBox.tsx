import styled from "@emotion/styled";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import { Route } from "constants/Route";
import useDisplaySize from "hooks/useDisplaySize";
import { useRouter } from "next/router";

export default function ReviewBox() {
  const router = useRouter();
  const { width } = useDisplaySize();
  const clickReview = () => {
    // router.push(Route.HOME_DETAIL());
  };

  return (
    <ReviewWrapper width={(width - 46) / 2} onClick={clickReview}>
      <Image
        alt="리뷰 사진"
        src="https://i.ibb.co/0Z6FNN7/60pt.png"
        type="mypage-review"
      />
      <StoreTitle
        type="tertiary"
        title="소이연남"
        subTitle="음식 카테고리 지역"
        onClick={() => {
          // router.push(Route.HOME_DETAIL());
        }}
      />
    </ReviewWrapper>
  );
}

const ReviewWrapper = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  position: relative;
`;
