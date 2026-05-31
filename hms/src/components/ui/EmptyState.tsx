import "../../components/dashboard/dashboard.css";

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  className = "",
}: EmptyStateProps) => {
  return (
    <div className={`empty-state ${className}`}>
      <span className="material-symbols-outlined empty-state__icon">{icon}</span>
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__desc">{description}</p>}
    </div>
  );
};
