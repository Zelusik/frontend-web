import styled from "@emotion/styled";
import Icon from "components/Icon";
import Text from "components/core/Text";
import useAlert from "hooks/useAlert";

export default function Copy({ text = "" }: any) {
  const { openAlert } = useAlert();
  const clickCopy = async (text: any) => {
    await navigator.clipboard.writeText(text);
    openAlert("copy-text");
  };

  return (
    <MenuList>
      <Icon
        icon="Copy"
        width={16}
        height={16}
        margin="0 2px 0 0"
        onClick={() => clickCopy(text)}
      />
      <Text typo="Paragraph1" color="Mint">
        복사
      </Text>
    </MenuList>
  );
}

const MenuList = styled.div`
  width: 100%;
  margin: auto 0;

  display: flex;
  align-item: center;
`;
