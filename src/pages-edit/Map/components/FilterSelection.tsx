import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import { useAppSelector } from "hooks/useReduxHooks";
import Spacing from "components/Spacing";
import RoundButton from "components/Button/RoundButton";

export default function FilterSelection({ type, text, textList }: any) {
  const router = useRouter();
  const { language } = useAppSelector((state) => state.global);

  return (
    <FilterSelectionWrapper>
      <Text>{text[language]}</Text>
      <Spacing size={16} />
      <ButtonWrapper>
        {textList.map((data: any, idx: number) => {
          return (
            <RoundButton key={idx} type={type} action={false}>
              {data[language]}
            </RoundButton>
          );
        })}
      </ButtonWrapper>
      {type === "full-radius" ? (
        <>
          <Spacing size={16} />
          <FilterText>해당 요일에 오픈하는 음식점만 보여드릴게요.</FilterText>
        </>
      ) : null}
      <Spacing size={40} />
    </FilterSelectionWrapper>
  );
}

const FilterSelectionWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
`;

const Text = styled.div`
  color: ${colors.N100};
  ${css`
    ${typography.Headline4}
  `};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterText = styled.div`
  ${css`
    ${typography.Paragraph1}
  `};
  color: ${({ color }) => colors.N80};
`;
