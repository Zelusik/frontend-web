import styled from "@emotion/styled";
import Spacing from "components/Spacing/Spacing";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import useGetMarkKeywords from "hooks/queries/mark/useGetMarkKeywords";
import React, { useState } from "react";

const KeywordBar = () => {
  const { data } = useGetMarkKeywords();
  const keywordsWithAll = data && [
    {
      keyword: "전체",
      type: "",
    },
    ...data.keywords,
  ];
  const [clicked, setClicked] = useState("전체");
  return (
    <KeywordBarWrapper>
      <div className="keyword-container">
        {data &&
          keywordsWithAll.map((keywordInfo: { keyword: string; type: string }) => (
            <Keyword
              key={keywordInfo.keyword}
              clicked={clicked === keywordInfo.keyword}
              onClick={() => setClicked(keywordInfo.keyword)}
            >
              {keywordInfo.keyword}
            </Keyword>
          ))}
      </div>
      <Spacing size={16} />
    </KeywordBarWrapper>
  );
};

const KeywordBarWrapper = styled.div`
  padding: 20px 20px 0 20px;

  .keyword-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    overflow-x: auto;
    border-bottom: 1px solid ${colors.N40};
  }
`;

const Keyword = styled.div<{ clicked: boolean }>`
  white-space: nowrap;
  ${typography.Headline3};
  color: ${({ clicked }) => (clicked ? colors.Orange600 : colors.N40)};
  padding-bottom: 10px;
  border-bottom: ${({ clicked }) => (clicked ? "2px" : "0px")} solid
    ${({ clicked }) => (clicked ? colors.Orange600 : "transparent")};
`;
export default KeywordBar;
