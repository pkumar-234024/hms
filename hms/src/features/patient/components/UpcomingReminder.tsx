import type { AppointmentDto } from "../types";
import "../../../components/dashboard/dashboard.css";

interface UpcomingReminderProps {
  appointments: AppointmentDto[];
}

export const UpcomingReminder = ({ appointments }: UpcomingReminderProps) => {
  // Find the next upcoming approved appointment
  const now = new Date();
  const upcoming = appointments
    .filter((a) => {
      const apptDate = new Date(a.appointmentDateTime);
      return a.status?.toLowerCase() === "approved" && apptDate > now;
    })
    .sort(
      (a, b) =>
        new Date(a.appointmentDateTime).getTime() -
        new Date(b.appointmentDateTime).getTime()
    )[0];

  if (!upcoming) return null;

  const apptDate = new Date(upcoming.appointmentDateTime);
  const dateStr = apptDate.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = apptDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="upcoming-reminder fade-in-up fade-in-up--d4">
      <div className="upcoming-reminder__icon">
        <span className="material-symbols-outlined">event_available</span>
      </div>
      <div>
        <p className="upcoming-reminder__label">Next Appointment</p>
        <p className="upcoming-reminder__text">
          {upcoming.reason || "Consultation"} — {upcoming.doctorName || "Doctor"}
        </p>
        <p className="upcoming-reminder__sub">
          {dateStr} at {timeStr} • {upcoming.hospitalName || "Hospital"}
        </p>
      </div>
    </div>
  );
};
