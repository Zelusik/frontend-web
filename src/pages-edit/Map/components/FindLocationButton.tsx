import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { globalValue } from "constants/globalValue";
import Icon from "components/Icon";

export default function FindLocationButton() {
  const router = useRouter();

  const findingLocation = () => {
    alert("Find");
  };

  return (
    <Wrapper onClick={findingLocation}>
      <IconWrapper>
        <Icon icon="FindLocation" />
      </IconWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: ${globalValue.MAX_WIDTH}px;

  display: flex;
  position: fixed;
  bottom: calc(${globalValue.BOTTOM_NAVIGATION_HEIGHT}px + 20px + 30%);
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  padding-top: 11px;

  position: absolute;
  right: 20px;

  border-radius: 50%;
  background-color: ${colors.N0};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
`;
