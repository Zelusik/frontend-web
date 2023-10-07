import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Flex, Space } from "@mantine/core";
import { match } from "ts-pattern";
import { Text } from "components/core";

import { Route } from "constants/Route";
import { typography } from "constants/typography";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import useSearch from "hooks/useSearch";

const Input = ({
  type = "line",
  placeholder,
  value,
  setValue,
  shadow = false,
}: any) => {
  const router = useRouter();
  const inputRef = useRef<any>(null);
  const { openSearchPlace } = useSearch();
  const [focus, setFocus] = useState<boolean>(false);

  const handleClickInput = (e: any) => {
    if (shadow) router.push(Route.SEARCH_PLACE());
  };

  return (
    <Flex
      h={50}
      bg={colors["N0"]}
      style={{
        width: "100%",
        padding: "0 12px",

        alignItems: "center",
        borderRadius: 8,

        border: shadow ? `` : `1px solid ${colors[focus ? "N100" : "N40"]}`,
        boxShadow: shadow ? `0px 4px 12px 0px rgba(0, 0, 0, .12)` : ``,
      }}
      onClick={handleClickInput}
    >
      <Icon icon="Search" width={24} height={24} />
      <InputBox
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        readOnly={type === "shadow"}
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
        <Box tabIndex={0}>
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
        </Box>
      )}
    </Flex>
  );
};

const InputBox = styled.input`
  width: 100%;
  height: 24px;
  margin: 0 8px;

  border: 0;
  outline: none;
  background-color: ${colors["N0"]};

  ${css`
    ${typography["Paragraph6"]}
  `}
  &::placeholder {
    color: ${colors["N50"]} !important;
  }
  color: ${colors["N100"]};
`;

export default Input;
