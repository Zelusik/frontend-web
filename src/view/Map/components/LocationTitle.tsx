import { useRouter } from "next/router";
import useGetCoordToAddress from "@/hooks/queries/map/useGetCoordToAddress";

import { Box, Flex, Text } from "@/components/core";
import { Icon } from "@/components";

interface LocationTitleProps {
  type: "location" | "store";
  length?: number;
}

export const LocationTitle = ({ type, length }: LocationTitleProps) => {
  const router = useRouter();
  const { data: addressData } = useGetCoordToAddress();

  return (
    <Flex h={20} pl={15} pr={15}>
      <Box mr={4}>
        <Icon icon="StoreMarker" width={16} height={16} />
      </Box>
      <Text c="N100" typo="Paragraph5">
        {type === "location"
          ? length && `전체 ${length}곳`
          : addressData
          ? addressData.length !== 0 &&
            `${addressData[0]?.address?.address_name?.split(" ")[0]} ${
              addressData[0]?.address?.address_name?.split(" ")[1]
            }`
          : ``}
      </Text>
    </Flex>
  );
};
