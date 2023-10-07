import styled from "@emotion/styled";
import AlertButton from "components/Button/AlertButton";
import RoundButton from "components/Button/RoundButton";
import { Text } from "components/core";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
import { deleteCookie } from "utils/cookie";

export default function Logout() {
  const router = useRouter();
  const { closeAlert } = useAlert();

  const handleClickLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    closeAlert();
    router.push("/").then(() => window.scrollTo(0, 0));
  };

  return (
    <DeleteWrapper>
      <Text typo="Paragraph6" c="N100">
        로그아웃 하시겠습니까?
      </Text>
      <ButtonWrapper>
        <AlertButton type="default" onClick={closeAlert}>
          취소
        </AlertButton>
        <AlertButton type="primary" onClick={handleClickLogout}>
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
