import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import Text from "components/Text";

export default function Hashtag({
  type = "primary",
  idx = -1,
  len = -1,
  side = 0,
  text = "_____",
}: any) {
  const router = useRouter();

  return (
    <MenuWrapper
      marginLeft={idx === 0}
      marginRight={idx === len - 1}
      side={side}
      backgroundColor={match(type)
        .with("primary", () => "Orange100")
        .with("secondary", () => "N10")
        .with("default", () => "Orange100")
        .otherwise(() => "Orange100")}
    >
      <Text
        typo={match(type)
          .with("primary", () => "Paragraph4")
          .with("secondary", () => "Paragraph4")
          .with("default", () => "Headline2")
          .otherwise(() => "Paragraph4")}
        color={match(type)
          .with("primary", () => "N100")
          .with("secondary", () => "N100")
          .with("default", () => "Orange500")
          .otherwise(() => "N100")}
        style={{
          height: "100%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          typo={match(type)
            .with("primary", () => "Paragraph4")
            .with("secondary", () => "Paragraph4")
            .with("default", () => "Headline2")
            .otherwise(() => "Paragraph4")}
          color={match(type)
            .with("primary", () => "Orange300")
            .with("secondary", () => "N60")
            .with("default", () => "Orange500")
            .otherwise(() => "Orange300")}
        >
          #&nbsp;
        </Text>
        {text}
      </Text>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div<{
  marginLeft: boolean;
  marginRight: boolean;
  side: number;
  backgroundColor: any;
}>`
  height: 40px;
  margin-left: ${({ marginLeft, side }) => (marginLeft ? `${side}px` : "0")};
  margin-right: ${({ marginRight, side }) =>
    marginRight ? `${side}px` : "6px"};
  padding: 0 12px;
  display: inline-block;
  border-radius: 40px;
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  white-space: nowrap;
`;
