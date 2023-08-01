import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Edit from "components/Button/IconButton/Edit";
import Heart from "components/Button/IconButton/Heart";
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
        .exhaustive()}
      padding={match(type)
        .with("primary", () => "0")
        .with("secondary", () => "0 15px")
        .with("tertiary", () => "0 10px")
        .with("default", () => "0 20px")
        .exhaustive()}
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
              <Title
                style={{ display: "flex" }}
                typo={match(type)
                  .with("primary", () => typography.Headline6)
                  .with("secondary", () => typography.Headline4)
                  .with("tertiary", () => typography.Headline3)
                  .with("default", () => typography.Headline6)
                  .exhaustive()}
                color={match(type)
                  .with("primary", () => colors.N100)
                  .with("secondary", () => colors.N100)
                  .with("tertiary", () => colors.N0)
                  .with("default", () => colors.N0)
                  .exhaustive()}
              >
                {title}
                {type === "secondary" && (
                  <SideTitle typo={typography.Paragraph1} color={colors.N60}>
                    {subTitle}
                  </SideTitle>
                )}
              </Title>
            )}
            {type !== "secondary" && subTitle && (
              <SubTitle
                typo={match(type)
                  .with("primary", () => typography.Paragraph3)
                  .with("tertiary", () => typography.Paragraph2)
                  .with("default", () => typography.Paragraph1)
                  .exhaustive()}
                color={match(type)
                  .with("primary", () => colors.N100)
                  .with("tertiary", () => colors.N0)
                  .with("default", () => colors.N0)
                  .exhaustive()}
              >
                {subTitle}
              </SubTitle>
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
                  .exhaustive()}
              />
            )}
            <Heart
              size={match(type)
                .with("primary", () => 28)
                .with("secondary", () => 24)
                .with("default", () => 28)
                .exhaustive()}
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

const Menu = styled.li<{ color?: any }>`
  margin: auto 0;

  display: flex;
  align-items: center;

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

const Title = styled.div<{ typo: any; color: any }>`
  margin-bottom: 4px;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;
const SideTitle = styled.div<{ typo: any; color: any }>`
  margin: auto 0;
  margin-left: 5px;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color}
`;

const SubTitle = styled.div<{ typo: any; color: any }>`
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color}
`;
