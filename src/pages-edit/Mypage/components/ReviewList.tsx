import styled from "@emotion/styled";
import Image from "components/Image";
import StoreTitle from "components/Title/StoreTitle";
import { colors } from "constants/colors";
import { Route } from "constants/Route";
import { typography } from "constants/typography";
import useDisplaySize from "hooks/useDisplaySize";
import { useRouter } from "next/router";

export default function ReviewList({ type = "mypage", datas }: any) {
  const router = useRouter();
  const { width } = useDisplaySize();
  const clickReview = () => {
    switch (type) {
      case "mypage":
        router.push({ pathname: Route.REVIEW_DETAIL(), query: { id: 1 } });
        break;
      case "recommand-best":
        break;
    }
    // router.push(Route.REVIEW_DETAIL());
  };

  return (
    <ReviewWrapper>
      {datas.map((data: any, idx: number) => {
        return (
          <ReviewInner key={idx} width={(width - 46) / 2} onClick={clickReview}>
            <Image
              alt="리뷰 사진"
              src="https://i.ibb.co/2kSZX6Y/60pt.png"
              type="mypage-review"
            />
            <StoreTitle
              type="mypage-review"
              title="소이연남"
              subTitle="음식 카테고리 지역"
              onClick={() => {
                // router.push(Route.REVIEW_DETAIL());
              }}
            />
            {type === "recommand-best" ? (
              <CountWrapper action={false}>{}</CountWrapper>
            ) : null}
          </ReviewInner>
        );
      })}
    </ReviewWrapper>
  );
}

const ReviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ReviewInner = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  position: relative;
`;

const CountWrapper = styled.div<{ action: boolean }>`
  width: 20px;
  height: 20px;

  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;

  border-radius: 999px;
  border: 2px solid ${({ action }) => (action ? colors.Orange400 : colors.N40)};
  background-color: ${({ action }) =>
    action ? colors.Orange400 : `transparent`};
  z-index: 700;

  ${typography.Headline2}
  color: ${colors.N0};
`;
