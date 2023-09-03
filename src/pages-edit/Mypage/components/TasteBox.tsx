import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Hashtag from "components/Hashtags/Hashtag";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

export default function TasteBox({ tasteStatistics }: any) {
  return (
    <TasteWrapper>
      <TasteInner>
        <div>
          <MyTaste>나의 취향은 🤤</MyTaste>
          <Spacing size={14} />
          <Menu>
            <Hashtag
              type="default"
              text={
                tasteStatistics?.mostVisitedLocation
                  ? tasteStatistics?.mostVisitedLocation
                  : "_____"
              }
            />
            <MenuSpan>에서</MenuSpan>
            <Hashtag
              type="default"
              text={
                tasteStatistics?.mostTaggedReviewKeyword
                  ? tasteStatistics?.mostTaggedReviewKeyword
                  : "_____"
              }
            />
            <MenuSpan>인</MenuSpan>
          </Menu>
          <Spacing size={8} />
          <Menu>
            <Hashtag
              type="default"
              text={
                tasteStatistics?.mostEatenFoodCategory
                  ? tasteStatistics?.mostEatenFoodCategory
                  : "_____"
              }
            />
            <MenuSpan>음식점을 가장 많이 방문했어요</MenuSpan>
          </Menu>
        </div>
      </TasteInner>
    </TasteWrapper>
  );
}

const TasteWrapper = styled.div`
  width: 100%;
  height: 182px;

  display: flex;

  border-radius: 12px;
  box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.08);
`;

const TasteInner = styled.div`
  width: 100%;
  margin: auto;
  padding: 0 20px;

  display: flex;
`;

const MyTaste = styled.div`
  ${css`
    ${typography.Headline5}
  `}
`;

const Menu = styled.div`
  width: 100%;
  display: flex;

  ${css`
    ${typography.Paragraph4}
  `}
  color: ${colors.N80};
`;

const MenuSpan = styled.div`
  margin: auto 0;
  margin-right: 10px;
  display: flex;
`;
