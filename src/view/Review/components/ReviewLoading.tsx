import React, { useEffect, useState } from "react";
import LoadingDots from "components/Loading/LoadingDots";
import { Box, Flex, Space, Text } from "components/core";
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
    <Box h="100%" ph={type === "review" ? 20 : 0}>
      <BackTitle type="black-left-text" text="" />
      <Space h={17} />
      <Text c="N100" typo="Headline5">
        {text}
      </Text>
      <Flex h="80%" justify="center" align="center">
        <LoadingDots />
      </Flex>
    </Box>
  );
};

export default ReviewLoading;
