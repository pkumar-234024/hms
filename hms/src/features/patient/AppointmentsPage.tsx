import { useState, useEffect } from "react";
import { AppointmentsListView } from "./components/AppointmentsListView";
import type { AppointmentDto } from "./types";

const getApptDateDetails = (dateTimeStr: string) => {
  try {
    const d = new Date(dateTimeStr);
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleDateString([], { month: "short" }).toUpperCase(),
      time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      full: d.toLocaleString(),
    };
  } catch (e) {
    return { day: "12", month: "OCT", time: "10:00 AM", full: "" };
  }
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);

  useEffect(() => {
    const savedApps = localStorage.getItem("mediflow_patient_appointments");
    if (savedApps) {
      try {
        setAppointments(JSON.parse(savedApps));
      } catch (e) {
        console.error("Failed to parse patient appointments:", e);
      }
    }
  }, []);

  return (
    <div className="fade-up">
      <div className="page-header" style={{ marginBottom: "var(--sp-md)" }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
          My Appointments
        </h2>
        <p style={{ color: "var(--on-surface-variant)", fontSize: 14 }}>
          View and manage all your scheduled consultations.
        </p>
      </div>

      <AppointmentsListView
        appointments={appointments}
        getApptDateDetails={getApptDateDetails}
      />
    </div>
  );
};

export default AppointmentsPage;
