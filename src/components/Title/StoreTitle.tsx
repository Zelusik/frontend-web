import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Edit from "components/Edit";
import Heart from "components/Heart";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { match } from "ts-pattern";

export default function StoreTitle({
  type = "primary",
  title,
  subtitle,
  onClick,
}: any) {
  return (
    <TitleWrapper
      height={match(type)
        .with("primary", () => 49)
        .with("secondary", () => 25)
        .with("default", () => 58)
        .exhaustive()}
      style={
        type === "default"
          ? {
              padding: "0 20px",
              position: "absolute",
              bottom: 34, // + 28
            }
          : { padding: type === "secondary" ? "0 15px" : "0" }
      }
    >
      <MenuList>
        <Menu onClick={onClick}>
          <div>
            {title && (
              <Title
                style={{ display: "flex" }}
                typo={match(type)
                  .with("primary", () => typography.Headline5)
                  .with("secondary", () => typography.Headline4)
                  .with("default", () => typography.Headline6)
                  .exhaustive()}
                color={match(type)
                  .with("primary", () => colors.N100)
                  .with("secondary", () => colors.N100)
                  .with("default", () => colors.N0)
                  .exhaustive()}
              >
                {title}
                {type === "secondary" && (
                  <SideTitle typo={typography.Paragraph1} color={colors.N60}>
                    {subtitle}
                  </SideTitle>
                )}
              </Title>
            )}
            {type !== "secondary" && subtitle && (
              <SubTitle
                typo={match(type)
                  .with("primary", () => typography.Paragraph1)
                  .with("default", () => typography.Paragraph1)
                  .exhaustive()}
                color={match(type)
                  .with("primary", () => colors.N100)
                  .with("default", () => colors.N0)
                  .exhaustive()}
              >
                {subtitle}
              </SubTitle>
            )}
          </div>
        </Menu>

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
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height + "px"};
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
