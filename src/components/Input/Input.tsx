import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { match } from "ts-pattern";
import { typography } from "constants/typography";
import { colors } from "constants/colors";
import Icon from "components/Icon";

export default function Input({ type = "shadow", placeholder }: any) {
  const router = useRouter();

  const clickInput = () => {
    switch (type) {
      case "line":
        break;
      case "shadow":
        alert("Shadow");
        break;
      default:
        break;
    }
  };
  const handlerInput = () => {};

  return (
    <InputWrapper
      onClick={clickInput}
      borderColor={match(type)
        .with("line", () => colors.N50)
        .with("shadow", () => colors.N0)
        .exhaustive()}
      shadow={match(type)
        .with("line", () => false)
        .with("shadow", () => true)
        .exhaustive()}
    >
      <InputInner>
        <Icon icon="Search" width={24} height={24} />
        <InputBox placeholder={placeholder} />
        {type !== "shadow" && (
          <Icon icon="CircleXButton" width={24} height={24} />
        )}
      </InputInner>
    </InputWrapper>
  );
}

const InputWrapper = styled.div<{ borderColor: any; shadow: any }>`
  width: 100%;
  height: 48px;
  margin: auto;
  padding: 0 12px;
  display: flex;

  border-radius: 8px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${colors.N0};
  box-shadow: ${({ shadow }) => shadow && `0px 0px 6px rgba(0, 0, 0, 0.12)`};
`;

const InputInner = styled.div`
  width: 100%;
  margin: auto 0;
  display: flex;
`;

const InputBox = styled.input`
  width: 100%;
  height: 24px;
  margin: 0 8px;

  border: 0;
  outline: none;

  ${css`
    ${typography.Paragraph6}
  `}
  &::placeholder {
    color: ${colors.N50};
  }
  color: ${colors.N100};
`;
