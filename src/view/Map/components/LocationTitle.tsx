import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import Text from "components/Text";
import useGetCoordToAddress from "hooks/queries/map/useGetCoordToAddress";

export default function LocationTitle({ type, data }: any) {
  const router = useRouter();
  const { data: addressData } = useGetCoordToAddress();

  return (
    <Wrapper>
      <Menu style={{ marginRight: 4 }}>
        <Icon icon="StoreMarker" width={16} height={16} />
      </Menu>
      <Text typo="Paragraph5" color="N100">
        {type === "location"
          ? data && `전체 ${data}곳`
          : addressData
          ? addressData.length !== 0 &&
            `${addressData[0]?.address.address_name.split(" ")[0]} ${
              addressData[0]?.address.address_name.split(" ")[1]
            }`
          : ``}
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 20px;
  padding: 0 15px;
  display: flex;
`;

const Menu = styled.div`
  margin: auto 0;
  display: flex;
`;
