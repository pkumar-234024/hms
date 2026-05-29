import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import type { AppointmentDto } from "./types";
import { DashboardFooter } from "../../components/dashboard/DashboardFooter";
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
    (a) => a.status?.toLowerCase() === "pending",
  ).length;
  const approvedCount = appointments.filter(
    (a) => a.status?.toLowerCase() === "approved",
  ).length;
  const declinedCount = appointments.filter(
    (a) => a.status?.toLowerCase() === "declined",
  ).length;

  const getApptDateDetails = (dateTimeStr: string) => {
    try {
      const d = new Date(dateTimeStr);
      return {
        day: d.getDate().toString().padStart(2, "0"),
        month: d.toLocaleDateString([], { month: "short" }).toUpperCase(),
        time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        full: d.toLocaleDateString([], {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    } catch {
      return { day: "—", month: "—", time: "—", full: "—" };
    }
  };

  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "approved")
      return {
        bg: "rgba(34,197,94,.12)",
        color: "#16a34a",
        border: "1px solid rgba(34,197,94,.25)",
      };
    if (s === "declined")
      return {
        bg: "rgba(239,68,68,.12)",
        color: "#dc2626",
        border: "1px solid rgba(239,68,68,.25)",
      };
    return {
      bg: "rgba(245,158,11,.12)",
      color: "#d97706",
      border: "1px solid rgba(245,158,11,.25)",
    };
  };

  // Show only the 3 most recent appointments on overview
  const recentAppointments = appointments.slice(0, 3);

  return (
    <div className="patient-dashboard">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none -z-10 animate-pulse-soft"></div>

      {/* Welcome Banner */}
      <div className="patient-dashboard__welcome flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B1C30] tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Here is what's happening with your clinical profile today.
          </p>
        </div>
        <button
          onClick={() => navigate("/book")}
          className="bg-[#003c90] hover:bg-[#0b57d0] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-900/10 cursor-pointer"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "18px" }}
          >
            add
          </span>
          Book Appointment
        </button>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Total Appointments",
            value: totalAppointments,
            icon: "event",
            color: "#003c90",
            bg: "#eff4ff",
          },
          {
            label: "Pending",
            value: pendingCount,
            icon: "schedule",
            color: "#d97706",
            bg: "#fffbeb",
          },
          {
            label: "Approved",
            value: approvedCount,
            icon: "check_circle",
            color: "#16a34a",
            bg: "#f0fdf4",
          },
          {
            label: "Declined",
            value: declinedCount,
            icon: "cancel",
            color: "#dc2626",
            bg: "#fef2f2",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "20px 18px",
              border: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 1px 3px rgba(0,0,0,.04)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: stat.color,
                flexShrink: 0,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 22 }}
              >
                {stat.icon}
              </span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#0B1C30",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #f1f5f9",
          padding: "20px 24px",
          marginBottom: 24,
          boxShadow: "0 1px 3px rgba(0,0,0,.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#0B1C30",
              margin: 0,
            }}
          >
            Recent Appointments
          </h3>
          <button
            onClick={() => navigate("/patient/appointments")}
            style={{
              background: "none",
              border: "none",
              color: "#003c90",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            View All
          </button>
        </div>

        {recentAppointments.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "32px 16px",
              color: "#94a3b8",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 40, display: "block", marginBottom: 8 }}
            >
              event_busy
            </span>
            <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
              No appointments yet
            </p>
            <p style={{ fontSize: 12, margin: "4px 0 0" }}>
              Book your first appointment to get started.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentAppointments.map((appt) => {
              const details = getApptDateDetails(appt.appointmentDateTime);
              const statusStyle = getStatusStyle(appt.status);
              return (
                <div
                  key={appt.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    background: "#f8fafc",
                    borderRadius: 12,
                    border: "1px solid #f1f5f9",
                  }}
                >
                  {/* Date Badge */}
                  <div
                    style={{
                      width: 48,
                      minWidth: 48,
                      textAlign: "center",
                      padding: "6px 0",
                      borderRadius: 10,
                      background: "#eff4ff",
                      border: "1px solid #dbeafe",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#003c90",
                        lineHeight: 1,
                      }}
                    >
                      {details.day}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#64748b",
                        letterSpacing: "0.05em",
                        marginTop: 2,
                      }}
                    >
                      {details.month}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0B1C30",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {appt.reason || "Consultation"}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        fontWeight: 600,
                        marginTop: 2,
                      }}
                    >
                      {appt.doctorName || "Doctor"} •{" "}
                      {appt.hospitalName || "Hospital"} • {details.time}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      border: statusStyle.border,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {appt.status || "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <DashboardFooter description="Your appointments, reports, pharmacy access, and care-team updates in one protected patient workspace." />
    </div>
  );
};

export default PatientDashboard;
