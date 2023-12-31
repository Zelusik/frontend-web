import Text from "components/core/Text";

export default function Number({ currentIndex, length }: any) {
  return (
    <Text
      typo="Paragraph2"
      c="N0"
      style={{
        padding: "4px 11px",
        borderRadius: 25,
        background: "rgba(32, 35, 48, 0.6)",
      }}
    >
      {currentIndex + 1}/{length}
    </Text>
  );
}
