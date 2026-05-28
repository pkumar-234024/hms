interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  trend: string;
  trendColor: "secondary" | "error" | "on-surface-variant";
  iconBg: string;
  iconColor: string;
}

export const StatCard = ({
  icon,
  value,
  label,
  trend,
  trendColor,
  iconBg,
  iconColor,
}: StatCardProps) => {
  const trendColorClass =
    trendColor === "secondary"
      ? "text-secondary"
      : trendColor === "error"
        ? "text-error"
        : "text-on-surface-variant";
  return (
    <div className="bg-surface-container-lowest p-md rounded-xl custom-shadow border border-outline-variant/10 flex flex-col justify-between transition-all hover:border-primary/30 hover:scale-[1.02] duration-300">
      <div className="flex justify-between items-start mb-sm">
        <div
          className={`p-2 ${iconBg} rounded-lg ${iconColor} flex items-center justify-center`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`font-label-md text-label-md ${trendColorClass}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
          {label}
        </p>
        <h3 className="font-display-lg text-display-lg text-on-surface mt-xs leading-none">
          {value}
        </h3>
      </div>
    </div>
  );
};
