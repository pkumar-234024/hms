import { useState, useEffect } from "react";

interface DoctorRecord {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  hospitalId: string;
}

interface AppointmentDto {
  id: string;
  hospitalId: string;
  hospitalName: string;
  patientName: string;
  patientEmail: string;
  patientPhoneNumber: string;
  doctorUserId: string;
  doctorName: string;
  appointmentDateTime: string;
  reason: string;
  status: string;
  reviewedByUserId: string | null;
  reviewedAt: string | null;
  decisionNote: string | null;
  createdAt: string;
  updatedAt: string | null;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:57679";
const STATIC_HOSPITAL_ID = "11111111-1111-1111-1111-111111111111";

const BookAppointment = () => {
  // Data
  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);

  // Loading & Error
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [selectedDoctorUserId, setSelectedDoctorUserId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [reason, setReason] = useState("");

  // Success
  const [receipt, setReceipt] = useState<AppointmentDto | null>(null);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/doctors`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data: DoctorRecord[] = await res.json();
        // Filter to only doctors in the static hospital
        const filtered = data.filter(
          (d) => d.hospitalId === STATIC_HOSPITAL_ID,
        );
        setDoctors(filtered);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError(
          "Could not connect to the backend server. Please verify the API is running and the SSL certificate is accepted.",
        );
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  const activeDoctor = doctors.find((d) => d.userId === selectedDoctorUserId);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedDoctorUserId ||
      !patientName ||
      !patientEmail ||
      !patientPhoneNumber ||
      !appointmentDateTime ||
      !reason
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        hospitalId: STATIC_HOSPITAL_ID,
        patientName,
        patientEmail,
        patientPhoneNumber,
        doctorUserId: selectedDoctorUserId,
        appointmentDateTime: new Date(appointmentDateTime).toISOString(),
        reason,
      };

      const res = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Booking failed with status ${res.status}`,
        );
      }

      const newAppointment: AppointmentDto = await res.json();

      // Persist locally for dashboard
      const savedApps = localStorage.getItem("mediflow_patient_appointments");
      const appList = savedApps ? JSON.parse(savedApps) : [];
      appList.unshift(newAppointment);
      localStorage.setItem(
        "mediflow_patient_appointments",
        JSON.stringify(appList),
      );

      setReceipt(newAppointment);
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during booking. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedDoctorUserId("");
    setPatientName("");
    setPatientEmail("");
    setPatientPhoneNumber("");
    setAppointmentDateTime("");
    setReason("");
    setReceipt(null);
    setError(null);
  };

  // ── SUCCESS VIEW ──
  if (receipt) {
    return (
      <div
        className="fade-up"
        style={{ textAlign: "center", padding: "var(--sp-sm) 0" }}
      >
        <div
          style={{
            display: "inline-flex",
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: "rgba(109,245,225,.2)",
            color: "var(--secondary)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "var(--sp-md)",
            border: "2px solid var(--secondary)",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 36 }}>
            verified
          </span>
        </div>

        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--on-surface)",
            margin: "0 0 8px 0",
          }}
        >
          Appointment Booked!
        </h2>
        <p
          style={{
            color: "var(--on-surface-variant)",
            fontSize: 15,
            margin: "0 0 var(--sp-lg) 0",
          }}
        >
          Your consultation request has been submitted and is pending doctor
          review.
        </p>

        {/* Receipt Card */}
        <div
          className="glass-card medical-glow"
          style={{
            padding: "var(--sp-md)",
            borderRadius: "var(--r-xl)",
            textAlign: "left",
            background: "var(--surface-container-high)",
            border: "1px solid var(--primary-fixed-dim)",
            margin: "0 auto var(--sp-xl) auto",
            maxWidth: 460,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--surface-container-highest)",
              paddingBottom: "var(--sp-sm)",
              marginBottom: "var(--sp-md)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--outline)",
                }}
              >
                BOOKING REFERENCE
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--primary)",
                  fontFamily: "monospace",
                  marginTop: 2,
                }}
              >
                {receipt.id.substring(0, 8).toUpperCase()}
              </div>
            </div>
            <span
              className="badge badge--pending"
              style={{ height: "fit-content" }}
            >
              {receipt.status?.toUpperCase() || "PENDING"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--sp-sm)",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--outline)",
                }}
              >
                HOSPITAL
              </span>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--on-surface)",
                  marginTop: 2,
                }}
              >
                {receipt.hospitalName || "Meridian Downtown Hospital"}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--outline)",
                }}
              >
                DOCTOR
              </span>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--on-surface)",
                  marginTop: 2,
                }}
              >
                {receipt.doctorName || activeDoctor?.fullName || "—"}
              </div>
            </div>
            <div style={{ display: "flex", gap: "var(--sp-md)" }}>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--outline)",
                  }}
                >
                  DATE & TIME
                </span>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--on-surface)",
                    marginTop: 2,
                  }}
                >
                  {new Date(receipt.appointmentDateTime).toLocaleDateString(
                    [],
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--on-surface-variant)",
                    marginTop: 1,
                  }}
                >
                  {new Date(receipt.appointmentDateTime).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--outline)",
                  }}
                >
                  PATIENT
                </span>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--on-surface)",
                    marginTop: 2,
                  }}
                >
                  {receipt.patientName}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--on-surface-variant)",
                    marginTop: 1,
                  }}
                >
                  {receipt.patientPhoneNumber}
                </div>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px dashed var(--surface-container-highest)",
                paddingTop: "var(--sp-sm)",
                marginTop: "var(--sp-xs)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--outline)",
                }}
              >
                REASON
              </span>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--on-surface-variant)",
                  marginTop: 4,
                  fontStyle: "italic",
                }}
              >
                "{receipt.reason}"
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={resetForm}
          style={{ display: "inline-flex", gap: 8 }}
        >
          <span className="material-symbols-outlined">restart_alt</span>
          Book Another Appointment
        </button>
      </div>
    );
  }

  // ── BOOKING FORM (single page) ──
  return (
    <div className="fade-up">
      <div className="section-header" style={{ marginBottom: 0 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--primary)" }}>
          Book Appointment
        </h1>
      </div>

      <div
        className="page-header"
        style={{ marginTop: "var(--sp-xs)", marginBottom: "var(--sp-md)" }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
          Schedule a Consultation
        </h2>
        <p>
          Fill in the details below to book your appointment at Meridian
          Downtown Hospital.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          className="error-message"
          role="alert"
          style={{
            marginBottom: "var(--sp-md)",
            padding: "var(--sp-sm)",
            background: "var(--error-container)",
            color: "var(--error)",
            borderRadius: "var(--r-lg)",
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span className="material-symbols-outlined">error</span>
          <div style={{ fontSize: 13, flex: 1 }}>
            {error}
            {error.includes("SSL") && (
              <div style={{ marginTop: 6, fontWeight: 600 }}>
                <a
                  href={`${API_BASE}/doctors`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--error)", textDecoration: "underline" }}
                >
                  Click here to accept the API certificate
                </a>
                , then refresh this page.
              </div>
            )}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sp-md)",
        }}
      >
        {/* ── Select Doctor (Dropdown) ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="select-doctor">
            Select Doctor <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div
            className="input-wrapper"
            style={{
              border: "1.5px solid var(--outline-variant)",
              borderRadius: "var(--r-lg)",
              padding: "0 16px",
            }}
          >
            {loadingDoctors ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 0",
                  color: "var(--on-surface-variant)",
                  fontSize: 14,
                }}
              >
                <span
                  className="spinner"
                  style={{
                    width: 18,
                    height: 18,
                    borderColor: "currentColor",
                    borderTopColor: "transparent",
                  }}
                />
                Loading doctors...
              </div>
            ) : (
              <select
                id="select-doctor"
                className="form-input"
                value={selectedDoctorUserId}
                onChange={(e) => setSelectedDoctorUserId(e.target.value)}
                required
                style={{
                  background: "transparent",
                  border: "none",
                  width: "100%",
                  outline: "none",
                  color: "var(--on-surface)",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                <option value="">— Choose a doctor —</option>
                {doctors.map((doc) => (
                  <option key={doc.userId} value={doc.userId}>
                    {doc.fullName} — {doc.email}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* ── Patient Name ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="patient-name">
            Patient Full Name <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined">person</span>
            <input
              id="patient-name"
              className="form-input"
              placeholder="e.g. Jane Patient"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* ── Patient Email ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="patient-email">
            Contact Email <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined">mail</span>
            <input
              id="patient-email"
              type="email"
              className="form-input"
              placeholder="e.g. jane@example.com"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* ── Patient Phone ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="patient-phone">
            Phone Number <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined">phone</span>
            <input
              id="patient-phone"
              type="tel"
              className="form-input"
              placeholder="e.g. +1 555 123 4567"
              value={patientPhoneNumber}
              onChange={(e) => setPatientPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>

        {/* ── Date & Time ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="appt-datetime">
            Appointment Date & Time{" "}
            <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div className="input-wrapper">
            <span className="material-symbols-outlined">calendar_today</span>
            <input
              id="appt-datetime"
              type="datetime-local"
              className="form-input"
              value={appointmentDateTime}
              onChange={(e) => setAppointmentDateTime(e.target.value)}
              required
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>

        {/* ── Reason ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="appt-reason">
            Reason for Consultation{" "}
            <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div
            className="input-wrapper"
            style={{ alignItems: "flex-start", paddingTop: 8 }}
          >
            <span
              className="material-symbols-outlined"
              style={{ marginTop: 2 }}
            >
              description
            </span>
            <textarea
              id="appt-reason"
              className="form-input"
              placeholder="Briefly describe your symptoms or consultation request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
              style={{
                resize: "none",
                background: "transparent",
                border: "none",
                width: "100%",
                outline: "none",
                color: "var(--on-surface)",
              }}
            />
          </div>
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          className="btn-primary"
          disabled={submitting || loadingDoctors}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "var(--sp-sm)",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? (
            <>
              <span
                className="spinner"
                style={{
                  borderColor: "#fff",
                  borderTopColor: "transparent",
                  marginRight: 8,
                }}
              />
              Submitting...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">check</span>
              Book Appointment
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
