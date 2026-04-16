export default function LegacyFrame({ src, title }) {
  return (
    <iframe
      title={title || "Legacy"}
      src={src}
      style={{
        width: "100%",
        height: "100vh",
        border: 0,
        display: "block",
        background: "#fff"
      }}
    />
  );
}

