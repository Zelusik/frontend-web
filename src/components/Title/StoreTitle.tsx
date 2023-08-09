import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Edit from "components/Button/IconButton/Edit";
import Heart from "components/Button/IconButton/Heart";
import Text from "components/Text";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { match } from "ts-pattern";

export default function StoreTitle({
  type = "primary",
  title,
  subTitle,
  onClick,
  ...props
}: any) {
  return (
    <TitleWrapper
      height={match(type)
        .with("primary", () => 49)
        .with("secondary", () => 25)
        .with("tertiary", () => 39)
        .with("default", () => 58)
        .otherwise(() => 49)}
      padding={match(type)
        .with("primary", () => "0")
        .with("secondary", () => "0 15px")
        .with("tertiary", () => "0 10px")
        .with("default", () => "0 20px")
        .otherwise(() => "0")}
      style={
        type === "tertiary" || type === "default"
          ? {
              position: "absolute",
              bottom: type === "tertiary" ? 15 : 30,
            }
          : {}
      }
    >
      <MenuList>
        <Menu onClick={onClick}>
          <div>
            {title && (
              <Text
                style={{ display: "flex" }}
                typo={match(type)
                  .with("primary", () => "Headline6")
                  .with("secondary", () => "Headline4")
                  .with("tertiary", () => "Headline3")
                  .with("default", () => "Headline6")
                  .otherwise(() => "Headline6")}
                color={match(type)
                  .with("primary", () => "N100")
                  .with("secondary", () => "N100")
                  .with("tertiary", () => "N0")
                  .with("default", () => "N0")
                  .otherwise(() => "N100")}
              >
                {title}
                {type === "secondary" && (
                  <Text typo="Paragraph1" color="N60">
                    {subTitle}
                  </Text>
                )}
              </Text>
            )}
            {type !== "secondary" && subTitle && (
              <Text
                typo={match(type)
                  .with("primary", () => "Paragraph3")
                  .with("tertiary", () => "Paragraph2")
                  .with("default", () => "Paragraph1")
                  .otherwise(() => "Paragraph3")}
                color={match(type)
                  .with("primary", () => "N100")
                  .with("tertiary", () => "N0")
                  .with("default", () => "N0")
                  .otherwise(() => "N100")}
              >
                {subTitle}
              </Text>
            )}
          </div>
        </Menu>

        {type !== "tertiary" ? (
          <Menu>
            {type !== "default" && (
              <Edit
                size={match(type)
                  .with("primary", () => 28)
                  .with("secondary", () => 24)
                  .with("default", () => 28)
                  .otherwise()}
              />
            )}
            <Heart
              size={match(type)
                .with("primary", () => 28)
                .with("secondary", () => 24)
                .with("default", () => 28)
                .otherwise()}
              margin={"0 0 0 20px"}
            />
          </Menu>
        ) : null}
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<{ height: number; padding: string }>`
  width: 100%;
  height: ${({ height }) => height + "px"};
  padding: ${({ padding }) => padding};
  display: flex;
`;

const MenuList = styled.ul`
  width: 100%;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
`;

const Menu = styled.li`
  margin: auto 0;

  display: flex;
  align-items: center;
`;
