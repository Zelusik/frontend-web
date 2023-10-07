import Text from "components/core/Text";

export default function ImageHashtag({ text, top, left }: any) {
  return (
    <Text
      typo="Paragraph1"
      color="N0"
      style={{
        padding: "6px 10px",

        position: "absolute",
        top: top + "%",
        left: left + "%",

        borderRadius: 8,
        background: "rgba(32, 35, 48, 0.60)",
        zIndex: 900,
      }}
    >
      {text}
    </Text>
  );
}
