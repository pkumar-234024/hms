import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Bell } from "lucide-react";
import { ClinicalPassport } from "./components/ClinicalPassport";
import { SecurityActivityLogs } from "./components/SecurityActivityLogs";
import { PharmacyAutoRefills } from "./components/PharmacyAutoRefills";
import { PathologyStudiesList } from "./components/PathologyStudiesList";
import { AppointmentsListView } from "./components/AppointmentsListView";
import { PathologyArchivesView } from "./components/PathologyArchivesView";
import type { AppointmentDto, LabReport } from "./types";

const PatientDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "appointments" | "records">("overview");
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null);

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

  // Format date helper
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
      return { day: "15", month: "OCT", time: "10:00 AM", full: "" };
    }
  };

  const primaryAppointment = appointments[0];

  const labReports: LabReport[] = [
    { id: "lr-1", title: "Complete Blood Count (CBC)", date: "Oct 12, 2025", category: "Hematology", status: "Verified", fileSize: "1.2 MB" },
    { id: "lr-2", title: "Lipid Panel Analysis", date: "Sep 28, 2025", category: "Biochemistry", status: "Verified", fileSize: "0.8 MB" },
    { id: "lr-3", title: "ECG Report - Resting", date: "Sep 15, 2025", category: "Cardiology", status: "Pending Review", fileSize: "2.4 MB" },
  ];

  const handleDownload = (report: LabReport) => {
    setDownloadingReportId(report.id);
    setTimeout(() => {
      setDownloadingReportId(null);
      alert(`Downloaded report: ${report.title} (${report.fileSize}) securely over encrypted HIPAA proxy.`);
    }, 1200);
  };

  const firstName = user?.firstName || "Patient";

  return (
    <div className="space-y-8 relative pb-12">
      {/* Decorative floating blur for patient visual dashboard */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Header section with rich statistics */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-[#0c1a30] leading-none mb-2 tracking-tight">
            Patient EHR Portal
          </h2>
          <p className="font-sans text-sm text-slate-550">
            Welcome back, {firstName}. Access your clinical profile &amp; health records.
          </p>
        </div>

        {/* Info badges */}
        <div className="flex items-center gap-4 bg-white/70 backdrop-blur border border-slate-200/80 px-4 py-2 rounded-2xl shadow-sm">
          <div className="text-right">
            <p className="font-sans text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Date</p>
            <p className="font-sans text-sm font-semibold text-slate-800">
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </p>
          </div>
          <div className="w-px h-8 bg-slate-200 mx-1"></div>
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 bg-[#eff4ff] text-[#003c90] group-hover:bg-[#003c90] group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300">
              <Bell className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
        </div>
      </header>

      {/* Tab Navigation (Glassmorphic Slider Design) */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md shadow-inner">
        <button
          onClick={() => setActiveSubTab("overview")}
          className={`flex-1 font-sans text-xs font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${
            activeSubTab === "overview" ? "bg-white text-[#003c90] shadow-sm" : "text-slate-505 hover:text-[#003c90]"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveSubTab("appointments")}
          className={`flex-1 font-sans text-xs font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${
            activeSubTab === "appointments" ? "bg-white text-[#003c90] shadow-sm" : "text-slate-505 hover:text-[#003c90]"
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveSubTab("records")}
          className={`flex-1 font-sans text-xs font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${
            activeSubTab === "records" ? "bg-white text-[#003c90] shadow-sm" : "text-slate-505 hover:text-[#003c90]"
          }`}
        >
          Medical Records
        </button>
      </div>

      {/* === OVERVIEW TAB === */}
      {activeSubTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ClinicalPassport
            primaryAppointment={primaryAppointment}
            getApptDateDetails={getApptDateDetails}
            setActiveSubTab={setActiveSubTab}
          />
          <SecurityActivityLogs />
          <PharmacyAutoRefills />
          <PathologyStudiesList
            labReports={labReports}
            downloadingReportId={downloadingReportId}
            handleDownload={handleDownload}
            setActiveSubTab={setActiveSubTab}
          />
        </div>
      )}

      {/* === APPOINTMENTS TAB === */}
      {activeSubTab === "appointments" && (
        <AppointmentsListView
          appointments={appointments}
          getApptDateDetails={getApptDateDetails}
        />
      )}

      {/* === MEDICAL RECORDS TAB === */}
      {activeSubTab === "records" && (
        <PathologyArchivesView
          labReports={labReports}
          downloadingReportId={downloadingReportId}
          handleDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
