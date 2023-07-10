import MarkSvg from "assets/mark_28.svg";
import { styled } from "styled-components";

interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Hr({ height, color }: any) {
  return <HrWrapper height={height} color={color} />;
}

const HrWrapper = styled.hr<{ height: number; color: any }>`
  height: ${({ height }) => height + "px"};
  background-color: ${({ color }) => color};
  border: 0;
`;
