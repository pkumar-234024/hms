import { StatCard } from "../../../components/ui/StatCard";
import type { AppointmentDto } from "../types";
import "../../../components/dashboard/dashboard.css";

interface DoctorStatsGridProps {
  appointments: AppointmentDto[];
}

export const DoctorStatsGrid = ({ appointments }: DoctorStatsGridProps) => {
  const total = appointments.length;
  const pending = appointments.filter((a) => a.status === "Pending").length;
  const approved = appointments.filter((a) => a.status === "Approved").length;
  const declined = appointments.filter((a) => a.status === "Declined").length;

  return (
    <div className="stats-grid-4 fade-in-up fade-in-up--d1">
      <StatCard
        icon="stethoscope"
        label="Total Patients"
        value={total}
        trend={total > 0 ? "Active" : undefined}
        trendType="neutral"
        iconColor="blue"
        accentColor="#003c90"
        animDelay={0.05}
      />
      <StatCard
        icon="pending_actions"
        label="Pending Review"
        value={pending}
        trend={pending > 0 ? `${pending} awaiting` : undefined}
        trendType={pending > 3 ? "down" : "neutral"}
        iconColor="amber"
        accentColor="#d97706"
        animDelay={0.1}
      />
      <StatCard
        icon="task_alt"
        label="Approved"
        value={approved}
        trend={approved > 0 ? "Processed" : undefined}
        trendType="up"
        iconColor="green"
        accentColor="#16a34a"
        animDelay={0.15}
      />
      <StatCard
        icon="do_not_disturb_on"
        label="Declined"
        value={declined}
        iconColor="red"
        accentColor="#dc2626"
        animDelay={0.2}
      />
    </div>
  );
};
