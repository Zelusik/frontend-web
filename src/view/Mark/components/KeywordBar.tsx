import styled from "@emotion/styled";
import { Space } from "components/core";
import { typography } from "constants/typography";
import useGetMarkKeywords from "hooks/queries/mark/useGetFilteringKeywords";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { colors } from "constants/colors";

const KeywordBar = () => {
  const router = useRouter();
  const { query } = useRouter();
  const { keywordDatas } = useGetMarkKeywords();

  const keywordsWithAll = keywordDatas && [
    {
      keyword: "전체",
      type: "",
    },
    ...keywordDatas.keywords,
  ];
  const [clicked, setClicked] = useState(query.keyword || "전체");
  const handleFilteringKeyword = async (keywordInfo: {
    keyword: string;
    type: string;
  }) => {
    setClicked(keywordInfo.keyword);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        type: keywordInfo.type,
        keyword: keywordInfo.keyword,
      },
    });
  };
  return (
    <KeywordBarWrapper>
      <div className="keyword-container">
        {keywordDatas &&
          keywordsWithAll.map(
            (keywordInfo: { keyword: string; type: string }) => (
              <Keyword
                key={keywordInfo.keyword}
                clicked={clicked === keywordInfo.keyword}
                onClick={() => handleFilteringKeyword(keywordInfo)}
              >
                {keywordInfo.keyword}
              </Keyword>
            )
          )}
      </div>
      <Space h={16} />
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
