import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "components/Icon";
import Text from "components/Text";
import { useRef, useState } from "react";

const Description = ({ text = "" }: any) => {
  const contentRef = useRef(null);
  const onClick = (e: any) => {
    contentRef.current.classList.add("hide");
    setLimit(text.length);
  };

  const [limit, setLimit] = useState(120);
  const toggleEllipsis = (str: any, limit: any) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };

  return (
    <TextWrapper onClick={onClick}>
      <Text typo="Paragraph2" color="N100">
        {toggleEllipsis(text, limit).string}
        {limit !== text.length && <>...</>}
      </Text>
      <Button ref={contentRef}>
        <span>
          <Icon icon="BottomArrow" width={16} height={16} />
        </span>
      </Button>
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  height: 20%;
  display: flex;
  line-height: 170%;

  position: absolute;
  bottom: 0;
  right: 0;

  background: rgb(255, 255, 255);
  &.hide {
    display: none;
  }
`;

export default Description;
