import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Edit from "components/Button/IconButton/Edit";
import Heart from "components/Button/IconButton/Heart";
import Spacing from "components/Spacing";
import Text from "components/Text";
import { match } from "ts-pattern";

export default function StoreTitle({
  type = "detail",
  title,
  subTitle,
  onClick,
  ...props
}: any) {
  return (
    <TitleWrapper
      height={match(type)
        .with("home", () => 58)
        .with("detail", () => 49)
        .with("map", () => 25)
        .with("mypage-list", () => 39)
        .otherwise(() => 58)}
      padding={match(type)
        .with("home", () => "0 20px")
        .with("detail", () => "0")
        .with("map", () => "0 5px")
        .with("mypage-list", () => "0 10px")
        .otherwise(() => "0")}
      position={type === "home" || type === "mypage-list"}
      bottom={match(type)
        .with("home", () => 30)
        .with("detail", () => 0)
        .with("map", () => 0)
        .with("mypage-list", () => 15)
        .otherwise(() => 0)}
    >
      <MenuList>
        <Menu onClick={onClick}>
          <div>
            {title ? (
              <Text
                typo={match(type)
                  .with("home", () => "Headline6")
                  .with("detail", () => "Headline6")
                  .with("map", () => "Headline4")
                  .with("mypage-list", () => "Headline3")
                  .otherwise(() => "Headline6")}
                color={match(type)
                  .with("home", () => "N0")
                  .with("detail", () => "N100")
                  .with("map", () => "N100")
                  .with("mypage-list", () => "N0")
                  .otherwise(() => "N100")}
                style={{ display: "flex" }}
              >
                {title}
                {type === "map" ? (
                  <Text
                    typo="Paragraph1"
                    color="N60"
                    style={{
                      margin: "auto",
                      marginLeft: 5,
                    }}
                  >
                    {subTitle}
                  </Text>
                ) : null}
              </Text>
            ) : null}
            {type !== "map" && subTitle ? (
              <Text
                typo={match(type)
                  .with("home", () => "Paragraph1")
                  .with("detail", () => "Paragraph3")
                  .with("mypage-list", () => "Paragraph2")
                  .otherwise(() => "Paragraph3")}
                color={match(type)
                  .with("home", () => "N0")
                  .with("detail", () => "N100")
                  .with("mypage-list", () => "N0")
                  .otherwise(() => "N100")}
              >
                {subTitle}
              </Text>
            ) : null}
          </div>
        </Menu>

        {type !== "mypage-list" ? (
          <Menu>
            {type !== "home" ? (
              <Edit
                size={match(type)
                  .with("home", () => 28)
                  .with("detail", () => 28)
                  .with("map", () => 24)
                  .otherwise(() => 28)}
              />
            ) : null}
            <div
              style={{
                marginLeft: type === "map" ? 16 : 20,
                textAlign: "center",
              }}
            >
              <Heart
                size={match(type)
                  .with("home", () => 28)
                  .with("detail", () => 28)
                  .with("map", () => 24)
                  .otherwise(() => 28)}
              />
              <Spacing size={4} />
              {type === "home" ? (
                <Text typo="Paragraph3" color="N0">
                  999
                </Text>
              ) : null}
            </div>
          </Menu>
        ) : null}
      </MenuList>
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

  position: ${({ position }) => (position ? "absolute" : "static")};
  bottom: ${({ bottom }) => bottom}px;
`;

const MenuList = styled.div`
  width: 100%;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  margin: auto 0;

  display: flex;
  align-items: center;
`;
