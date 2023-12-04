import styled from "@emotion/styled";
import RoundButton from "components/Button/RoundButton";
import Text from "components/core/Text";

export default function NewButton({ text, buttonText, onClick }: any) {
  return (
    <NewButtonWrapper onClick={onClick}>
      {text ? (
        <Text typo="Paragraph5" c="N80">
          {text}
        </Text>
      ) : null}
      <RoundButton type="mypage">{buttonText}</RoundButton>
    </NewButtonWrapper>
  );
}

const NewButtonWrapper = styled.div`
  align-items: center;

  display: flex;
  flex-direction: column;
  gap: 20px;

  white-space: pre-line;
  text-align: center;
`;
