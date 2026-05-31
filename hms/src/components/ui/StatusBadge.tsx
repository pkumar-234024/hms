import "../../components/dashboard/dashboard.css";

type Status = "approved" | "pending" | "declined" | "active";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const normalizeStatus = (status: string): Status => {
  const s = status?.toLowerCase();
  if (s === "approved") return "approved";
  if (s === "declined") return "declined";
  if (s === "active") return "active";
  return "pending";
};

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const normalized = normalizeStatus(status);
  return (
    <span className={`status-badge status-badge--${normalized} ${className}`}>
      {status || "Pending"}
    </span>
  );
};
