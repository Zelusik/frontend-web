import styled from "@emotion/styled";
import Icon from "components/Icon";
import { useRef } from "react";

const Description = ({ text = "", typo }: any) => {
  const contentRef = useRef(null);
  const onClick = (e: any) => {
    contentRef.current.classList.add("show");
    e.currentTarget.classList.add("hide");
  };
  return (
    <TextWrapper onClick={onClick}>
      <Ellipsis ref={contentRef}>{text}</Ellipsis>
      <Button>
        <span>...</span>
        <span style={{ height: "100%" }}>
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
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 4; // 원하는 라인수
  -webkit-box-orient: vertical;
  line-height: 170%;

  // position: relative;
  // display: -webkit-box;
  // max-height: 6rem;
  // line-height: 2rem;
  // overflow: hidden;
  // -webkit-line-clamp: 3;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;

const Button = styled.button`
  display: flex;
  // line-height: 170%;

  // background: rgb(255, 255, 255);
  // background: rgb(2, 0, 36);
  // background: linear-gradient(
  //   90deg,
  //   rgba(2, 0, 36, 1) 0%,
  //   rgba(255, 255, 255, 0) 0%,
  //   rgba(255, 255, 255, 1) 18%
  // );
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
