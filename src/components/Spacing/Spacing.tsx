import styled from "@emotion/styled";

// export default function Spacing({ size }: any) {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: `${size}px`,
//         backgroundColor: `transparent`,
//       }}
//     />
//   );
// }

const Spacing = styled.div<{ size: number }>`
  width: 100%;
  height: ${({ size }) => size}px;
  background-color: transparent;
`;

export default Spacing;
