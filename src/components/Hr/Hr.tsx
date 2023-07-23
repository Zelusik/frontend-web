import MarkSvg from "assets/mark_28.svg";
import { colors } from "constants/colors";
import { styled } from "styled-components";

interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Hr({ height = 1, color = colors.N20 }: any) {
  return <HrWrapper height={height} color={color} />;
}

const HrWrapper = styled.hr<{ height: number; color: any }>`
  height: ${({ height }) => height + "px"};
  margin: 0;
  padding: 0;

  background-color: ${({ color }) => color};
  border: 0;
`;
