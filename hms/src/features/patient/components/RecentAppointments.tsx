import { SectionCard } from "../../../components/ui/SectionCard";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import type { AppointmentDto } from "../types";
import "../../../components/dashboard/dashboard.css";

interface RecentAppointmentsProps {
  appointments: AppointmentDto[];
  onViewAll: () => void;
}

const getApptDateDetails = (dateTimeStr: string) => {
  try {
    const d = new Date(dateTimeStr);
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleDateString([], { month: "short" }).toUpperCase(),
      time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  } catch {
    return { day: "—", month: "—", time: "—" };
  }
};

export const RecentAppointments = ({
  appointments,
  onViewAll,
}: RecentAppointmentsProps) => {
  const recent = appointments.slice(0, 3);

  return (
    <SectionCard
      title="Recent Appointments"
      action="View All"
      onAction={onViewAll}
      animDelay={0.25}
    >
      {recent.length === 0 ? (
        <EmptyState
          icon="event_busy"
          title="No appointments yet"
          description="Book your first appointment to get started."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {recent.map((appt) => {
            const details = getApptDateDetails(appt.appointmentDateTime);
            return (
              <div key={appt.id} className="appt-item">
                {/* Date Badge */}
                <div className="appt-item__date-badge">
                  <div className="appt-item__date-day">{details.day}</div>
                  <div className="appt-item__date-month">{details.month}</div>
                </div>

                {/* Info */}
                <div className="appt-item__info">
                  <p className="appt-item__reason">
                    {appt.reason || "Consultation"}
                  </p>
                  <p className="appt-item__meta">
                    {appt.doctorName || "Doctor"} •{" "}
                    {appt.hospitalName || "Hospital"} • {details.time}
                  </p>
                </div>

                {/* Status Badge */}
                <StatusBadge status={appt.status} />
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
};
