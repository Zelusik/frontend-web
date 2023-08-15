import styled from "@emotion/styled";
import Text from "components/Text/Text";
import StoreFilter from "pages-edit/Map/components/StoreSort";
import React from "react";

const SortingHeader = ({ count }: { count: number }) => {
  return (
    <SortingHeaderWrapper>
      <Text typo="Headline1" color="N50">
        {`총 ${count}의 음식점`}
      </Text>
      <StoreFilter />
    </SortingHeaderWrapper>
  );
};

const SortingHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 16px 20px 19px;
`;
export default SortingHeader;
