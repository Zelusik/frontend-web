import styled from "@emotion/styled";
import Icon from "components/Icon";
import Text from "components/core/Text";
import useAlert from "hooks/useAlert";
import { Button, Flex } from "components/core";

export default function Copy({ text = "" }: any) {
  const { openAlert } = useAlert();
  const clickCopy = async (text: any) => {
    await navigator.clipboard.writeText(text);
    openAlert("copy-text");
  };

  return (
    <Button onClick={() => clickCopy(text)}>
      <Flex>
        <Icon icon="Copy" width={16} height={16} margin="0 2px 0 0" />
        <Text typo="Paragraph1" c="Mint">
          복사
        </Text>
      </Flex>
    </Button>
  );
}
