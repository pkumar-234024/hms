import "../../components/dashboard/dashboard.css";

type IconColor = "blue" | "green" | "amber" | "red" | "teal" | "purple";
type TrendType = "up" | "down" | "neutral";

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  trendType?: TrendType;
  iconColor?: IconColor;
  accentColor?: string;
  className?: string;
  animDelay?: number;
}

export const StatCard = ({
  icon,
  label,
  value,
  trend,
  trendType = "neutral",
  iconColor = "blue",
  accentColor,
  className = "",
  animDelay = 0,
}: StatCardProps) => {
  return (
    <div
      className={`stat-card-unified fade-in-up ${className}`}
      style={{
        "--stat-accent": accentColor || undefined,
        animationDelay: animDelay ? `${animDelay}s` : undefined,
      } as React.CSSProperties}
    >
      <div className="stat-card-unified__header">
        <div className={`stat-card-unified__icon stat-card-unified__icon--${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <span className={`stat-card-unified__trend stat-card-unified__trend--${trendType}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="stat-card-unified__label">{label}</p>
        <h3 className="stat-card-unified__value">{value}</h3>
      </div>
    </div>
  );
};
