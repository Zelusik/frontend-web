import { useRef } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useAppSelector } from "hooks/useReduxHooks";
import useSearch from "hooks/useSearch";

import { colors } from "constants/colors";
import { atmosphereKeyword } from "constants/globalData";

import Icon from "components/Icon";
import RoundButton from "components/Button/RoundButton";
import Spacing from "components/Spacing";
import Text from "components/Text";

export default function FilterSelection({}: any) {
  const router = useRouter();
  const filterRef = useRef<any>(null);
  const { foodType, dayOfWeek, mood } = useAppSelector((state) => state.search);
  const { handleFilterVisible, handleMood } = useSearch();

  const clickFilterButton = (val: any) => {
    if (mood === val) handleMood("");
    else handleMood(val);
  };

  const num: number =
    dayOfWeek.length + (foodType !== "" ? 1 : 0) + (mood !== "" ? 1 : 0);

  return (
    <div style={{ position: "relative" }}>
      <ButtonWrapper ref={filterRef} onClick={() => handleFilterVisible(true)}>
        <Icon icon="Filter" width={16} height={16} color="Orange600" />
        <Text typo="Headline2" color="Orange600" style={{ marginLeft: 6 }}>
          {num}
        </Text>
      </ButtonWrapper>
      <ScrollWrapper>
        <div style={{ minWidth: num > 9 ? 88 : 80 }} />
        <ScrollInner>
          {atmosphereKeyword.map((data: any, idx: number) => {
            return (
              <ScrollList
                key={idx}
                marginRight={idx === atmosphereKeyword.length - 1}
              >
                <RoundButton
                  type="full"
                  action={data.val === mood}
                  onClick={() => clickFilterButton(data.val)}
                >
                  {data.val}
                </RoundButton>
              </ScrollList>
            );
          })}
        </ScrollInner>
      </ScrollWrapper>
      <Spacing size={14} />
    </div>
  );
}

const ButtonWrapper = styled.div`
  height: 36px;
  padding: 0 13px;
  display: flex;
  align-items: center;

  position: absolute;
  left: 15px;

  border-radius: 48px;
  border: 1.152px solid ${colors.Orange600};
  background-color: ${colors.N0};
`;

const ScrollWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

const ScrollInner = styled.div`
  display: flex;
  overflow: auto;
`;

const ScrollList = styled.div<{ marginRight: boolean }>`
  margin-right: ${({ marginRight }) => (marginRight ? `15px` : "6px")};
  display: flex;
`;
