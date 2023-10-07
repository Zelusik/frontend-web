import { useRouter } from "next/router";
import useAlert from "hooks/useAlert";
import { useAppSelector } from "hooks/useReduxHooks";
import { Flex, Text } from "components/core";

import { sortData } from "constants/globalData";
import Icon from "components/Icon";
import { typography } from "constants/typography";

const Sort = () => {
  const { sortId } = useAppSelector((state) => state.alert);
  const { openAlert } = useAlert();

  return (
    <Flex onClick={() => openAlert("sort")}>
      {/* <Center> */}
      <Text mr={4} style={typography["Paragraph3"]}>
        {sortData[sortId - 1].val}
      </Text>
      {/* </Center> */}
      {/* <Center> */}
      <Flex>
        <Icon icon="BottomArrow" width={16} height={16} color="N60" />
      </Flex>
      {/* </Center> */}
    </Flex>
  );
};

export default Sort;
