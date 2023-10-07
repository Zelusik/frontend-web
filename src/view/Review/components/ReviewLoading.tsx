import React, { useEffect, useState } from "react";
import { typography } from "constants/typography";
import { styled } from "styled-components";
import LoadingDots from "components/Loading/LoadingDots";
import { Space } from "components/core";
import BackTitle from "components/Title/BackTitle";

const ReviewLoading = ({
  type,
  nickname,
}: {
  type: string;
  nickname: string;
}) => {
  const [text, setText] = useState(
    type === "review"
      ? "리뷰가 업로드 되고 있어요."
      : `인공지능에게 ${nickname}님의 리뷰를 전달했어요.`
  );
  useEffect(() => {
    let timer1: any, timer2: any, timer3: any;

    if (type === "auto") {
      timer1 = setTimeout(() => {
        setText("인공지능이 글쓰기를 시작했어요.");
        timer2 = setTimeout(() => {
          setText("글쓰기를 하고있어요. 조금만 기다려주세요.");
          timer3 = setTimeout(() => {
            setText("글쓰기를 거의 완성했어요.");
          }, 2000);
        }, 2000);
      }, 1000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <ReviewLoadingWrapper>
      <BackTitle type="black-left-text" text="" />
      <Space h={17} />
      <div style={typography.Headline5}>{text}</div>
      <div className="icon">
        <LoadingDots />
      </div>
    </ReviewLoadingWrapper>
  );
};
const ReviewLoadingWrapper = styled.div`
  height: 100%;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
  }
`;
export default ReviewLoading;
