import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { match } from "ts-pattern";

import { colors } from "constants/colors";
import Icon from "components/Icon";
import Dots from "components/Button/IconButton/Dots";
import Text from "components/Text";

export default function BackTitle({
  type = "white-setting",
  style,
  text,
  ...props
}: any) {
  const router = useRouter();
  const clickBack = () => {
    router.back();
  };

  return (
    <TitleWrapper styles={style}>
      {type !== "black-x-button" ? (
        <TitleInner
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
            icon="Arrow"
            width={24}
            height={24}
            color={match(type)
              .with("white-setting", () => "N0")
              .with("white", () => "N0")
              .with("black-left-text", () => "N100")
              .with("map", () => "N100")
              .exhaustive()}
          />
          <Text typo="Headline5" color="N100" style={{ marginLeft: 6 }}>
            {props.titleText}
          </Text>
        </TitleInner>
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
      {type === "white-setting" ? (
        <Dots size={24} color="N0" />
      ) : type === "black-x-button" ? (
        <div onClick={clickBack}>
          <Icon icon="XButton" />
        </div>
      ) : (
        <Dummy />
      )}
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<{ styles: any }>`
  width: 100%;
  height: 50px;

  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const TitleInner = styled.div`
  display: flex;
  align-items: center;
`;

const Dummy = styled.div`
  width: 24px;
  height: 24px;
`;
