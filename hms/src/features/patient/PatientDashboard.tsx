import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { ClinicalPassport } from "./components/ClinicalPassport";
import { SecurityActivityLogs } from "./components/SecurityActivityLogs";
import { PharmacyAutoRefills } from "./components/PharmacyAutoRefills";
import { PathologyStudiesList } from "./components/PathologyStudiesList";
import { AppointmentsListView } from "./components/AppointmentsListView";
import { PathologyArchivesView } from "./components/PathologyArchivesView";
import type { AppointmentDto, LabReport } from "./types";
import { DashboardFooter } from "../../components/dashboard/DashboardFooter";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const firstName = user?.firstName || "Sarah";
  const navigate = useNavigate();
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
      return { day: "12", month: "OCT", time: "10:00 AM", full: "" };
    }
  };

  // If there are no local appointments, create a placeholder matching the Cardiology Follow-up mockup
  const primaryAppointment: AppointmentDto | undefined = appointments[0] || {
    id: "cardio-follow-1",
    hospitalId: "h-1",
    hospitalName: "Main Wing",
    patientName: "Sarah",
    patientEmail: "sarah@example.com",
    patientPhoneNumber: "+1 555 123 4567",
    doctorUserId: "d-1",
    doctorName: "Dr. Adrian Sterling",
    appointmentDateTime: new Date("2026-10-12T10:00:00").toISOString(),
    reason: "Cardiology Follow-up",
    status: "Awaiting Consultation",
    createdAt: new Date().toISOString(),
  };

  const labReports: LabReport[] = [
    { id: "lr-1", title: "CBC & Metabolism Panel", date: "Oct 24, 2024", category: "Hematology", status: "Verified", fileSize: "1.2 MB" },
    { id: "lr-2", title: "Cardiac Marker Test", date: "Oct 12, 2024", category: "Biochemistry", status: "Verified", fileSize: "0.8 MB" },
  ];

  const handleDownload = (report: LabReport) => {
    setDownloadingReportId(report.id);
    setTimeout(() => {
      setDownloadingReportId(null);
      alert(`Downloaded report: ${report.title} (${report.fileSize}) securely over encrypted HIPAA proxy.`);
    }, 1200);
  };

  return (
    <div className="patient-dashboard">
      {/* Decorative floating blur for patient visual dashboard */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none -z-10 animate-pulse-soft"></div>

      {/* Horizontal Sub-Navigation Header */}
      <div className="patient-dashboard__subnav hidden lg:flex justify-between items-center bg-white py-4 px-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-8">
          {/* Brand */}
          <span className="text-xl font-extrabold text-[#003c90] tracking-tight">Clinical Clarity</span>
          
          {/* NavLinks */}
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-500">
            <button 
              onClick={() => setActiveSubTab("overview")}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                activeSubTab === "overview" ? "border-[#003c90] text-[#003c90]" : "border-transparent hover:text-slate-700"
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveSubTab("appointments")}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                activeSubTab === "appointments" ? "border-[#003c90] text-[#003c90]" : "border-transparent hover:text-slate-700"
              }`}
            >
              Appointments
            </button>
            <button 
              onClick={() => setActiveSubTab("records")}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                activeSubTab === "records" ? "border-[#003c90] text-[#003c90]" : "border-transparent hover:text-slate-700"
              }`}
            >
              Medical Records
            </button>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-5">
          {/* Search box */}
          <div className="relative w-64 h-10 shrink-0">
            <span className="material-symbols-outlined text-[20px] text-slate-400 absolute left-3 top-2.5">search</span>
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-full h-full bg-[#EFF4FF]/60 border border-slate-100 rounded-full pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-slate-700 placeholder-slate-400"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors text-slate-500 cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C5221F] rounded-full border border-white"></span>
          </button>

          {/* Settings */}
          <button className="w-9 h-9 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors text-slate-500 cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </button>
          
          {/* Vertical Divider */}
          <div className="w-[1px] h-6 bg-slate-200"></div>

          {/* Profile User avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-sm shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
              alt="Sarah" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Welcome Banner / Title Section */}
      <div className="patient-dashboard__welcome flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B1C30] tracking-tight">Welcome back, {firstName}</h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">Here is what's happening with your clinical profile today.</p>
        </div>
        <button
          onClick={() => navigate("/book")}
          className="bg-[#003c90] hover:bg-[#0b57d0] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-900/10 cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
          Book Appointment
        </button>
      </div>

      {/* === OVERVIEW TAB === */}
      {activeSubTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Area (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <ClinicalPassport
              primaryAppointment={primaryAppointment}
              getApptDateDetails={getApptDateDetails}
              setActiveSubTab={setActiveSubTab}
            />
            <PharmacyAutoRefills />
          </div>

          {/* Right Area (1/3 width) */}
          <div className="space-y-6">
            <SecurityActivityLogs />
            <PathologyStudiesList
              labReports={labReports}
              downloadingReportId={downloadingReportId}
              handleDownload={handleDownload}
              setActiveSubTab={setActiveSubTab}
            />
          </div>
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

      {/* Premium Footer */}
      <DashboardFooter description="Your appointments, reports, pharmacy access, and care-team updates in one protected patient workspace." />
    </div>
  );
};

export default PatientDashboard;
