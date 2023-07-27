import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { useAppDispatch } from "hooks/useReduxHooks";

import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { colors } from "constants/colors";
import BottomButton from "components/Button/BottomButton";

import BackTitle from "components/Title/BackTitle";
import { useRouter } from "next/router";
import TextArea from "components/TextArea/TextArea";
import Spacing from "components/Spacing/Spacing";
import { changeReviewInfo } from "reducer/slices/review/reviewSlice";

const Write = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [textAreaHeight, setTextAreaHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTextAreaHeight(window.innerHeight * 0.5);
    }
  }, []);

  const handleChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeReviewInfo({
        type: "content",
        value: e.target.value,
      })
    );
  };

  const handleClickUploadBtn = () => {};
  return (
    <WriteWrapper>
      <BackTitle type="default" text="리뷰 작성" />
      <MainWrapper>
        <div style={typography.Headline5}>
          {route.query.state === "self"
            ? "리뷰를 작성해 주세요."
            : "리뷰를 남겨주세요."}
        </div>
        <Spacing size={20} />
        <TextArea
          size={textAreaHeight}
          placeholder="음식점에서의 경험이나 정보를 자세히 작성해주세요!"
          onChange={handleChangeReview}
        />
        {route.query.state === "AI" && (
          <div className="AI">
            <Spacing size={10} />
            <p style={{ color: colors.Orange600 }}>
              {"*쫄깃한 콘스프*님의 리뷰를 AI가 글로 바꿔드렸어요."}
            </p>
            <p style={{ color: colors.N80 }}>
              수정과 추가를 통해 의견을 더할 수 있어요.
            </p>
          </div>
        )}
      </MainWrapper>

      <BottomWrapper>
        <BottomButton
          text="업로드하기"
          radius={8}
          backgroundColor={colors.Orange400}
          color={colors.N0}
          height="54px"
          onClick={handleClickUploadBtn}
        />
      </BottomWrapper>
    </WriteWrapper>
  );
};

const WriteWrapper = styled.div`
  height: 100%;
`;

const MainWrapper = styled.div`
  padding: 20px;
  .AI {
    ${typography.Paragraph2};
    p {
      margin: 0;
    }
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 50px;
`;

export default Write;
