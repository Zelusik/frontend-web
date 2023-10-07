import styled from "@emotion/styled";
import { useRouter } from "next/router";
import useBottomSheet from "hooks/useBottomSheet";
import useAlert from "hooks/useAlert";

import { Route } from "constants/Route";
import Icon from "components/Icon";

import Text from "components/core/Text";
import useGetReviewsId from "hooks/queries/review-detail/useGetReviewsId";
import { useAppDispatch } from "hooks/useReduxHooks";
import {
  changeReviewInfo,
  initializeReviewInfo,
} from "reducer/slices/review/reviewSlice";
import { initEditImageInfo } from "reducer/slices/image/imageSlice";
import { atmosphereKeyword, foodKeyword } from "data/keywordData";
import { Space } from "components/core";

interface Props {}

export default function DeleteEdit({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { openAlert } = useAlert();
  const { closeBottomSheetQuick } = useBottomSheet({});
  const reviewId = Number(router.query.id);
  const { data: reviewData } = useGetReviewsId(reviewId);

  const clickPrimary = () => {
    openAlert("review-delete");
    closeBottomSheetQuick();
  };

  const transformData = (reviewImages: any) => {
    return reviewImages.map((item: any) => ({
      imageUrl: item.imageUrl,
      menuTag: item.menuTags.map((tag: any) => ({
        x: tag.point.x,
        y: tag.point.y,
        menu: tag.content,
      })),
    }));
  };

  const transformKeyword = (keywords: string[]) => {
    // 분위기, 음식 키워드가 한글로 응답값이 오는데 체크는 영어로 하고 있어서 이를 위해 영어로 변환
    const allKeyword = [...foodKeyword, ...atmosphereKeyword];
    const euqalsKeyword = ({ str1, str2 }: { str1: string; str2: string }) => {
      const words1 = str1.split(" ");
      const words2 = str2.split(" ");

      return words1.some((word1) =>
        words2.some((word2) => word1.includes(word2) || word2.includes(word1))
      );
    };
    const matchedValues = keywords
      .flatMap((keyword) => {
        return allKeyword
          .filter((obj) => euqalsKeyword({ str1: keyword, str2: obj.text }))
          .map((obj) => obj.value);
      })
      .filter(Boolean);
    return matchedValues;
  };

  // foodInfo: [],
  const clickSecondary = () => {
    dispatch(initializeReviewInfo());
    dispatch(
      changeReviewInfo({
        type: "placeId",
        value: reviewData.place.id,
      })
    );
    dispatch(
      changeReviewInfo({
        type: "reviewId",
        value: reviewData?.id,
      })
    );
    dispatch(
      changeReviewInfo({
        type: "keywords",
        value: transformKeyword(reviewData?.keywords),
      })
    );
    dispatch(
      changeReviewInfo({
        type: "content",
        value: reviewData.content,
      })
    );
    const transformed = transformData(reviewData.reviewImages);
    dispatch(initEditImageInfo(transformed));
    router.push(Route.REVIEW_MENU());
    localStorage.setItem("state", "edit-review");
    closeBottomSheetQuick();
  };

  return (
    <>
      <Space h={10} />
      <ReportButton onClick={clickPrimary}>
        <Icon icon="Trash" width={20} height={20} />
        <Text typo="Headline2" c="N100" style={{ marginLeft: 6 }}>
          삭제하기
        </Text>
      </ReportButton>
      <Space h={26} />
      <ReportButton onClick={clickSecondary}>
        <Icon icon="Edit" width={20} height={20} />
        <Text typo="Headline2" c="N100" style={{ marginLeft: 6 }}>
          수정하기
        </Text>
      </ReportButton>
    </>
  );
}

const ReportButton = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
`;
