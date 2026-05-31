import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { DoctorWelcome } from "./components/DoctorWelcome";
import { DoctorStatsGrid } from "./components/DoctorStatsGrid";
import { ConsultationQueue } from "./components/ConsultationQueue";
import { ErrorBanner } from "../../components/ui/ErrorBanner";
import { DashboardFooter } from "../../components/dashboard/DashboardFooter";
import type { AppointmentDto } from "./types";
import "../../components/dashboard/dashboard.css";
import "./DoctorDashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:57679";

const DoctorDashboard = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth);

  // State variables
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resolution UI states
  const [selectedApptId, setSelectedApptId] = useState<string | null>(null);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [showDeclineForm, setShowDeclineForm] = useState<string | null>(null);

  // Fetch Appointments
  const fetchAppointments = async () => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/appointments?page=1&per_page=50`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error(
            "Access denied. Please re-authenticate as a clinical provider."
          );
        }
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      setAppointments(data.items || []);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setError(
        err instanceof Error ? err.message : "Failed to retrieve appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [accessToken]);

  // Resolve: Approve
  const handleApprove = async (id: string) => {
    if (!accessToken) return;
    setResolvingId(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error(`Failed to approve: HTTP ${res.status}`);
      await fetchAppointments();
      setSelectedApptId(null);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to approve appointment."
      );
    } finally {
      setResolvingId(null);
    }
  };

  // Resolve: Decline
  const handleDecline = async (id: string) => {
    if (!accessToken) return;
    setResolvingId(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/decline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ reason: declineReason.trim() }),
      });
      if (!res.ok) throw new Error(`Failed to decline: HTTP ${res.status}`);
      setDeclineReason("");
      setShowDeclineForm(null);
      setSelectedApptId(null);
      await fetchAppointments();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to decline appointment."
      );
    } finally {
      setResolvingId(null);
    }
  };

  const doctorName = user?.firstName
    ? `Dr. ${user.firstName} ${user.lastName || ""}`.trim()
    : "Dr. Julian Thorne";

  return (
    <div className="doctor-dashboard mesh-bg">
      {/* Decorative glow orbs */}
      <div className="dashboard-glow-orb dashboard-glow-orb--primary" />
      <div className="dashboard-glow-orb dashboard-glow-orb--secondary" />

      {/* Header */}
      <DoctorWelcome
        doctorName={doctorName}
        appointmentCount={appointments.length}
        loading={loading}
        onRefresh={fetchAppointments}
      />

      {/* Error Banner */}
      {error && <ErrorBanner message={error} />}

      {/* Stats Overview */}
      <DoctorStatsGrid appointments={appointments} />

      {/* Consultation Queue */}
      <div className="doctor-dashboard__queue fade-in-up fade-in-up--d3">
        <ConsultationQueue
          appointments={appointments}
          loading={loading}
          selectedApptId={selectedApptId}
          setSelectedApptId={setSelectedApptId}
          resolvingId={resolvingId}
          showDeclineForm={showDeclineForm}
          setShowDeclineForm={setShowDeclineForm}
          declineReason={declineReason}
          setDeclineReason={setDeclineReason}
          handleApprove={handleApprove}
          handleDecline={handleDecline}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default DoctorDashboard;
