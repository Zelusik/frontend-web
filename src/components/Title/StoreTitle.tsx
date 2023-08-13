import styled from "@emotion/styled";
import { match } from "ts-pattern";

import Edit from "components/Button/IconButton/Edit";
import Heart from "components/Button/IconButton/Heart";
import Spacing from "components/Spacing";
import Text from "components/Text";

export default function StoreTitle({
  type = "detail",
  title,
  subTitle,
  ...props
}: any) {
  return (
    <TitleWrapper
      height={match(type)
        .with("home", () => 58)
        .with("detail", () => 49)
        .with("map", () => 25)
        .with("mypage-review", () => 39)
        .otherwise(() => 58)}
      padding={match(type)
        .with("home", () => "0 20px")
        .with("detail", () => "0")
        .with("map", () => "0 5px")
        .with("mypage-review", () => "0 10px")
        .otherwise(() => "0")}
      position={type === "home" || type === "mypage-review"}
      bottom={match(type)
        .with("home", () => 56)
        .with("detail", () => 0)
        .with("map", () => 0)
        .with("mypage-review", () => 15)
        .otherwise(() => 0)}
    >
      <Menu onClick={props.onClick} isFlex={type === "map"}>
        {title ? (
          <Text
            typo={match(type)
              .with("home", () => "Headline6")
              .with("detail", () => "Headline6")
              .with("map", () => "Headline4")
              .with("mypage-review", () => "Headline3")
              .otherwise(() => "Headline6")}
            color={match(type)
              .with("home", () => "N0")
              .with("detail", () => "N100")
              .with("map", () => "N100")
              .with("mypage-review", () => "N0")
              .otherwise(() => "N100")}
            style={{ marginRight: 5, marginBottom: type === "map" ? 0 : 4 }}
          >
            {title}
          </Text>
        ) : undefined}
        {subTitle ? (
          <Text
            typo={match(type)
              .with("home", () => "Paragraph1")
              .with("detail", () => "Paragraph3")
              .with("map", () => "Paragraph1")
              .with("mypage-review", () => "Paragraph2")
              .otherwise(() => "Paragraph3")}
            color={match(type)
              .with("home", () => "N0")
              .with("detail", () => "N100")
              .with("map", () => "N60")
              .with("mypage-review", () => "N0")
              .otherwise(() => "N100")}
          >
            {subTitle}
          </Text>
        ) : undefined}
      </Menu>

      {type !== "mypage-review" ? (
        <Menu isFlex={true}>
          {type !== "home" ? (
            <Edit
              size={match(type)
                .with("detail", () => 28)
                .with("map", () => 24)
                .otherwise(() => 28)}
            />
          ) : undefined}
          <HeartWrapper marginLeft={type === "map" ? 16 : 20}>
            <Heart
              size={match(type)
                .with("home", () => 28)
                .with("detail", () => 28)
                .with("map", () => 24)
                .otherwise(() => 28)}
            />
            {type === "home" || type === "mypage-review" ? (
              <>
                <Spacing size={4} />
                <Text typo="Paragraph3" color="N0">
                  999
                </Text>
              </>
            ) : undefined}
          </HeartWrapper>
        </Menu>
      ) : undefined}
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<{
  height: number;
  padding: string;
  bottom: number;
  position: boolean;
}>`
  width: 100%;
  height: ${({ height }) => height + "px"};
  padding: ${({ padding }) => padding};
  display: flex;
  justify-content: space-between;

  position: ${({ position }) => (position ? "absolute" : "static")};
  bottom: ${({ bottom }) => bottom}px;
`;

const Menu = styled.div<{ isFlex?: boolean }>`
  margin: auto 0;

  display: ${({ isFlex }) => (isFlex ? "flex" : "block")};
  align-items: center;
`;

const HeartWrapper = styled.div<{ marginLeft: number }>`
  margin-left: ${({ marginLeft }) => marginLeft}px;
  text-align: center;
`;
