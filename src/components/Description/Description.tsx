import { css } from "@emotion/react";
import { colors } from "constants/colors";
import { useRef, useState } from "react";
import { styled } from "styled-components";

interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Description({ text = "", typo }: any) {
  const [limit, setLimit] = useState(120);
  const toggleEllipsis = (str: any, limit: any) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };

  const onClickMore = (str: any) => () => {
    if (limit === 120) setLimit(str.length);
    else setLimit(120);
  };

  return (
    <div style={{ position: "relative" }}>
      <Text onClick={onClickMore(text)} typo={typo}>
        {toggleEllipsis(text, limit).string}
      </Text>
      {toggleEllipsis(text, limit).isShowMore && (
        <MoreButton onClick={onClickMore(text)}> 더보기</MoreButton>
      )}
    </div>
  );
}

const Text = styled.span<{ typo: any }>`
  // color: ${colors.N60};
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
`;

const MoreButton = styled.span`
  color: ${colors.N60};
`;
