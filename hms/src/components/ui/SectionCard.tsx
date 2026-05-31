import "../../components/dashboard/dashboard.css";

interface SectionCardProps {
  title?: string;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
  className?: string;
  animDelay?: number;
}

export const SectionCard = ({
  title,
  action,
  onAction,
  children,
  className = "",
  animDelay = 0,
}: SectionCardProps) => {
  return (
    <div
      className={`section-card fade-in-up ${className}`}
      style={{ animationDelay: animDelay ? `${animDelay}s` : undefined }}
    >
      {(title || action) && (
        <div className="section-card__header">
          {title && <h3 className="section-card__title">{title}</h3>}
          {action && onAction && (
            <button className="section-card__action" onClick={onAction}>
              {action}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
