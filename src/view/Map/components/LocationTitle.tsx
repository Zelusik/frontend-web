import { useRouter } from "next/router";
import { Box, Flex, Text } from "components/core";
import Icon from "components/Icon";
import useGetCoordToAddress from "hooks/queries/map/useGetCoordToAddress";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

interface LocationTitleProps {
  type: "location" | "store";
  length?: number;
}

const LocationTitle = ({ type, length }: LocationTitleProps) => {
  const router = useRouter();
  const { data: addressData } = useGetCoordToAddress();

  return (
    <Flex h={20} pl={15} pr={15}>
      {/* <Center> */}
      <Box mr={4}>
        <Icon icon="StoreMarker" width={16} height={16} />
      </Box>
      {/* </Center> */}
      {/* <Center> */}
      <Text c="N100" style="Paragraph5">
        {type === "location"
          ? length && `전체 ${length}곳`
          : addressData
          ? addressData.length !== 0 &&
            `${addressData[0]?.address?.address_name?.split(" ")[0]} ${
              addressData[0]?.address?.address_name?.split(" ")[1]
            }`
          : ``}
      </Text>
      {/* </Center> */}
    </Flex>
  );
};

export default LocationTitle;
