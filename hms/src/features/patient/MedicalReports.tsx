const MedicalReports = () => {
  return (
    <div className="fade-up">
      <div className="page-header" style={{ marginBottom: "var(--sp-md)" }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
          Lab Reports
        </h2>
        <p style={{ color: "var(--on-surface-variant)", fontSize: 14 }}>
          View and download your diagnostic reports.
        </p>
      </div>

      {/* Under Development Banner */}
      <div
        className="glass-card glass-card--flat"
        style={{
          padding: "60px 32px",
          textAlign: "center",
          borderRadius: "var(--r-xl)",
          border: "1px dashed var(--outline-variant)",
          background: "var(--surface-container-low)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--primary-fixed)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 36, color: "var(--primary)" }}
          >
            construction
          </span>
        </div>

        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--on-surface)",
            margin: "0 0 8px 0",
          }}
        >
          Under Development
        </h3>
        <p
          style={{
            color: "var(--on-surface-variant)",
            fontSize: 14,
            margin: "0 auto",
            maxWidth: 400,
            lineHeight: 1.6,
          }}
        >
          The Lab Reports module is currently being built. You'll soon be able
          to view, download, and manage all your diagnostic reports securely
          from this page.
        </p>

        <div
          style={{
            marginTop: 24,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: "var(--r-lg)",
            background: "var(--surface-container-high)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--outline)",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 16 }}
          >
            info
          </span>
          Expected availability: Coming Soon
        </div>
      </div>
    </div>
  );
};

export default MedicalReports;
