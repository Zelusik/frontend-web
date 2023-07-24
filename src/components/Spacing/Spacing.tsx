import { colors } from "constants/colors";

export default function Spacing({ size }: any) {
  return (
    <div
      style={{
        width: "100%",
        height: `${size}px`,
        backgroundColor: `transparent`,
      }}
    />
  );
}
