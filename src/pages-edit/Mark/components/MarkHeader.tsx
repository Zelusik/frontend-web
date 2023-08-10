import styled from "@emotion/styled";
import Text from "components/Text/Text";
import { colors } from "constants/colors";
import React from "react";

const MarkHeader = () => {
  return (
    <MarkHeaderWrapper>
      <Text typo="Headline5" color="N100">
        저장한 음식점
      </Text>
    </MarkHeaderWrapper>
  );
};

const MarkHeaderWrapper = styled.div`
  padding: 11px 20px;
`;
export default MarkHeader;
