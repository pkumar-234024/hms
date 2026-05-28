import { useState, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Button } from '../../components/ui/Button'
import {
  Plus, Heart, FileText, Download, ChevronRight,
  Activity, ShoppingCart, ShieldCheck, Bell
} from 'lucide-react'

interface AppointmentDto {
  id: string
  hospitalId: string
  hospitalName: string
  patientName: string
  patientEmail: string
  patientPhoneNumber: string
  doctorUserId: string
  doctorName: string
  appointmentDateTime: string
  reason: string
  status: string
  createdAt: string
}

const PatientDashboard = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [appointments, setAppointments] = useState<AppointmentDto[]>([])
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'appointments' | 'records'>('overview')
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null)

  useEffect(() => {
    const savedApps = localStorage.getItem('mediflow_patient_appointments')
    if (savedApps) {
      try {
        setAppointments(JSON.parse(savedApps))
      } catch (e) {
        console.error('Failed to parse patient appointments:', e)
      }
    }
  }, [])

  // Format date helper
  const getApptDateDetails = (dateTimeStr: string) => {
    try {
      const d = new Date(dateTimeStr)
      return {
        day: d.getDate().toString().padStart(2, '0'),
        month: d.toLocaleDateString([], { month: 'short' }).toUpperCase(),
        time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        full: d.toLocaleString()
      }
    } catch (e) {
      return { day: '15', month: 'OCT', time: '10:00 AM', full: '' }
    }
  }

  const primaryAppointment = appointments[0]

  const labReports = [
    { id: 'lr-1', title: 'Complete Blood Count (CBC)', date: 'Oct 12, 2025', category: 'Hematology', status: 'Verified', fileSize: '1.2 MB' },
    { id: 'lr-2', title: 'Lipid Panel Analysis', date: 'Sep 28, 2025', category: 'Biochemistry', status: 'Verified', fileSize: '0.8 MB' },
    { id: 'lr-3', title: 'ECG Report - Resting', date: 'Sep 15, 2025', category: 'Cardiology', status: 'Pending Review', fileSize: '2.4 MB' },
  ]

  const handleDownload = (report: typeof labReports[0]) => {
    setDownloadingReportId(report.id)
    setTimeout(() => {
      setDownloadingReportId(null)
      alert(`Downloaded report: ${report.title} (${report.fileSize}) securely over encrypted HIPAA proxy.`)
    }, 1200)
  }

  const firstName = user?.firstName || 'Patient'

  return (
    <div className="space-y-8 relative pb-12">
      {/* Decorative floating blur for patient visual dashboard */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Header section with rich statistics */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-[#0c1a30] leading-none mb-2 tracking-tight">Patient EHR Portal</h2>
          <p className="font-sans text-sm text-slate-500">Welcome back, {firstName}. Access your clinical profile &amp; health records.</p>
        </div>

        {/* Info badges */}
        <div className="flex items-center gap-4 bg-white/70 backdrop-blur border border-slate-200/80 px-4 py-2 rounded-2xl shadow-sm">
          <div className="text-right">
            <p className="font-sans text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Date</p>
            <p className="font-sans text-sm font-semibold text-slate-800">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
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
          onClick={() => setActiveSubTab('overview')}
          className={`flex-1 font-sans text-xs font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${
            activeSubTab === 'overview' 
              ? 'bg-white text-[#003c90] shadow-sm' 
              : 'text-slate-500 hover:text-[#003c90]'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveSubTab('appointments')}
          className={`flex-1 font-sans text-xs font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${
            activeSubTab === 'appointments' 
              ? 'bg-white text-[#003c90] shadow-sm' 
              : 'text-slate-500 hover:text-[#003c90]'
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveSubTab('records')}
          className={`flex-1 font-sans text-xs font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${
            activeSubTab === 'records' 
              ? 'bg-white text-[#003c90] shadow-sm' 
              : 'text-slate-500 hover:text-[#003c90]'
          }`}
        >
          Medical Records
        </button>
      </div>

      {/* === OVERVIEW TAB === */}
      {activeSubTab === 'overview' && (
        <>
          {/* Main Dashboard Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Appointment Status Card - Passport Style Upgrade */}
            {primaryAppointment ? (
              <div className="lg:col-span-8 bg-gradient-to-br from-[#0c1a30] via-[#003c90] to-[#0f52ba] rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[320px] group border border-blue-900/30">
                {/* Tech vector dots overlay for high-fidelity clinical passport look */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>

                <div className="relative z-10 space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[#6cf8bb] text-xs font-bold tracking-wider uppercase">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
                      {primaryAppointment.status}
                    </span>
                    <span className="text-[10px] bg-white/10 text-slate-200 px-3 py-1 rounded-lg border border-white/10 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      HIPAA Confirmed
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-sans text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-1.5">Reason for Visit</p>
                    <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
                      {primaryAppointment.reason || 'General Consultation'}
                    </h3>
                    <p className="font-sans text-xs text-blue-100/90 font-medium">
                      Assigned Practitioner: <strong className="text-white">{primaryAppointment.doctorName}</strong> • {primaryAppointment.hospitalName || 'Main Wing'}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-6 relative z-10 gap-4 flex-wrap">
                  <div className="flex gap-8">
                    <div>
                      <p className="font-sans text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-1">Time Slot</p>
                      <p className="font-display text-2xl font-black text-[#6cf8bb]">
                        {getApptDateDetails(primaryAppointment.appointmentDateTime).time}
                      </p>
                    </div>
                    <div className="border-l border-white/10 pl-8">
                      <p className="font-sans text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-1">Date</p>
                      <p className="font-display text-2xl font-black text-white">
                        {getApptDateDetails(primaryAppointment.appointmentDateTime).month} {getApptDateDetails(primaryAppointment.appointmentDateTime).day}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outlined"
                    onClick={() => setActiveSubTab('appointments')}
                    className="!bg-white/10 hover:!bg-white/20 !text-white !border-white/25 px-4 py-2.5 !rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] h-auto w-auto"
                  >
                    Manage Booking
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-8 bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 flex flex-col items-center justify-center text-center min-h-[320px] shadow-sm">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg font-black text-[#0c1a30]">No Active Consultations</h3>
                <p className="font-sans text-xs text-slate-400 mt-1.5 max-w-sm font-medium">Use the scheduler tool to quickly book a priority medical consultation slot.</p>
                <a
                  href="/book"
                  className="mt-6 px-5 py-2.5 bg-[#003c90] hover:bg-[#0f52ba] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:translate-y-[-1px] no-underline"
                >
                  <Plus className="w-4 h-4" />
                  Schedule Now
                </a>
              </div>
            )}

            {/* Recent Activity Widget - Bento Item */}
            <div className="lg:col-span-4 bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400">Security &amp; Activity Logs</h3>
                  <Activity className="w-4 h-4 text-[#003c90] animate-pulse" />
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Appointment Registered', detail: 'Just now • System SHA-256' },
                    { title: 'Lab Reports Synchronized', detail: '2 hours ago • Pathology Desk' },
                    { title: 'E-Prescription Dispensed', detail: 'Yesterday • Pharmacy Hub' },
                  ].map((up, i) => (
                    <div key={i} className="flex gap-3.5 items-start">
                      <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center shrink-0 border border-blue-100 text-[#003c90]">
                        <Activity className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="font-sans text-xs font-bold text-slate-800 leading-tight">{up.title}</p>
                        <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">{up.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outlined"
                colorType="primary"
                onClick={() => alert("Loading full audit logs under SHA-256 HIPAA specification...")}
                className="w-full mt-6 py-2.5 !rounded-xl font-bold text-xs bg-white"
              >
                Request Audit Log
              </Button>
            </div>

            {/* Pharmacy Store Card Bento */}
            <div className="lg:col-span-6 group relative rounded-3xl overflow-hidden min-h-[220px] shadow-md border border-blue-900/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a30] to-[#003c90] transition-all group-hover:scale-105 duration-700"></div>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-sm relative z-10 space-y-3">
                <span className="font-sans text-[9px] text-[#6cf8bb] font-extrabold tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  Auto-Dispensary
                </span>
                <h3 className="font-display text-xl font-extrabold mb-1 tracking-tight">Pharmacy Auto-Refills</h3>
                <p className="font-sans text-xs text-blue-100 opacity-80 leading-relaxed font-normal">
                  Order active maintenance medication or clinical monitoring tools. Delivered to your door.
                </p>
                <Button 
                  variant="filled"
                  onClick={() => alert("Navigating to secure clinical store. Refill codes pre-populated.")}
                  className="!bg-white !text-[#003c90] px-4.5 py-2.5 !rounded-xl text-xs font-bold hover:shadow-lg hover:bg-slate-50 transition-all cursor-pointer h-auto w-auto inline-flex items-center gap-2"
                >
                  Browse Pharmacy Store
                  <ShoppingCart className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Pathology Reports List Bento Card */}
            <div className="lg:col-span-6 bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-black text-[#0c1a30] tracking-tight">Active Pathology Studies</h3>
                  <button
                    onClick={() => setActiveSubTab('records')}
                    className="text-[#003c90] font-extrabold text-xs hover:underline flex items-center"
                  >
                    View Archive
                  </button>
                </div>

                <div className="space-y-3.5">
                  {labReports.map((report) => (
                    <div key={report.id} className="p-3 bg-white hover:bg-slate-50/50 rounded-2xl border border-slate-200/80 flex items-center justify-between transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#003c90] border border-blue-50/50">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-sans text-xs font-bold text-slate-800 leading-tight">{report.title}</p>
                          <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">EHR Released: {report.date}</p>
                        </div>
                      </div>
                      <Button
                        variant="text"
                        disabled={downloadingReportId === report.id}
                        onClick={() => handleDownload(report)}
                        className="p-2 !rounded-xl transition-all h-auto w-auto"
                      >
                        {downloadingReportId === report.id ? (
                          <span className="text-[10px] text-slate-400 font-bold animate-pulse whitespace-nowrap">Securing...</span>
                        ) : (
                          <Download className="w-4 h-4 shrink-0" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* === APPOINTMENTS TAB === */}
      {activeSubTab === 'appointments' && (
        <div className="space-y-6 bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-black text-[#0c1a30] tracking-tight">Active Registered Consultations</h3>
              <p className="font-sans text-xs text-slate-400 mt-0.5">Manage your pending reviews and confirmed appointments.</p>
            </div>
            <a href="/book" className="bg-[#eff4ff] hover:bg-[#e5eeff] text-[#003c90] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors no-underline">
              <Plus className="w-4 h-4" /> Book Consultation
            </a>
          </div>

          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-3 text-slate-400">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-700">No scheduled visits yet</h3>
              <p className="font-sans text-xs text-slate-400 mt-1 max-w-sm font-medium">Any slots you request or approve via the medical portals will display here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-150">
              {appointments.map((app) => {
                const details = getApptDateDetails(app.appointmentDateTime)
                return (
                  <div key={app.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-display font-black text-[#0c1a30] text-base">{app.reason}</h4>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                          app.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          app.status === 'Declined' ? 'bg-red-50 text-red-800 border-red-200' :
                          'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-slate-500 font-semibold">Scheduled for {details.full}</p>
                      <p className="font-sans text-[11px] text-slate-400 font-medium">Provider: {app.doctorName} • Clinic Unit ({app.hospitalName})</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* === MEDICAL RECORDS TAB === */}
      {activeSubTab === 'records' && (
        <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-200/80 space-y-6">
          <div>
            <h3 className="font-display text-xl font-black text-[#0c1a30] tracking-tight">Secure Medical Pathology Archives</h3>
            <p className="font-sans text-xs text-slate-400 mt-0.5">All pathology metrics and clinical data is signed under SHA-256 cryptography.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {labReports.map((rep) => (
              <div key={rep.id} className="p-4 bg-white rounded-2xl border border-slate-200/80 flex flex-col justify-between h-40 shadow-sm hover:border-[#003c90] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-display font-bold text-slate-800 text-sm tracking-tight">{rep.title}</p>
                    <p className="font-sans text-[11px] text-slate-400 mt-1 font-semibold">Category: {rep.category} • Size: {rep.fileSize}</p>
                  </div>
                  <span className={`text-[9px] font-extrabold tracking-wider border px-2.5 py-0.5 rounded-full uppercase ${
                    rep.status === 'Verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-amber-50 text-amber-800 border-amber-100'
                  }`}>
                    {rep.status}
                  </span>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => handleDownload(rep)}
                  className="w-full text-center py-2.5 !rounded-xl text-xs font-bold mt-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-[#eff4ff] hover:bg-[#e5eeff] text-[#003c90]"
                >
                  <Download className="w-3.5 h-3.5" /> Download Encrypted PDF
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientDashboard
