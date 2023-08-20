import styled from "@emotion/styled";
import Text from "components/Text/Text";
import StoreFilter from "pages-edit/Mark/components/StoreSort";
import React from "react";

const SortingHeader = ({ count }: { count: number }) => {
  return (
    <SortingHeaderWrapper>
      <Text typo="Headline1" color="N50">
        {`총 ${count}개의 음식점`}
      </Text>
      <StoreFilter />
    </SortingHeaderWrapper>
  );
};

const SortingHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
  padding-top: 16px;
  background-color: #fbfbfb;
`;
export default SortingHeader;
