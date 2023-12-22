import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Space } from "@/components/core";
import { Icon } from "@/components";

import { colors } from "@/constants/colors";
import { globalValue } from "@/constants/globalValue";
import { typography } from "@/constants/typography";
import { useState } from "react";

const Type: any = {
  primary: [
    {
      icon: "Share",
      text: "공유하기",
      onClick: () => {
        alert("공유하기");
      },
    },
    {
      icon: "Report",
      text: "신고하기",
      onClick: () => {
        alert("신고하기");
      },
    },
  ],
  secondary: [
    {
      icon: "Share",
      text: "공유하기",
      onClick: () => {
        alert("공유하기");
      },
    },
    {
      icon: "Report",
      text: "신고하기",
      onClick: () => {
        alert("신고하기");
      },
    },
    {
      icon: "Report",
      text: "신고하기",
      onClick: () => {
        alert("신고하기");
      },
    },
  ],
};

export default function Setting2({ type, visible }: any) {
  const [testVisible, setTestVisible] = useState(visible);
  const backgroundClick = () => {
    setTestVisible(false);
    alert("background");
  };

  return (
    <Wrapper>
      <Background visible={testVisible} onClick={backgroundClick} />

      <BottomSheetWrapper
        visible={testVisible}
        bottom={-(20 + Type[type].length * 46 + 34)}
      >
        <HandleWrapper>
          <Handle />
        </HandleWrapper>

        <ButtonWrapper>
          {Type[type].map((data: any, idx: number) => {
            return (
              <div key={idx} onClick={data.onClick}>
                <Box>
                  <Icon icon={data.icon} width={20} height={20} />
                  <Text typo={typography.Headline2}>{data.text}</Text>
                </Box>
                <Space h={6} />
              </div>
            );
          })}
        </ButtonWrapper>
        <Space h={34} />
      </BottomSheetWrapper>
    </Wrapper>
  );
}

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible ? 0 : 0.7};
  }
  to {
    opacity: ${visible ? 0.7 : 0};
  }
`;

const moveBottom = (visible: boolean, bottom: number) => keyframes`
  from {
    bottom:  ${visible ? bottom + `px` : 0};
  }
  to {
    bottom:  ${visible ? 0 : bottom + `px`};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  z-index: 999;
`;

const Background = styled.div<{ visible: boolean }>`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;
  height: 100%;

  opacity: 0;
  background-color: ${colors.Shadow};
  animation: ${(props) => fade(props.visible)} 0.3s forwards;
`;

const BottomSheetWrapper = styled.div<{ visible: boolean; bottom: number }>`
  width: 100%;
  position: absolute;

  border-radius: 16px 16px 0 0;
  background-color: ${colors.N0};
  animation: ${(props) => moveBottom(props.visible, props.bottom)} 0.3s forwards;
`;

const HandleWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
`;
const Handle = styled.div`
  width: 36px;
  height: 4px;
  margin: auto;

  border-radius: 2px;
  background-color: ${colors.N40};
`;

const ButtonWrapper = styled.div`
  padding: 0 20px;
`;
const Box = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
`;
const Text = styled.div<{ typo: any }>`
  margin-left: 6px;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
`;
