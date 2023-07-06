import DotSvg from "assets/dots_20.svg";

interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Setting() {
  return <DotSvg />;
}
