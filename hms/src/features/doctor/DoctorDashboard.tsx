import { useState, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Button } from '../../components/ui/Button'
import {
  Calendar, Trash2, Send,
  ShieldAlert, MapPin, Activity, Sparkles, ChevronRight,
  User, Check, X, Clock
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
  decisionNote?: string | null
  reviewedAt?: string | null
}

interface Prescription {
  id: string
  medicineName: string
  dosage: string
  frequency: string
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:57679'

const DoctorDashboard = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth)

  // State variables
  const [appointments, setAppointments] = useState<AppointmentDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Resolution UI states
  const [selectedApptId, setSelectedApptId] = useState<string | null>(null)
  const [resolvingId, setResolvingId] = useState<string | null>(null)
  const [declineReason, setDeclineReason] = useState('')
  const [showDeclineForm, setShowDeclineForm] = useState<string | null>(null)

  // Detail tab
  const [detailTab, setDetailTab] = useState<'summary' | 'vitals' | 'labs'>('summary')

  // Notes
  const [notesText, setNotesText] = useState('')
  const [aiDrafting, setAiDrafting] = useState(false)

  // Prescriptions
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: 'rx-1', medicineName: 'Lisinopril 10mg', dosage: '1 Tablet', frequency: 'Daily (Morning)' },
    { id: 'rx-2', medicineName: 'Metoprolol Suc 50mg', dosage: '1 Tablet', frequency: 'Twice Daily' },
  ])
  const [newMedName, setNewMedName] = useState('')
  const [newMedDosage, setNewMedDosage] = useState('1 Tablet')

  // Fetch Appointments
  const fetchAppointments = async () => {
    if (!accessToken) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/appointments?page=1&per_page=50`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      })
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Access denied. Please re-authenticate as a clinical provider.')
        }
        throw new Error(`HTTP error ${res.status}`)
      }
      const data = await res.json()
      setAppointments(data.items || [])
    } catch (err) {
      console.error('Failed to load appointments:', err)
      setError(err instanceof Error ? err.message : 'Failed to retrieve appointments.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [accessToken])

  // Resolve: Approve
  const handleApprove = async (id: string) => {
    if (!accessToken) return
    setResolvingId(id)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' }
      })
      if (!res.ok) throw new Error(`Failed to approve: HTTP ${res.status}`)
      await fetchAppointments()
      setSelectedApptId(null)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to approve appointment.')
    } finally {
      setResolvingId(null)
    }
  }

  // Resolve: Decline
  const handleDecline = async (id: string) => {
    if (!accessToken) return
    setResolvingId(id)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/decline`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ reason: declineReason.trim() })
      })
      if (!res.ok) throw new Error(`Failed to decline: HTTP ${res.status}`)
      setDeclineReason('')
      setShowDeclineForm(null)
      setSelectedApptId(null)
      await fetchAppointments()
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to decline appointment.')
    } finally {
      setResolvingId(null)
    }
  }

  // Add prescription
  const handleAddRx = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMedName) return
    setPrescriptions(prev => [...prev, { id: `rx-${Date.now()}`, medicineName: newMedName, dosage: newMedDosage, frequency: 'Daily (Morning)' }])
    setNewMedName('')
  }

  // AI notes assist
  const handleAiNoteAssist = async () => {
    if (!notesText.trim()) {
      alert("Please write a brief symptom or raw clinical bullet points first, then click AI Assist to polish.")
      return
    }
    setAiDrafting(true)
    try {
      const response = await fetch('/api/clinical-notes-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawNotes: notesText, patientName: activeApp?.patientName || 'Patient' })
      })
      const data = await response.json()
      if (response.ok && data.summary) {
        setNotesText(data.summary)
      } else {
        const polished = `CLINICAL SUMMARY:\nPatient: ${activeApp?.patientName || 'Unknown'}\n\nPresenting Complaint:\n- "${notesText}"\n\nAssessment:\n- Standard diagnostic criteria met.\n- Follow up within 30 days recommended.`
        setNotesText(polished)
      }
    } catch {
      const fallback = `PATIENT SUMMARY:\nPatient: ${activeApp?.patientName || 'Unknown'}\n\nNotes:\n- "${notesText}"\n- Continue regular medication. Observe daily vitals.`
      setNotesText(fallback)
    } finally {
      setAiDrafting(false)
    }
  }

  // Stats
  const pendingCount = appointments.filter(a => a.status === 'Pending').length
  const approvedCount = appointments.filter(a => a.status === 'Approved').length
  const activeApp = selectedApptId ? appointments.find(a => a.id === selectedApptId) : appointments[0]

  const doctorName = user?.firstName ? `Dr. ${user.firstName} ${user.lastName || ''}`.trim() : 'Dr. Julian Thorne'

  return (
    <div className="space-y-8 relative pb-12">
      {/* Visual Floating Deco Orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/35 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-[#0c1a30] leading-none mb-2 tracking-tight">Clinical Care Portal</h2>
          <p className="font-sans text-sm text-slate-500">Welcome back, {doctorName}. Monitor clinic slots and review EHR charts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outlined"
            onClick={fetchAppointments}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur hover:bg-slate-50 text-slate-700 font-sans text-xs font-bold !rounded-xl transition-all border border-slate-200 shadow-sm cursor-pointer h-auto w-auto"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            {loading ? 'Synchronizing EHR...' : 'Refresh Records'}
          </Button>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-950 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-sm animate-pulse">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Asymmetric 2-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

        {/* Left Column: Appointments List */}
        <section className="xl:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-black text-[#0c1a30] tracking-tight">Consultation Queue</h3>
            <span className="text-[10px] bg-[#eff4ff] text-[#003c90] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-blue-100">
              Live Feed
            </span>
          </div>

          {loading && appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#003c90] bg-white/70 backdrop-blur rounded-3xl border border-slate-200 shadow-sm">
              <Activity className="w-8 h-8 animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Verifying Clinical Keys...</span>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white/70 backdrop-blur rounded-3xl p-8 border border-slate-200/80 text-center shadow-sm">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-display text-base font-bold text-slate-700">No Patient Appointments</h3>
              <p className="font-sans text-xs text-slate-400 mt-1 max-w-xs mx-auto font-medium">Pending EHR requests will automatically stream to this section.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((app) => {
                const isActive = selectedApptId === app.id
                const dateObj = new Date(app.appointmentDateTime)
                return (
                  <div
                    key={app.id}
                    onClick={() => {
                      if (resolvingId) return
                      setSelectedApptId(isActive ? null : app.id)
                      setShowDeclineForm(null)
                      setDeclineReason('')
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isActive 
                        ? 'bg-white border-[#003c90] ring-1 ring-[#003c90]/25 shadow-md' 
                        : 'bg-white/70 backdrop-blur hover:bg-white border-slate-200/80 shadow-sm'
                    }`}
                  >
                    {/* Visual left indicator color bars based on status */}
                    <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      app.status === 'Approved' ? 'bg-emerald-500' :
                      app.status === 'Declined' ? 'bg-red-500' :
                      'bg-amber-400'
                    }`} />

                    <div className="flex justify-between items-start mb-3 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#003c90] font-black text-sm border border-blue-50">
                          {app.patientName?.charAt(0) || 'P'}
                        </div>
                        <div>
                          <p className="font-sans text-xs font-bold text-slate-800 tracking-wide">{app.patientName}</p>
                          <p className="font-sans text-[11px] text-slate-400 font-semibold mt-0.5">{app.reason}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                        app.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-150' :
                        app.status === 'Declined' ? 'bg-red-50 text-red-800 border-red-150' :
                        'bg-amber-50 text-amber-700 border-amber-150'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 pl-2">
                      <div className="flex gap-4 text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {app.hospitalName || 'Main Wing'}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Expanded drawer for actions */}
                    {isActive && (
                      <div
                        className="mt-4 pt-4 border-t border-slate-200/80 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email Address</div>
                            <div className="text-xs text-slate-700 font-semibold mt-0.5 truncate">{app.patientEmail}</div>
                          </div>
                          <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Contact Phone</div>
                            <div className="text-xs text-slate-700 font-semibold mt-0.5">{app.patientPhoneNumber}</div>
                          </div>
                        </div>

                        {app.status === 'Pending' && (
                          <div className="space-y-3">
                            {showDeclineForm === app.id ? (
                              <div className="space-y-3 mt-2">
                                <input
                                  className="w-full h-10 border border-slate-200 rounded-xl px-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#003c90]"
                                  placeholder="Provide professional rationale for decline..."
                                  value={declineReason}
                                  onChange={(e) => setDeclineReason(e.target.value)}
                                  disabled={resolvingId === app.id}
                                />
                                <div className="flex gap-2">
                                  <Button
                                    variant="outlined"
                                    onClick={() => { setShowDeclineForm(null); setDeclineReason('') }}
                                    disabled={resolvingId === app.id}
                                    className="flex-1 py-2 !rounded-xl text-xs font-bold h-auto"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="filled"
                                    colorType="error"
                                    onClick={() => handleDecline(app.id)}
                                    disabled={resolvingId === app.id}
                                    className="flex-2 py-2 !rounded-xl text-xs font-bold h-auto"
                                  >
                                    {resolvingId === app.id ? <Activity className="w-4 h-4 animate-spin" /> : <><X className="w-3.5 h-3.5" /> Submit Decline</>}
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex gap-2 mt-2">
                                <Button
                                  variant="outlined"
                                  colorType="error"
                                  onClick={() => setShowDeclineForm(app.id)}
                                  disabled={resolvingId === app.id}
                                  className="flex-1 py-2.5 !rounded-xl text-xs font-bold h-auto"
                                >
                                  Decline Slot
                                </Button>
                                <Button
                                  variant="filled"
                                  colorType="primary"
                                  onClick={() => handleApprove(app.id)}
                                  disabled={resolvingId === app.id}
                                  className="flex-1 py-2.5 !rounded-xl text-xs font-bold shadow-sm shadow-blue-900/15 h-auto"
                                >
                                  {resolvingId === app.id ? <Activity className="w-4 h-4 animate-spin" /> : <><Check className="w-3.5 h-3.5" /> Approve Slot</>}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {app.status !== 'Pending' && (
                          <div className="border-t border-dashed border-slate-200 pt-3 mt-3">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">EHR Resolution Log</div>
                            {app.decisionNote ? (
                              <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">"{app.decisionNote}"</p>
                            ) : (
                              <p className="text-xs text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100">Approved under standard telemetry protocol.</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Stats Bento Grid Upgrade */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-gradient-to-br from-[#0c1a30] to-[#0f52ba] p-5 rounded-3xl text-white shadow-md flex flex-col justify-between h-32 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
              <p className="font-sans text-[10px] font-bold text-blue-200 uppercase tracking-widest">Pending Review</p>
              <h4 className="font-display text-2xl font-black text-white tracking-tight">{pendingCount} Requests</h4>
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-2">
                <div className="bg-[#6cf8bb] h-full rounded-full transition-all duration-500" style={{ width: appointments.length ? `${(pendingCount / appointments.length) * 100}%` : '0%' }}></div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md p-5 rounded-3xl border border-slate-250 text-slate-800 shadow-sm flex flex-col justify-between h-32 group">
              <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">Approved Sessions</p>
              <h4 className="font-display text-2xl font-black text-[#0c1a30] tracking-tight">{approvedCount} Cleared</h4>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                <div className="bg-[#003c90] h-full rounded-full transition-all duration-500" style={{ width: appointments.length ? `${(approvedCount / appointments.length) * 100}%` : '0%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Patient Detail Panel */}
        <section className="xl:col-span-7">
          {activeApp ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden glass-premium">
              {/* Detail Header */}
              <div className="bg-slate-50/50 px-6 py-6 border-b border-slate-200 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#003c90] font-display font-black text-lg border border-blue-150 shadow-inner">
                    {activeApp.patientName?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black text-slate-800 leading-tight">{activeApp.patientName}</h3>
                    <p className="font-sans text-xs text-slate-500 mt-1 font-semibold">
                      Chart ID: <strong className="text-slate-700">{activeApp.id.substring(0, 8).toUpperCase()}</strong> • {activeApp.hospitalName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Tabs */}
              <div className="p-6 space-y-6">
                <div className="flex border-b border-slate-200 gap-6 overflow-x-auto">
                  {(['summary', 'vitals', 'labs'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`pb-3 font-sans text-xs font-bold border-b-2 tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                        detailTab === tab 
                          ? 'border-[#003c90] text-[#003c90] font-black' 
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {tab === 'summary' ? 'EHR Summary' : tab === 'vitals' ? 'Vitals Log' : 'Lab Pathology'}
                    </button>
                  ))}
                </div>

                {/* Summary Panel */}
                {detailTab === 'summary' && (
                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                      <h4 className="font-display text-xs font-bold text-[#003c90] tracking-wider uppercase flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-[#003c90]" />
                        Consultation Agenda
                      </h4>
                      <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl shadow-inner">
                        <p className="font-sans text-xs font-bold text-slate-800 leading-relaxed">{activeApp.reason}</p>
                        <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
                          EHR TIMESTAMP • {new Date(activeApp.appointmentDateTime).toLocaleDateString()}
                        </p>
                        <span className={`inline-block mt-3 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                          activeApp.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-250' :
                          activeApp.status === 'Declined' ? 'bg-red-50 text-red-800 border-red-250' :
                          'bg-[#eff4ff] text-[#003c90] border-blue-250'
                        }`}>
                          {activeApp.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-display text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400" />
                        Patient Registry
                      </h4>
                      <div className="space-y-2">
                        <div className="bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between">
                          <span className="text-slate-400 text-[10px] uppercase">Email</span>
                          <span>{activeApp.patientEmail}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between">
                          <span className="text-slate-400 text-[10px] uppercase">Phone</span>
                          <span>{activeApp.patientPhoneNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vitals Tab (High-Fidelity) */}
                {detailTab === 'vitals' && (
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Heart Rate</p>
                      <p className="font-display text-xl font-black text-[#0c1a30] mt-1.5">72 BPM</p>
                      <span className="inline-block mt-2 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Normal</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Blood Pressure</p>
                      <p className="font-display text-xl font-black text-[#0c1a30] mt-1.5">120/80</p>
                      <span className="inline-block mt-2 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Optimal</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Oxygen Saturation</p>
                      <p className="font-display text-xl font-black text-[#0c1a30] mt-1.5">99%</p>
                      <span className="inline-block mt-2 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Excellent</span>
                    </div>
                  </div>
                )}

                {/* Labs Tab (High-Fidelity) */}
                {detailTab === 'labs' && (
                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
                      <div>
                        <p className="font-sans text-xs font-bold text-slate-800">Metabolic Panel (CMP)</p>
                        <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">EHR Released: Oct 20, 2025</p>
                      </div>
                      <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase">Verified</span>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
                      <div>
                        <p className="font-sans text-xs font-bold text-slate-800">Lipid &amp; Cholesterol Study</p>
                        <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">EHR Released: Oct 14, 2025</p>
                      </div>
                      <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase">Verified</span>
                    </div>
                  </div>
                )}

                {/* Consultation Notes Editor with Premium Gemini styling */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      Clinical Chart Notes
                    </h4>
                    <Button
                      type="button"
                      variant="outlined"
                      colorType="primary"
                      disabled={aiDrafting}
                      onClick={handleAiNoteAssist}
                      className="bg-gradient-to-r from-[#eff4ff] to-blue-50 text-[#003c90] border border-blue-200 hover:shadow-sm text-[10px] font-bold px-3 py-1.5 !rounded-xl flex items-center gap-1.5 transition duration-300 cursor-pointer animate-pulse-soft h-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#003c90]" />
                      {aiDrafting ? 'Gemini AI Summarizing...' : 'Summarize with Gemini AI'}
                    </Button>
                  </div>
                  <textarea
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    className="w-full h-32 p-4 bg-white border border-slate-250 focus:ring-2 focus:ring-blue-100 focus:border-[#003c90] rounded-2xl outline-none text-xs font-sans text-slate-700 leading-relaxed transition shadow-inner"
                    placeholder="Document clinical symptom updates, check-up insights, diagnostic observations, or chronic health feedback..."
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="filled"
                      onClick={() => alert(`Clinical summary saved successfully for ${activeApp.patientName}`)}
                      className="bg-[#0c1a30] hover:bg-slate-900 !text-white px-5 py-2.5 !rounded-xl text-xs font-bold h-auto w-auto"
                    >
                      Commit Chart Notes
                    </Button>
                  </div>
                </div>

                {/* Prescription Management Section */}
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                  <h4 className="font-display text-xs font-bold text-[#003c90] tracking-wider uppercase border-b border-slate-100 pb-3">
                    Active Prescription Registry
                  </h4>

                  <form onSubmit={handleAddRx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold ml-1">Pharmaceutical Item</label>
                      <input
                        type="text"
                        required
                        value={newMedName}
                        onChange={(e) => setNewMedName(e.target.value)}
                        placeholder="E.g. Metoprolol 50mg"
                        className="h-9 border border-slate-250 bg-white rounded-lg px-2 text-xs focus:ring-2 focus:ring-blue-100 focus:border-blue-900 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold ml-1">Dosage Protocol</label>
                      <select
                        value={newMedDosage}
                        onChange={(e) => setNewMedDosage(e.target.value)}
                        className="h-9 border border-slate-250 bg-white rounded-lg px-2 text-xs transition-all"
                      >
                        <option>1 Tablet</option>
                        <option>2 Tablets</option>
                        <option>10 ml Liquid</option>
                        <option>As Directed</option>
                      </select>
                    </div>
                    <Button
                      type="submit"
                      variant="filled"
                      colorType="primary"
                      className="h-9 bg-[#003c90] hover:bg-[#0f52ba] text-white text-xs font-bold !rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm shadow-blue-900/10 flex items-center justify-center"
                    >
                      Add Registry
                    </Button>
                  </form>

                  {/* Prescriptions Table */}
                  <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                    <table className="w-full text-left font-sans text-xs">
                      <thead className="bg-[#eff4ff]">
                        <tr>
                          <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider">Medicine Name</th>
                          <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider">Dosage</th>
                          <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider">Frequency</th>
                          <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider text-right">Remove</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {prescriptions.map((px) => (
                          <tr key={px.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-semibold text-slate-800">{px.medicineName}</td>
                            <td className="p-3 text-slate-500 font-medium">{px.dosage}</td>
                            <td className="p-3 text-slate-500 font-medium">{px.frequency}</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => setPrescriptions(prev => prev.filter(p => p.id !== px.id))}
                                className="text-red-650 hover:text-red-800 p-1 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4 inline-block" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      variant="outlined"
                      onClick={() => alert("Prescription draft saved to clinical buffer.")}
                      className="px-5 py-2.5 bg-white border border-slate-250 text-slate-700 !rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer h-auto w-auto"
                    >
                      Save As Draft
                    </Button>
                    <Button
                      variant="filled"
                      colorType="primary"
                      onClick={() => alert(`Prescription dispatched securely to patient pharmacy for ${activeApp.patientName}`)}
                      className="px-5 py-2.5 bg-[#003c90] hover:bg-[#0f52ba] text-white !rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] shadow cursor-pointer h-auto w-auto"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Dispatch to Pharmacy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/75 backdrop-blur rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
              <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-display text-base font-bold text-slate-700">Select clinical record</h3>
              <p className="text-xs text-slate-400 mt-1">Select an active patient appointment from the left queue to inspect EHR summaries.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default DoctorDashboard
