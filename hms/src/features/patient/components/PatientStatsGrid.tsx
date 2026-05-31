import { StatCard } from "../../../components/ui/StatCard";
import "../../../components/dashboard/dashboard.css";

interface PatientStatsGridProps {
  total: number;
  pending: number;
  approved: number;
  declined: number;
}

export const PatientStatsGrid = ({
  total,
  pending,
  approved,
  declined,
}: PatientStatsGridProps) => {
  return (
    <div className="stats-grid-4 fade-in-up fade-in-up--d1">
      <StatCard
        icon="event"
        label="Total Appointments"
        value={total}
        iconColor="blue"
        accentColor="#003c90"
        animDelay={0.05}
      />
      <StatCard
        icon="schedule"
        label="Pending"
        value={pending}
        iconColor="amber"
        accentColor="#d97706"
        animDelay={0.1}
      />
      <StatCard
        icon="check_circle"
        label="Approved"
        value={approved}
        iconColor="green"
        accentColor="#16a34a"
        animDelay={0.15}
      />
      <StatCard
        icon="cancel"
        label="Declined"
        value={declined}
        iconColor="red"
        accentColor="#dc2626"
        animDelay={0.2}
      />
    </div>
  );
};
