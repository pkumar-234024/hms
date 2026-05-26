import { useState, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'

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
      // The backend returns a PagedResultOfAppointmentDto, so we get the list of items
      setAppointments(data.items || [])
    } catch (err) {
      console.error('Failed to load appointments:', err)
      setError(err instanceof Error ? err.message : 'Failed to retrieve appointments from the database.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [accessToken])

  // Resolve Action: Approve
  const handleApprove = async (id: string) => {
    if (!accessToken) return
    setResolvingId(id)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error(`Failed to approve: HTTP ${res.status}`)
      }

      // Refresh list
      await fetchAppointments()
      setSelectedApptId(null)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to approve appointment.')
    } finally {
      setResolvingId(null)
    }
  }

  // Resolve Action: Decline
  const handleDecline = async (id: string) => {
    if (!accessToken) return
    setResolvingId(id)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/decline`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ reason: declineReason.trim() })
      })

      if (!res.ok) {
        throw new Error(`Failed to decline: HTTP ${res.status}`)
      }

      // Reset decline input & refresh
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

  // Statistics counters
  const pendingCount = appointments.filter(a => a.status === 'Pending').length
  const approvedCount = appointments.filter(a => a.status === 'Approved').length
  const declinedCount = appointments.filter(a => a.status === 'Declined').length

  return (
    <div className="fade-up">
      {/* ── Doctor Profile Card ── */}
      <div className="glass-card glass-card--flat" style={{ marginBottom: 'var(--sp-md)' }}>
        <div style={{ display: 'flex', gap: 'var(--sp-md)', alignItems: 'center' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--surface-container-high)',
            border: '3px solid var(--primary-fixed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--primary)' }}>doctor</span>
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--on-surface)', marginBottom: 2 }}>
              Dr. {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Julian Vance'}
            </h1>
            <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 8 }}>
              {user?.email || 'doctor@hospital.com'} • {user?.hospitalName || 'Meridian Downtown Hospital'}
            </div>
            <span className="badge badge--on-duty">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--secondary)' }} />
              CLINICAL ON-DUTY
            </span>
          </div>
        </div>
      </div>

      {/* ── Error Notification banner ── */}
      {error && (
        <div className="error-message" role="alert" style={{ marginBottom: 'var(--sp-md)', padding: 'var(--sp-sm)', background: 'var(--error-container)', color: 'var(--error)', borderRadius: 'var(--r-lg)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="material-symbols-outlined">error</span>
          <div style={{ fontSize: 13, flex: 1 }}>{error}</div>
        </div>
      )}

      {/* ── Statistics Summary Cards ── */}
      <div className="stats-grid" style={{ marginBottom: 'var(--sp-lg)', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-sm)' }}>
        <div className="glass-card glass-card--flat" style={{ padding: 'var(--sp-sm)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>PENDING</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary)', marginTop: 4 }}>{pendingCount}</div>
        </div>
        <div className="glass-card glass-card--flat" style={{ padding: 'var(--sp-sm)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>APPROVED</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--secondary)', marginTop: 4 }}>{approvedCount}</div>
        </div>
        <div className="glass-card glass-card--flat" style={{ padding: 'var(--sp-sm)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>DECLINED</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--error)', marginTop: 4 }}>{declinedCount}</div>
        </div>
      </div>

      {/* ── Schedule Header with Refresh ── */}
      <div className="section-header" style={{ marginBottom: 'var(--sp-md)' }}>
        <h2 className="section-title" style={{ fontSize: 18 }}>Schedule & Consultation Requests</h2>
        <button
          className="section-link"
          onClick={fetchAppointments}
          disabled={loading}
          style={{ display: 'flex', gap: 4, alignItems: 'center', cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--primary)' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, animation: loading ? 'spin 1s linear infinite' : 'none' }}>refresh</span>
          Refresh
        </button>
      </div>

      {/* ── Appointments Feed ── */}
      {loading && appointments.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', gap: 'var(--sp-xs)', alignItems: 'center', color: 'var(--primary)' }}>
          <span className="spinner" style={{ borderColor: 'currentColor', borderTopColor: 'transparent' }} />
          <span>Synchronizing patient records...</span>
        </div>
      ) : appointments.length === 0 ? (
        <div className="glass-card" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 52, color: 'var(--outline-variant)', marginBottom: 12 }}>calendar_today</span>
          <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 600 }}>No Consultations Yet</h3>
          <p style={{ margin: 0, fontSize: 13 }}>Pending booking requests submitted via the patient portal will display here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
          {appointments.map((appt) => {
            const isSelected = selectedApptId === appt.id
            const dateObj = new Date(appt.appointmentDateTime)
            const timeFormatted = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            const dateFormatted = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
            
            return (
              <div
                key={appt.id}
                className="glass-card glass-card--flat"
                style={{
                  padding: 'var(--sp-sm)',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--surface-container-high)',
                  borderRadius: 'var(--r-lg)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (resolvingId) return
                  setSelectedApptId(isSelected ? null : appt.id)
                  setShowDeclineForm(null)
                  setDeclineReason('')
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)' }}>
                  <div style={{
                    minWidth: 54,
                    padding: '6px 0',
                    background: 'var(--primary-fixed)',
                    borderRadius: 'var(--r-lg)',
                    textAlign: 'center',
                    color: 'var(--primary)'
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{timeFormatted}</div>
                    <div style={{ fontSize: 10, fontWeight: 500 }}>{dateFormatted.split(' ')[0]}</div>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--on-surface)' }}>{appt.patientName}</span>
                      <span className={`badge ${
                        appt.status === 'Approved' ? 'badge--stable' : appt.status === 'Declined' ? 'badge--urgent' : 'badge--pending'
                      }`} style={{ fontSize: 10 }}>
                        {appt.status.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginTop: 2 }}>{appt.reason}</div>
                  </div>
                  
                  <span className="material-symbols-outlined" style={{ color: 'var(--outline-variant)', transform: isSelected ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                    chevron_right
                  </span>
                </div>

                {/* Expanded Resolution Details Drawer */}
                {isSelected && (
                  <div
                    style={{
                      marginTop: 'var(--sp-md)',
                      paddingTop: 'var(--sp-md)',
                      borderTop: '1px solid var(--surface-container-highest)',
                      cursor: 'default'
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inner fields
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-md)', marginBottom: 'var(--sp-md)' }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>EMAIL ADDRESS</div>
                        <div style={{ fontSize: 13, color: 'var(--on-surface)', marginTop: 2 }}>{appt.patientEmail}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>PHONE NUMBER</div>
                        <div style={{ fontSize: 13, color: 'var(--on-surface)', marginTop: 2 }}>{appt.patientPhoneNumber}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: 'var(--sp-md)' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>HOSPITAL DESTINATION</div>
                      <div style={{ fontSize: 13, color: 'var(--on-surface)', marginTop: 2 }}>{appt.hospitalName}</div>
                    </div>

                    {appt.status === 'Pending' && (
                      <div>
                        {showDeclineForm === appt.id ? (
                          /* Decline Feedback Form */
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)', marginTop: 'var(--sp-sm)' }}>
                            <div className="form-group" style={{ margin: 0 }}>
                              <label className="form-label" style={{ fontSize: 12 }}>Reason for Decline (Decision Note)</label>
                              <div className="input-wrapper" style={{ padding: '8px 12px' }}>
                                <input
                                  className="form-input"
                                  placeholder="e.g. Schedule conflict, practitioner unavailable..."
                                  value={declineReason}
                                  onChange={(e) => setDeclineReason(e.target.value)}
                                  disabled={resolvingId === appt.id}
                                  style={{ padding: 0 }}
                                />
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
                              <button
                                className="btn-secondary"
                                onClick={() => {
                                  setShowDeclineForm(null)
                                  setDeclineReason('')
                                }}
                                disabled={resolvingId === appt.id}
                                style={{ flex: 1, height: 36, padding: '0 var(--sp-sm)' }}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn-primary"
                                onClick={() => handleDecline(appt.id)}
                                disabled={resolvingId === appt.id}
                                style={{ flex: 2, height: 36, padding: '0 var(--sp-sm)', background: 'var(--error)', border: 'none', color: '#fff', display: 'flex', justifyContent: 'center' }}
                              >
                                {resolvingId === appt.id ? <span className="spinner" style={{ borderColor: '#fff', borderTopColor: 'transparent', width: 16, height: 16 }} /> : 'Submit Decline'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Standard Approve/Decline Choices */
                          <div style={{ display: 'flex', gap: 'var(--sp-sm)', marginTop: 'var(--sp-sm)' }}>
                            <button
                              className="btn-secondary"
                              onClick={() => setShowDeclineForm(appt.id)}
                              disabled={resolvingId === appt.id}
                              style={{ flex: 1, color: 'var(--error)', border: '1px solid var(--error-container)', display: 'flex', justifyContent: 'center', gap: 6 }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                              Decline Request
                            </button>
                            <button
                              className="btn-primary"
                              onClick={() => handleApprove(appt.id)}
                              disabled={resolvingId === appt.id}
                              style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 6 }}
                            >
                              {resolvingId === appt.id ? (
                                <span className="spinner" style={{ borderColor: '#fff', borderTopColor: 'transparent', width: 16, height: 16 }} />
                              ) : (
                                <>
                                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check</span>
                                  Approve Request
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {appt.status !== 'Pending' && (
                      <div style={{ borderTop: '1px dashed var(--surface-container-highest)', paddingTop: 'var(--sp-sm)', marginTop: 'var(--sp-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>RESOLUTION ARCHIVE</span>
                          {appt.reviewedAt && (
                            <span style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>
                              {new Date(appt.reviewedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        {appt.decisionNote ? (
                          <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', fontStyle: 'italic' }}>
                            Decision Note: "{appt.decisionNote}"
                          </div>
                        ) : (
                          <div style={{ fontSize: 12, color: 'var(--outline)' }}>Approved under standard protocol.</div>
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
    </div>
  )
}

export default DoctorDashboard
