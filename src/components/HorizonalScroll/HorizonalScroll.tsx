import styled from "@emotion/styled";

const HorizonalScroll = styled.div<{
  HorPadding?: number;
  gap?: number;
}>`
  padding: 0 ${({ HorPadding }) => HorPadding}px;
  gap: ${({ gap }) => gap}px;

  display: flex;
  white-space: nowrap;
  overflow-x: auto;
`;

export default HorizonalScroll;
