import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { match } from "ts-pattern";

import { Route } from "constants/Route";
import { typography } from "constants/typography";
import { colors } from "constants/colors";
import Icon from "components/Icon";

interface Props {
  type: "line" | "shadow";
}

export default function Input({
  type = "line",
  placeholder,
  value,
  setValue,
}: any) {
  const router = useRouter();
  const inputRef = useRef<any>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const handleClickInput = (e: any) => {
    switch (type) {
      case "line":
        break;
      case "shadow":
        router.push(Route.SEARCH_PLACE());
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper
      onClick={handleClickInput}
      borderColor={match(type)
        .with("line", () => (focus ? "N100" : "N50"))
        .with("shadow", () => "N0")
        .otherwise(() => "N100")}
      shadow={match(type)
        .with("line", () => false)
        .with("shadow", () => true)
        .otherwise(() => false)}
      borderRadius={match(type)
        .with("line", () => "12px")
        .with("shadow", () => "8px")
        .otherwise(() => "12px")}
    >
      <Icon icon="Search" width={24} height={24} />
      <InputBox
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        disabled={type === "shadow"}
        onClick={handleClickInput}
        onChange={(e: any) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={(e: any) => {
          const nextText = e.relatedTarget;
          if (nextText !== null) {
            setValue(nextText.textContent);
            inputRef.current.focus();
          } else {
            setFocus(false);
          }
        }}
      />
      {type !== "shadow" && focus && value !== "" && (
        <div tabIndex={0}>
          <Icon
            icon="CircleXButton"
            width={24}
            height={24}
            onClick={() => {
              setValue("");
              setFocus(true);
              inputRef.current?.focus();
            }}
          />
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  borderColor: any;
  shadow: any;
  borderRadius: any;
}>`
  width: 100%;
  height: 50px;
  margin: auto;
  padding: 0 12px;

  display: flex;
  position: relative;
  align-items: center;

  border-radius: ${({ borderRadius }) => borderRadius};
  border: 1px solid ${({ borderColor }) => colors[borderColor]};
  background-color: ${colors.N0};
  box-shadow: ${({ shadow }) => shadow && `0px 0px 6px rgba(0, 0, 0, 0.12)`};
`;

const InputBox = styled.input`
  width: 100%;
  height: 24px;
  margin: 0 8px;

  border: 0;
  outline: none;
  background-color: ${colors.N0};

  ${css`
    ${typography.Paragraph6}
  `}
  &::placeholder {
    color: ${colors.N50} !important;
  }
  color: ${colors.N100};
`;
