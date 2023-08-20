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

  const clickReview = (id?: number) => {
    switch (type) {
      case "mypage":
        router.push({ pathname: Route.REVIEW_DETAIL(), query: { id: id } });
        break;
      case "recommand-best":
        break;
    }
  };

  return (
    <ReviewWrapper>
      {datas &&
        datas.map((data: any, idx: number) => {
          return (
            <ReviewInner
              key={idx}
              width={(width - 46) / 2}
              onClick={() => clickReview(data.id)}
            >
              <Image
                alt="리뷰 사진"
                src={
                  data.images
                    ? data.images[0].thumbnailUrl
                    : "https://i.ibb.co/2kSZX6Y/60pt.png"
                }
                type="mypage-review"
              />
              <StoreTitle
                type="mypage-review"
                title={data.place?.name || "소이연남"}
                subTitle={
                  data.place
                    ? `${data.place.address.sido} ${data.place.address.sgg}`
                    : "음식 카테고리 지역"
                }
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
  height: ${({ width }) => Math.floor((width * 170) / 157)}px;
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
  background-color: ${({ action }) => (action ? colors.Orange400 : `transparent`)};
  z-index: 700;

  ${typography.Headline2}
  color: ${colors.N0};
`;
