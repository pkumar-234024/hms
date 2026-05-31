import "../../../components/dashboard/dashboard.css";

interface AdminStatCardProps {
  icon: string;
  value: string;
  label: string;
  trend: string;
  trendColor: "secondary" | "error" | "on-surface-variant";
  iconColor: "blue" | "green" | "amber" | "red" | "teal" | "purple";
}

export const StatCard = ({
  icon,
  value,
  label,
  trend,
  trendColor,
  iconColor,
}: AdminStatCardProps) => {
  const trendTypeMap = {
    secondary: "up" as const,
    error: "down" as const,
    "on-surface-variant": "neutral" as const,
  };

  return (
    <div
      className="stat-card-unified"
      style={{ "--stat-accent": iconColor === "red" ? "#dc2626" : "#003c90" } as React.CSSProperties}
    >
      <div className="stat-card-unified__header">
        <div className={`stat-card-unified__icon stat-card-unified__icon--${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span
          className={`stat-card-unified__trend stat-card-unified__trend--${trendTypeMap[trendColor]}`}
        >
          {trend}
        </span>
      </div>
      <div>
        <p className="stat-card-unified__label">{label}</p>
        <h3 className="stat-card-unified__value">{value}</h3>
      </div>
    </div>
  );
};
