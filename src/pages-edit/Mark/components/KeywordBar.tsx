import styled from "@emotion/styled";
import Spacing from "components/Spacing/Spacing";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import React, { useState } from "react";

const KeywordBar = () => {
  const keywordData = ["전체", "분당구", "한식", "스테이크,립", "홍대", "연남"];
  const [clicked, setClicked] = useState("전체");
  return (
    <KeywordBarWrapper>
      <div className="keyword-container">
        {keywordData.map((keyword) => (
          <Keyword
            key={keyword}
            clicked={clicked === keyword}
            onClick={() => setClicked(keyword)}
          >
            {keyword}
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
