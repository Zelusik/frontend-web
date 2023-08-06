import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { match } from "ts-pattern";
import { typography } from "constants/typography";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import { useRef, useState } from "react";
import { Route } from "constants/Route";
import { changeVisible } from "reducer/slices/bottomSheet/mapBottomSheetSlice";
import { useAppDispatch } from "hooks/useReduxHooks";

export default function Input({
  type = "shadow",
  placeholder,
  value,
  setValue,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
    <InputWrapper
      onClick={handleClickInput}
      borderColor={match(type)
        .with("line", () => (focus ? colors.N100 : colors.N50))
        .with("shadow", () => colors.N0)
        .exhaustive()}
      shadow={match(type)
        .with("line", () => false)
        .with("shadow", () => true)
        .exhaustive()}
      borderRadius={match(type)
        .with("line", () => "12px")
        .with("shadow", () => "8px")
        .exhaustive()}
    >
      <InputInner>
        <Icon icon="Search" width={24} height={24} />
        <InputBox
          ref={inputRef}
          placeholder={placeholder}
          disabled={type === "shadow"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            const next = e.relatedTarget;
            if (next !== null) {
              setValue(next.textContent);
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
      </InputInner>
    </InputWrapper>
  );
}

const InputWrapper = styled.div<{
  borderColor: any;
  shadow: any;
  borderRadius: any;
}>`
  width: 100%;
  height: 48px;
  margin: auto;
  padding: 0 12px;

  display: flex;
  position: relative;

  border-radius: ${({ borderRadius }) => borderRadius};
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
  background-color: ${colors.N0};

  ${css`
    ${typography.Paragraph6}
  `}
  &::placeholder {
    color: ${colors.N50} !important;
    ${typography.Paragraph3}
  }
  color: ${colors.N100};
`;
