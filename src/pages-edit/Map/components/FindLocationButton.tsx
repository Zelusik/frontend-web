import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import Icon from "components/Icon";

export default function FindLocationButton() {
  const router = useRouter();

  const findingLocation = () => {
    alert("Find");
  };

  return (
    <ButtonpWrapper onClick={findingLocation}>
      <IconWrapper>
        <Icon icon="FindLocation" />
      </IconWrapper>
    </ButtonpWrapper>
  );
}

const fade = (visible: boolean) => keyframes`
  from {
    opacity: ${visible && 0};
  }
  to {
    opacity: ${visible && 1};
  }
`;

const ButtonpWrapper = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  position: absolute;
  right: 20px;
  bottom: calc(${globalValue.BOTTOM_NAVIGATION_HEIGHT}px + 20px + 24%);

  border-radius: 50%;
  background-color: ${colors.N0};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
`;

const IconWrapper = styled.div`
  margin: auto;
`;
