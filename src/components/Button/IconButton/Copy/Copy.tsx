import { Icon } from "@/components";
import { Text } from "@/components/core";
import { useAlert } from "@/hooks";
import { Button, Flex } from "@/components/core";

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
