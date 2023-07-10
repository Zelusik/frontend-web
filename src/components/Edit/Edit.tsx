import EditSvg from "assets/edit_28.svg";

interface Props {
  src: any;
  width?: number | string;
  height?: number | string;
  ratio?: number;
  radius?: number | string;
}

export default function Edit({ margin }: any) {
  return (
    <div style={{ margin: margin }}>
      <EditSvg />
    </div>
  );
}
