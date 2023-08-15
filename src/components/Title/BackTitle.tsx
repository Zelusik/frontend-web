import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { match } from "ts-pattern";

import { colors } from "constants/colors";
import Icon from "components/Icon";
import Dots from "components/Button/IconButton/Dots";
import Text from "components/Text";

interface Props {
  type:
    | "white-dots-store"
    | "white-dots"
    | "white-dots-mine"
    | "black-dots"
    | "white-left"
    | "black-left-text"
    | "map";
}

export default function BackTitle({
  type = "white-dots",
  text,
  ...props
}: any) {
  const router = useRouter();
  const clickBack = () => {
    router.back();
  };

  return (
    <Wrapper>
      {type !== "black-x-button" ? (
        <Menu
          onClick={clickBack}
          style={
            type === "map"
              ? {
                  width: 44,
                  height: 44,
                  paddingLeft: 10,
                  borderRadius: 12,
                  boxShadow: "0px 3px 18px 0px rgba(0, 0, 0, 0.08)",
                  backgroundColor: colors.N0,
                }
              : {}
          }
        >
          <Icon
            icon="LeftArrow"
            width={24}
            height={24}
            color={match(type)
              .with("white-dots-store", () => "N0")
              .with("white-dots", () => "N0")
              .with("white-dots-mine", () => "N0")
              .with("black-dots", () => "N100")
              .with("white-left", () => "N0")
              .with("black-left-text", () => "N100")
              .with("map", () => "N100")
              .otherwise(() => "N0")}
          />
          <Text typo="Headline5" color="N100" style={{ marginLeft: 6 }}>
            {props.title}
          </Text>
        </Menu>
      ) : (
        <Dummy />
      )}

      {text ? (
        <Text typo="Headline3" color="N100">
          {text}
        </Text>
      ) : (
        <Dummy />
      )}

      {type.split("-")[1] === "dots" ? (
        <Dots
          type={
            type === "white-dots-mine"
              ? "delete-edit"
              : type === "white-dots-review"
              ? "report-store"
              : "share-report"
          }
          color={type.split("-")[0] === "white" ? "N0" : "N80"}
        />
      ) : type === "black-x-button" ? (
        <div onClick={clickBack}>
          <Icon icon="XButton" />
        </div>
      ) : (
        <Dummy />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;

  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const Dummy = styled.div`
  width: 24px;
  height: 24px;
`;
