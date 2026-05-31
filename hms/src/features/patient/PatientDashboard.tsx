import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import type { AppointmentDto } from "./types";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { PatientStatsGrid } from "./components/PatientStatsGrid";
import { QuickBookingCard } from "./components/QuickBookingCard";
import { RecentAppointments } from "./components/RecentAppointments";
import { HealthTipsCard } from "./components/HealthTipsCard";
import { UpcomingReminder } from "./components/UpcomingReminder";
import { DashboardFooter } from "../../components/dashboard/DashboardFooter";
import "../../components/dashboard/dashboard.css";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const firstName = user?.firstName || "Sarah";
  const navigate = useNavigate();
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

  // Stats
  const totalAppointments = appointments.length;
  const pendingCount = appointments.filter(
    (a) => a.status?.toLowerCase() === "pending"
  ).length;
  const approvedCount = appointments.filter(
    (a) => a.status?.toLowerCase() === "approved"
  ).length;
  const declinedCount = appointments.filter(
    (a) => a.status?.toLowerCase() === "declined"
  ).length;

  return (
    <div className="patient-dashboard mesh-bg">
      {/* Decorative glow orbs */}
      <div className="dashboard-glow-orb dashboard-glow-orb--primary" />
      <div className="dashboard-glow-orb dashboard-glow-orb--secondary" />

      {/* Welcome Banner */}
      <WelcomeBanner
        firstName={firstName}
        onBookAppointment={() => navigate("/book")}
      />

      {/* Stats Grid */}
      <PatientStatsGrid
        total={totalAppointments}
        pending={pendingCount}
        approved={approvedCount}
        declined={declinedCount}
      />

      {/* Upcoming Appointment Reminder */}
      <UpcomingReminder appointments={appointments} />

      {/* Two-column layout: Appointments + Sidebar */}
      <div className="dashboard-grid-2 fade-in-up fade-in-up--d3">
        <div className="patient-dashboard__main-col">
          <RecentAppointments
            appointments={appointments}
            onViewAll={() => navigate("/patient/appointments")}
          />
          <QuickBookingCard onBook={() => navigate("/book")} />
        </div>
        <div className="patient-dashboard__side-col">
          <HealthTipsCard />
        </div>
      </div>

      <DashboardFooter description="Your appointments, reports, pharmacy access, and care-team updates in one protected patient workspace." />
    </div>
  );
};

export default PatientDashboard;
