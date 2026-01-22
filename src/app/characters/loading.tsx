export default function Loading() {
  return (
    <div className="loading">
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid var(--border)",
            borderTop: "4px solid var(--primary)",
            borderRadius: "50%",
            margin: "0 auto 1rem",
            animation: "spin 1s linear infinite",
          }}
        />
        <p>Cargando personajes...</p>
      </div>
    </div>
  );
}
