import styled from "@emotion/styled";
import RoundButton from "components/Button/RoundButton";
import Text from "components/Text";

export default function NewButton({
  text,
  buttonText,
  marginTop,
  onClick,
}: any) {
  return (
    <NewButtonWrapper marginTop={marginTop} onClick={onClick}>
      <Text typo="Paragraph5" color="N80">
        {text}
      </Text>
      <RoundButton type="mypage">{buttonText}</RoundButton>
    </NewButtonWrapper>
  );
}

const NewButtonWrapper = styled.div<{ marginTop: number }>`
  padding-top: ${({ marginTop }) => marginTop}px;
  align-items: center;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
