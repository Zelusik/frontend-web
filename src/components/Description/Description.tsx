import styled from "@emotion/styled";
import Icon from "components/Icon";
import { useRef, useState } from "react";

const Description = ({ text = "", typo }: any) => {
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
      <Ellipsis>
        {toggleEllipsis(text, limit).string}
        {limit !== text.length && <>...</>}
      </Ellipsis>
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

const Ellipsis = styled.div`
  line-height: 170%;

  &.show {
    display: block;
  }
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

// import { css } from "@emotion/react";
// import Icon from "components/Icon";
// import { colors } from "constants/colors";
// import { useRef, useState } from "react";
// import { styled } from "styled-components";

// interface Props {
//   src: any;
//   width?: number | string;
//   height?: number | string;
//   ratio?: number;
//   radius?: number | string;
// }

// export default function Description({ text = "", typo }: any) {
//   const [limit, setLimit] = useState(120);
//   const toggleEllipsis = (str: any, limit: any) => {
//     return {
//       string: str.slice(0, limit),
//       isShowMore: str.length > limit,
//     };
//   };

//   const onClickMore = (str: any) => () => {
//     if (limit === 120) setLimit(str.length);
//     else setLimit(120);
//   };

//   return (
//     <>
//       <TextWrapper>
//         <Text typo={typo}>{text}</Text>
//         {/* <Text onClick={onClickMore(text)} typo={typo}>
//         {toggleEllipsis(text, limit).string}
//       </Text>
//       {toggleEllipsis(text, limit).isShowMore && (
//         <MoreButton onClick={onClickMore(text)}> 더보기</MoreButton>
//       )} */}
//       </TextWrapper>
//       <Icon icon="BottomArrow" width={16} height={16} color={"#000"} />
//     </>
//   );
// }

// const TextWrapper = styled.div`
//   position: relative;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   word-break: break-word;

//   display: -webkit-box;
//   -webkit-line-clamp: 4; // 원하는 라인수
//   -webkit-box-orient: vertical;
// `;

// const Text = styled.span<{ typo: any }>`
//   ${({ typo }) =>
//     typo &&
//     css`
//       ${typo}
//     `}
//   line-height: 170%;
// `;

// const MoreButton = styled.span`
//   color: ${colors.N60};
// `;
