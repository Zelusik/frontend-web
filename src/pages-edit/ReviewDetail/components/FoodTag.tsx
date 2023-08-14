import styled from "@emotion/styled";
import Icon from "components/Icon";

export default function FoodTag({ onClick }: any) {
  return (
    <Wrapper>
      <Icon icon="FoodTag" width={24} height={24} onClick={onClick} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
  position: absolute;

  bottom: 21px;
  z-index: 900;
`;
