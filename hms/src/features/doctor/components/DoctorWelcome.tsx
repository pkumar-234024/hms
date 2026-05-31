import { Calendar } from "lucide-react";
import "../../../components/dashboard/dashboard.css";

interface DoctorWelcomeProps {
  doctorName: string;
  appointmentCount: number;
  loading: boolean;
  onRefresh: () => void;
}

export const DoctorWelcome = ({
  doctorName,
  appointmentCount,
  loading,
  onRefresh,
}: DoctorWelcomeProps) => {
  const today = new Date().toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="doctor-welcome fade-in-up">
      <div>
        <h2 className="doctor-welcome__title">Doctor's Dashboard</h2>
        <p className="doctor-welcome__subtitle">
          Welcome back, {doctorName}. You have{" "}
          <strong>{appointmentCount || 0}</strong> appointments today.
        </p>
      </div>
      <div className="doctor-welcome__actions">
        <span className="doctor-welcome__date">
          <Calendar size={16} />
          {today}
        </span>
        <button
          className="doctor-welcome__refresh"
          onClick={onRefresh}
          disabled={loading}
          title={loading ? "Synchronizing..." : "Refresh Records"}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 20,
              animation: loading ? "spin 0.7s linear infinite" : undefined,
            }}
          >
            {loading ? "sync" : "refresh"}
          </span>
        </button>
      </div>
    </header>
  );
};
