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
      style={
        type === "default"
          ? {
              padding: "0 20px",
              position: "absolute",
              bottom: 34, // + 28
            }
          : {}
      }
    >
      <MenuList>
        <Menu onClick={onClick}>
          <div>
            {title && (
              <Title
                height={match(type)
                  .with("primary", () => 58)
                  .with("default", () => 49)
                  .exhaustive()}
                typo={match(type)
                  .with("primary", () => typography.Headline5)
                  .with("default", () => typography.Headline6)
                  .exhaustive()}
                color={match(type)
                  .with("primary", () => colors.N100)
                  .with("default", () => colors.N0)
                  .exhaustive()}
              >
                {title}
              </Title>
            )}
            {subtitle && (
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
                .with("default", () => 28)
                .exhaustive()}
            />
          )}
          <Heart
            size={match(type)
              .with("primary", () => 28)
              .with("default", () => 28)
              .exhaustive()}
            margin={"0 0 0 20px"}
          />
        </Menu>
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
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

const Title = styled.div<{ height: any; typo: any; color: any }>`
  height: ${({ height }) => height};
  margin-bottom: 4px;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;

const SubTitle = styled.div<{ typo: any; color: any }>`
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color}
`;
