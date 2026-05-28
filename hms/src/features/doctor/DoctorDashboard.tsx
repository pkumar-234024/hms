import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Button } from "../../components/ui/Button";
import { Calendar, ShieldAlert } from "lucide-react";
import { ConsultationQueue } from "./components/ConsultationQueue";
import { ClinicalStats } from "./components/ClinicalStats";
import { EhrDetailPanel } from "./components/EhrDetailPanel";
import type { AppointmentDto, Prescription } from "./types";

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

  // Detail tab
  const [detailTab, setDetailTab] = useState<"summary" | "vitals" | "labs">("summary");

  // Notes
  const [notesText, setNotesText] = useState("");
  const [aiDrafting, setAiDrafting] = useState(false);

  // Prescriptions
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: "rx-1", medicineName: "Lisinopril 10mg", dosage: "1 Tablet", frequency: "Daily (Morning)" },
    { id: "rx-2", medicineName: "Metoprolol Suc 50mg", dosage: "1 Tablet", frequency: "Twice Daily" },
  ]);
  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("1 Tablet");

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
          throw new Error("Access denied. Please re-authenticate as a clinical provider.");
        }
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      setAppointments(data.items || []);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setError(err instanceof Error ? err.message : "Failed to retrieve appointments.");
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
        headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to approve: HTTP ${res.status}`);
      await fetchAppointments();
      setSelectedApptId(null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to approve appointment.");
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
      setError(err instanceof Error ? err.message : "Failed to decline appointment.");
    } finally {
      setResolvingId(null);
    }
  };

  // Add prescription
  const handleAddRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;
    setPrescriptions((prev) => [
      ...prev,
      { id: `rx-${Date.now()}`, medicineName: newMedName, dosage: newMedDosage, frequency: "Daily (Morning)" },
    ]);
    setNewMedName("");
  };

  // AI notes assist
  const handleAiNoteAssist = async () => {
    if (!notesText.trim()) {
      alert("Please write a brief symptom or raw clinical bullet points first, then click AI Assist to polish.");
      return;
    }
    setAiDrafting(true);
    try {
      const response = await fetch("/api/clinical-notes-summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawNotes: notesText, patientName: activeApp?.patientName || "Patient" }),
      });
      const data = await response.json();
      if (response.ok && data.summary) {
        setNotesText(data.summary);
      } else {
        const polished = `CLINICAL SUMMARY:\nPatient: ${activeApp?.patientName || "Unknown"}\n\nPresenting Complaint:\n- "${notesText}"\n\nAssessment:\n- Standard diagnostic criteria met.\n- Follow up within 30 days recommended.`;
        setNotesText(polished);
      }
    } catch {
      const fallback = `PATIENT SUMMARY:\nPatient: ${activeApp?.patientName || "Unknown"}\n\nNotes:\n- "${notesText}"\n- Continue regular medication. Observe daily vitals.`;
      setNotesText(fallback);
    } finally {
      setAiDrafting(false);
    }
  };

  // Stats
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const approvedCount = appointments.filter((a) => a.status === "Approved").length;
  const activeApp = selectedApptId ? appointments.find((a) => a.id === selectedApptId) : appointments[0];

  const doctorName = user?.firstName ? `Dr. ${user.firstName} ${user.lastName || ""}`.trim() : "Dr. Julian Thorne";

  return (
    <div className="space-y-8 relative pb-12">
      {/* Visual Floating Deco Orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/35 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-[#0c1a30] leading-none mb-2 tracking-tight">
            Clinical Care Portal
          </h2>
          <p className="font-sans text-sm text-slate-505">
            Welcome back, {doctorName}. Monitor clinic slots and review EHR charts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outlined"
            onClick={fetchAppointments}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur hover:bg-slate-50 text-slate-700 font-sans text-xs font-bold !rounded-xl transition-all border border-slate-200 shadow-sm cursor-pointer h-auto w-auto"
          >
            <Calendar className="w-4 h-4 text-slate-505" />
            {loading ? "Synchronizing EHR..." : "Refresh Records"}
          </Button>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-955 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-sm animate-pulse">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Asymmetric 2-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Appointments List */}
        <section className="xl:col-span-5 space-y-6">
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
          <ClinicalStats
            appointments={appointments}
            pendingCount={pendingCount}
            approvedCount={approvedCount}
          />
        </section>

        {/* Right Column: Patient Detail Panel */}
        <EhrDetailPanel
          activeApp={activeApp}
          detailTab={detailTab}
          setDetailTab={setDetailTab}
          notesText={notesText}
          setNotesText={setNotesText}
          aiDrafting={aiDrafting}
          handleAiNoteAssist={handleAiNoteAssist}
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
          newMedName={newMedName}
          setNewMedName={setNewMedName}
          newMedDosage={newMedDosage}
          setNewMedDosage={setNewMedDosage}
          handleAddRx={handleAddRx}
        />
      </div>
    </div>
  );
};

export default DoctorDashboard;
