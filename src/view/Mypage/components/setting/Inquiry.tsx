import styled from "@emotion/styled";
import Icon from "components/Icon/Icon";
import Text from "components/core/Text/Text";
import BackTitle from "components/Title/BackTitle";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { CommonQAData } from "data/commonQAData";
import React, { useState } from "react";
import { Space, Text } from "components/core";

const Inquiry = () => {
  const [clickedArr, setClickedArr] = useState<number[]>([]);

  const handleClickQA = (idx: number) => {
    let tmp = [...clickedArr];
    if (clickedArr.includes(idx)) {
      tmp = tmp.filter((e) => e !== idx);
    } else {
      tmp.push(idx);
    }
    setClickedArr(tmp);
  };

  return (
    <InquiryWrapper>
      <BackTitle type="black-left-text" text="" />
      <Space h={20} />
      <Text typo="Headline5" c="N100">
        문의가 있으신가요?
      </Text>
      <Space h={6} />
      <Text typo="Paragraph1" c="N80">
        이메일로 문의를 주시면, 1-2일 내에 답변이 전송됩니다.
      </Text>
      <Space h={40} />
      <div className="email-box">
        <Text typo="Paragraph5" c="N80">
          이메일
        </Text>
        <div className="email">eatery.bob@gmail.com</div>
      </div>
      <Space h={60} />
      <Text typo="Headline5" c="N100">
        자주 묻는 질문
      </Text>
      <Space h={30} />
      <QuestionWrapper>
        {CommonQAData.map((qa, idx) => (
          <div key={qa.question}>
            <div className="question-box" onClick={() => handleClickQA(idx)}>
              <Text typo="Paragraph4" c="N80">
                {qa.question}
              </Text>
              <Icon
                icon="Chevron"
                rotate={clickedArr.includes(idx) ? 270 : 90}
                width={20}
                height={20}
                color={colors.N60}
              />
            </div>
            {clickedArr.includes(idx) && (
              <div className="answer-box">
                <Text typo="Paragraph1" c="N80">
                  {qa.ans}
                </Text>
              </div>
            )}
          </div>
        ))}
      </QuestionWrapper>
      <Space h={80} />
    </InquiryWrapper>
  );
};

const InquiryWrapper = styled.div`
  padding: 0 20px;
  height: 100vh;
  overflow-y: scroll;
  .email-box {
    display: flex;
    flex-direction: column;
    gap: 4px;

    border-radius: 12px;
    background: ${colors.N0};
    box-shadow: 0px 3px 18px 0px rgba(0, 0, 0, 0.08);

    padding: 30px;

    .email {
      color: ${colors.Orange400} !important;
      ${typography.Headline3};
      text-decoration-line: underline;
    }
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .question-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .answer-box {
    padding: 20px;
    margin-top: 19px;
    border-radius: 12px;
    background-color: ${colors.N10};
  }
`;
export default Inquiry;
