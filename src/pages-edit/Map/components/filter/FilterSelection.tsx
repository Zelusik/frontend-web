import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import RoundButton from "components/Button/RoundButton";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { changeFilterAction } from "reducer/slices/search/searchSlice";
import Spacing from "components/Spacing";
import { typography } from "constants/typography";
import { useRef } from "react";
import { atmosphereKeyword } from "constants/globalData";
import Text from "components/Text";
import useSearch from "hooks/useSearch";

export default function FilterSelection({}: any) {
  const router = useRouter();
  const filterRef = useRef<any>(null);
  const { mood } = useAppSelector((state) => state.search);
  const { filterActionSetting, moodSetting } = useSearch();

  const handleClickFilter = () => {
    filterActionSetting(true);
  };

  const clickFilterButton = (val: any) => {
    moodSetting(val);
  };

  return (
    <div style={{ position: "relative" }}>
      <ButtonWrapper ref={filterRef} onClick={handleClickFilter}>
        <Icon icon="Filter" width={16} height={16} color="Orange600" />
        <Text typo="Headline2" color="Orange600" style={{ marginLeft: 6 }}>
          10
        </Text>
      </ButtonWrapper>
      <ScrollWrapper>
        <div style={{ minWidth: 10 > 9 ? 88 : 80 }} />
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
                  onClick={() => moodSetting(data.val)}
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
