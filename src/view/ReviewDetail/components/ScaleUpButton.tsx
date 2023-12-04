import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { colors } from "constants/colors";
import { Route } from "constants/Route";
import Icon from "components/Icon";
import Text from "components/core/Text";
import { Box, Flex } from "components/core";

export default function ScaleUpButton({ lat, lng, myLat, myLng }: any) {
  const router = useRouter();

  const handleClickScaleUp = () => {
    router.push({
      pathname: Route.MAP_DETAIL(),
      query: {
        lat: Number(lat),
        lng: Number(lng),
        myLat: Number(myLat),
        myLng: Number(myLng),
      },
    });
  };

  return (
    <Flex
      h={33}
      ph={8}
      pos="absolute"
      top={15}
      right={15}
      align="center"
      bg="N0"
      radius={6}
      shadow="0px 0px 8px 0px rgba(0, 0, 0, 0.06)"
      zIndex={899}
      onClick={handleClickScaleUp}
    >
      <Text mr={4} typo="Heading2" c="N100">
        크게 보기
      </Text>
      <Icon icon="ScaleUp" />
    </Flex>
  );
}
