export default function Loading({ show = true }: { show?: boolean }) {
  return (
    <div
      style={{
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 5,
      }}
    >
      <h3>Loading...</h3>
    </div>
  );
}
