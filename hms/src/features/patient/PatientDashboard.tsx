import { useState, useEffect } from 'react'

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
  const [appointments, setAppointments] = useState<AppointmentDto[]>([])

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
        time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    } catch (e) {
      return { day: '15', month: 'OCT', time: '10:00 AM' }
    }
  }

  // Display appointments: if empty, show static placeholders for visual richness
  const listToRender = appointments.length > 0 
    ? appointments.map((appt, idx) => {
        const details = getApptDateDetails(appt.appointmentDateTime)
        return {
          id: appt.id,
          date: details.day,
          month: details.month,
          title: appt.reason,
          subtitle: `${appt.doctorName || 'Specialist'} • ${details.time}`,
          status: appt.status.toUpperCase(),
          active: idx === 0
        }
      })
    : [
        { id: '1', date: '14', month: 'OCT', title: 'General Checkup', subtitle: 'Dr. Default Doctor • 10:30 AM', status: 'PENDING', active: true },
        { id: '2', date: '22', month: 'OCT', title: 'Blood Work Consultation', subtitle: 'Dr. Default West Doctor • 08:00 AM', status: 'PENDING', active: false },
      ]

  return (
    <div className="fade-up">
      <div className="page-header" style={{ marginBottom: 'var(--sp-md)' }}>
        <h1>Hello, Patient</h1>
        <p>Your health metrics and consultations at a glance.</p>
      </div>

      {/* ── Vitals Chart ── */}
      <div className="glass-card glass-card--flat" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.06em', color: 'var(--on-surface-variant)' }}>HEART RATE</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'baseline', gap: 4 }}>
              72 <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--on-surface)' }}>BPM</span>
            </div>
          </div>
          <div className="badge badge--stable" style={{ fontSize: 11, padding: '4px 8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_down</span> 2%
          </div>
        </div>
        <div className="chart-bars" style={{ height: 140, marginTop: 'var(--sp-sm)' }}>
          {[50, 60, 80, 70, 90, 60, 45].map((h, i) => (
            <div key={i} className="chart-bar" style={{ height: `${h}%`, background: i === 4 ? 'var(--primary)' : 'var(--primary-fixed-dim)', opacity: i === 4 ? 1 : .6, borderRadius: 2 }} />
          ))}
        </div>
        <div className="chart-labels" style={{ marginTop: 8 }}>
          <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
        </div>
      </div>

      {/* ── Upcoming Appointments Section ── */}
      <div style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="section-header">
          <h2 className="section-title" style={{ fontSize: 16 }}>Upcoming Consultations</h2>
          <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>Active</span>
        </div>
        
        {listToRender.map((appt) => (
          <div key={appt.id} className={`appointment-card ${appt.active ? 'appointment-card--active' : ''}`} style={{ position: 'relative' }}>
            <div className="appointment-card__date" style={{ background: appt.active ? 'var(--primary-fixed)' : 'var(--surface-container-high)' }}>
              <div className="appointment-card__date-month" style={{ color: appt.active ? 'var(--primary)' : 'var(--on-surface-variant)' }}>{appt.month}</div>
              <div className="appointment-card__date-day" style={{ color: appt.active ? 'var(--primary)' : 'var(--on-surface-variant)' }}>{appt.date}</div>
            </div>
            <div className="appointment-card__info" style={{ flex: 1 }}>
              <div className="appointment-card__title" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {appt.title}
                <span className={`badge ${appt.status === 'APPROVED' ? 'badge--stable' : appt.status === 'DECLINED' ? 'badge--urgent' : 'badge--pending'}`} style={{ fontSize: 9, padding: '2px 6px', display: 'inline-block' }}>
                  {appt.status}
                </span>
              </div>
              <div className="appointment-card__subtitle">{appt.subtitle}</div>
            </div>
            <span className="material-symbols-outlined appointment-card__arrow">chevron_right</span>
          </div>
        ))}
      </div>

      {/* ── Recent Reports ── */}
      <div style={{ marginBottom: 'var(--sp-xl)' }}>
        <h2 className="section-title" style={{ fontSize: 16, marginBottom: 'var(--sp-md)' }}>Recent Medical Reports</h2>
        <div className="glass-card glass-card--flat" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { icon: 'description', color: 'error', title: 'ECG Report.pdf', meta: 'Sep 28, 2023 • 2.4 MB' },
            { icon: 'troubleshoot', color: 'secondary', title: 'Lipid Profile', meta: 'Sep 15, 2023 • 1.1 MB' },
          ].map((report, idx) => (
            <div key={report.title} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', padding: 'var(--sp-md)', borderBottom: idx === 0 ? '1px solid var(--surface-container-high)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--r-lg)', background: report.color === 'error' ? 'var(--error-container)' : 'rgba(109,245,225,.2)', color: report.color === 'error' ? 'var(--error)' : 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">{report.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--on-surface)' }}>{report.title}</div>
                <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginTop: 2 }}>{report.meta}</div>
              </div>
              <button style={{ width: 40, height: 40, border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24 }}>download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat CTA ── */}
      <div className="chat-cta">
        <div className="chat-cta__avatar">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="chat-cta__text">
          <div className="chat-cta__title">Chat with Dr. Default Doctor</div>
          <div className="chat-cta__subtitle">
            Available now <span className="chat-cta__dot" />
          </div>
        </div>
        <span className="material-symbols-outlined chat-cta__icon">chat</span>
      </div>
    </div>
  )
}

export default PatientDashboard
