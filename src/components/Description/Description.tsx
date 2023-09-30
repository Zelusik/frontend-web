import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { typography } from "constants/typo";
import Icon from "components/Icon";

const Description = ({ text = "" }: any) => {
  const contentRef = useRef<any>(null);
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
      <Ellipsis typo="Paragraph2">
        {toggleEllipsis(text, limit).string}
        {limit !== text.length && text.length > 120 ? <>...</> : undefined}
      </Ellipsis>
      {text.length > 120 ? (
        <Button ref={contentRef}>
          <span>
            <Icon icon="BottomArrow" width={16} height={16} />
          </span>
        </Button>
      ) : undefined}
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  position: relative;
`;

const Ellipsis = styled.div<{ typo: any }>`
  line-height: 170%;

  &.show {
    display: block;
  }

  ${({ typo }) =>
    css`
      ${typography[typo]}
    `}
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
