import { useRouter } from "next/router";
import styled from "@emotion/styled";

export default function StoreDetail() {
  const router = useRouter();

  return (
    <>
      <Wrapper>StoreDetail</Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
`;
