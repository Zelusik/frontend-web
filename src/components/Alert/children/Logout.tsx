import styled from "@emotion/styled";
import AlertButton from "components/Button/AlertButton";
import RoundButton from "components/Button/RoundButton";
import Text from "components/Text";
import useAlert from "hooks/useAlert";

export default function Logout() {
  const { closeAlert } = useAlert();
  return (
    <DeleteWrapper>
      <Text typo="Paragraph6" color="N100">
        로그아웃 하시겠습니까?
      </Text>
      <ButtonWrapper>
        <AlertButton type="default" onClick={closeAlert}>
          취소
        </AlertButton>
        <AlertButton type="primary" onClick={closeAlert}>
          로그아웃
        </AlertButton>
      </ButtonWrapper>
    </DeleteWrapper>
  );
}

const DeleteWrapper = styled.div`
  padding: 10px 0 2px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  gap: 8px;
`;
