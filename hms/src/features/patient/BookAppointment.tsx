import { useState, useEffect } from 'react'

interface HospitalDto {
  id: string
  name: string
  code: string
}

interface DoctorRecord {
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  hospitalId: string | null
}

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

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:57679'

const BookAppointment = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  
  // Data States
  const [hospitals, setHospitals] = useState<HospitalDto[]>([])
  const [doctors, setDoctors] = useState<DoctorRecord[]>([])
  
  // Loading & Error States
  const [loadingHospitals, setLoadingHospitals] = useState(false)
  const [loadingDoctors, setLoadingDoctors] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form Selections
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('')
  const [selectedDept, setSelectedDept] = useState<string>('general')
  const [selectedDoctorUserId, setSelectedDoctorUserId] = useState<string>('')
  const [patientName, setPatientName] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [patientPhoneNumber, setPatientPhoneNumber] = useState('')
  const [appointmentDateTime, setAppointmentDateTime] = useState('')
  const [reason, setReason] = useState('')
  
  // Success Result
  const [receipt, setReceipt] = useState<AppointmentDto | null>(null)

  // Fetch Hospitals on Mount
  useEffect(() => {
    const fetchHospitals = async () => {
      setLoadingHospitals(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE}/hospitals`)
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        const data = await res.json()
        setHospitals(data)
      } catch (err) {
        console.error('Failed to fetch hospitals:', err)
        setError('Could not connect to the backend server. Please verify if the API is running and the SSL certificate is accepted.')
      } finally {
        setLoadingHospitals(false)
      }
    }
    fetchHospitals()
  }, [])

  // Fetch Doctors when Hospital is Selected
  useEffect(() => {
    if (!selectedHospitalId) {
      setDoctors([])
      return
    }
    const fetchDoctors = async () => {
      setLoadingDoctors(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE}/doctors?hospitalId=${selectedHospitalId}`)
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        const data = await res.json()
        setDoctors(data)
      } catch (err) {
        console.error('Failed to fetch doctors:', err)
        setError('Failed to load doctors for the selected hospital.')
      } finally {
        setLoadingDoctors(false)
      }
    }
    fetchDoctors()
  }, [selectedHospitalId])

  // Get active hospital name
  const activeHospital = hospitals.find(h => h.id === selectedHospitalId)
  // Get active doctor name
  const activeDoctor = doctors.find(d => d.userId === selectedDoctorUserId)

  // Submit Booking to Backend
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedHospitalId || !selectedDoctorUserId || !patientName || !patientEmail || !patientPhoneNumber || !appointmentDateTime || !reason) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        hospitalId: selectedHospitalId,
        patientName,
        patientEmail,
        patientPhoneNumber,
        doctorUserId: selectedDoctorUserId,
        appointmentDateTime: new Date(appointmentDateTime).toISOString(),
        reason
      }

      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Booking failed with status ${res.status}`)
      }

      const newAppointment: AppointmentDto = await res.json()
      
      // Save to local patient appointments list for dashboard persistence
      const savedApps = localStorage.getItem('mediflow_patient_appointments')
      const appList = savedApps ? JSON.parse(savedApps) : []
      appList.unshift(newAppointment)
      localStorage.setItem('mediflow_patient_appointments', JSON.stringify(appList))
      
      setReceipt(newAppointment)
      setStep(4) // Move to receipt step
    } catch (err) {
      console.error('Booking error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fade-up">
      {/* ── Progress Indicators (Only for Steps 1-3) ── */}
      {step <= 3 && (
        <>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>Booking Progress</h1>
            <span style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>Step {step} of 3</span>
          </div>

          <div className="progress-bar" style={{ marginBottom: 'var(--sp-lg)' }}>
            <div className={`progress-step ${step >= 1 ? 'progress-step--active' : ''}`}>
              <div className="progress-step__dot" />
              <div className="progress-step__label">Hospital</div>
            </div>
            <div className="progress-line" />
            <div className={`progress-step ${step >= 2 ? 'progress-step--active' : ''}`}>
              <div className="progress-step__dot" />
              <div className="progress-step__label">Doctor</div>
            </div>
            <div className="progress-line" />
            <div className={`progress-step ${step >= 3 ? 'progress-step--active' : ''}`}>
              <div className="progress-step__dot" />
              <div className="progress-step__label">Details & Time</div>
            </div>
          </div>
        </>
      )}

      {/* ── Error Notification banner ── */}
      {error && (
        <div className="error-message" role="alert" style={{ marginBottom: 'var(--sp-md)', padding: 'var(--sp-sm)', background: 'var(--error-container)', color: 'var(--error)', borderRadius: 'var(--r-lg)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="material-symbols-outlined">error</span>
          <div style={{ fontSize: 13, flex: 1 }}>
            {error}
            {error.includes('SSL') && (
              <div style={{ marginTop: 6, fontWeight: 600 }}>
                <a href={`${API_BASE}/hospitals`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--error)', textDecoration: 'underline' }}>
                  Click here to open and accept the API certificate in your browser
                </a>, then refresh this page.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 1: SELECT HOSPITAL & DEPT ── */}
      {step === 1 && (
        <div className="fade-up">
          <div className="page-header" style={{ marginTop: 'var(--sp-xs)', marginBottom: 'var(--sp-md)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Select Hospital Location</h2>
            <p>Choose the facility you would like to book into.</p>
          </div>

          {loadingHospitals ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', gap: 'var(--sp-xs)', alignItems: 'center', color: 'var(--primary)' }}>
              <span className="spinner" style={{ borderColor: 'currentColor', borderTopColor: 'transparent' }} />
              <span>Fetching medical centers...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-lg)' }}>
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className={`glass-card glass-card--flat ${selectedHospitalId === hospital.id ? 'dept-card--selected' : ''}`}
                  onClick={() => setSelectedHospitalId(hospital.id)}
                  style={{
                    padding: 'var(--sp-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--sp-md)',
                    transition: 'all 0.2s ease',
                    border: selectedHospitalId === hospital.id ? '2px solid var(--primary)' : '1px solid var(--surface-container-high)',
                    borderRadius: 'var(--r-lg)'
                  }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: selectedHospitalId === hospital.id ? 'var(--primary-fixed)' : 'var(--surface-container-high)',
                    color: selectedHospitalId === hospital.id ? 'var(--primary)' : 'var(--outline)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 26 }}>local_hospital</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: 'var(--on-surface)' }}>{hospital.name}</h3>
                    <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', letterSpacing: '0.05em' }}>{hospital.code}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: selectedHospitalId === hospital.id ? 'var(--primary)' : 'var(--outline-variant)' }}>
                    {selectedHospitalId === hospital.id ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Department Quick Filter (Visual only, matches Stitch Design spec) */}
          <div style={{ marginTop: 'var(--sp-md)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 'var(--sp-sm)' }}>Specialty Area</h3>
            <div className="dept-grid" style={{ marginBottom: 'var(--sp-xl)', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--sp-sm)' }}>
              {[
                { id: 'cardiology', name: 'Cardiology', icon: 'monitor_heart', color: 'cardio' },
                { id: 'neurology', name: 'Neurology', icon: 'psychology', color: 'neuro' },
                { id: 'pediatrics', name: 'Pediatrics', icon: 'child_care', color: 'pedia' },
                { id: 'general', name: 'General Medicine', icon: 'stethoscope', color: 'ortho' },
              ].map(dept => (
                <div
                  key={dept.id}
                  className={`dept-card ${selectedDept === dept.id ? 'dept-card--selected' : ''}`}
                  onClick={() => setSelectedDept(dept.id)}
                  style={{ padding: 'var(--sp-sm)', minHeight: 90 }}
                >
                  <div className={`dept-card__icon dept-card__icon--${dept.color}`} style={{ width: 40, height: 40 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{dept.icon}</span>
                  </div>
                  <span className="dept-card__name" style={{ fontSize: 13, marginTop: 8 }}>{dept.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn-primary"
            disabled={!selectedHospitalId}
            onClick={() => setStep(2)}
            style={{ width: '100%', display: 'flex', justifyContent: 'center', opacity: selectedHospitalId ? 1 : 0.6 }}
          >
            Continue to Doctors
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}

      {/* ── STEP 2: SELECT DOCTOR ── */}
      {step === 2 && (
        <div className="fade-up">
          <div className="page-header" style={{ marginTop: 'var(--sp-xs)', marginBottom: 'var(--sp-md)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Select Practitioner</h2>
            <p>Choose the doctor you would like to consult with at {activeHospital?.name}.</p>
          </div>

          {loadingDoctors ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', gap: 'var(--sp-xs)', alignItems: 'center', color: 'var(--primary)' }}>
              <span className="spinner" style={{ borderColor: 'currentColor', borderTopColor: 'transparent' }} />
              <span>Fetching medical specialists...</span>
            </div>
          ) : doctors.length === 0 ? (
            <div className="glass-card glass-card--flat" style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--on-surface-variant)', marginBottom: 'var(--sp-lg)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)', marginBottom: 8 }}>person_off</span>
              <p style={{ margin: 0 }}>No doctors are currently available at this hospital facility.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-lg)' }}>
              {doctors.map((doctor) => (
                <div
                  key={doctor.userId}
                  className={`glass-card glass-card--flat ${selectedDoctorUserId === doctor.userId ? 'dept-card--selected' : ''}`}
                  onClick={() => setSelectedDoctorUserId(doctor.userId)}
                  style={{
                    padding: 'var(--sp-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--sp-md)',
                    transition: 'all 0.2s ease',
                    border: selectedDoctorUserId === doctor.userId ? '2px solid var(--primary)' : '1px solid var(--surface-container-high)',
                    borderRadius: 'var(--r-lg)'
                  }}
                >
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: selectedDoctorUserId === doctor.userId ? 'var(--primary-fixed)' : 'var(--surface-container-high)',
                    color: selectedDoctorUserId === doctor.userId ? 'var(--primary)' : 'var(--outline)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '2px solid var(--outline-variant)'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>doctor</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: 'var(--on-surface)' }}>{doctor.fullName || 'Medical Specialist'}</h3>
                    <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>{doctor.email}</div>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: selectedDoctorUserId === doctor.userId ? 'var(--primary)' : 'var(--outline-variant)' }}>
                    {selectedDoctorUserId === doctor.userId ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 'var(--sp-md)' }}>
            <button
              className="btn-secondary"
              onClick={() => setStep(1)}
              style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button
              className="btn-primary"
              disabled={!selectedDoctorUserId}
              onClick={() => setStep(3)}
              style={{ flex: 2, display: 'flex', justifyContent: 'center', opacity: selectedDoctorUserId ? 1 : 0.6 }}
            >
              Continue to Details
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: DETAILS & SUBMIT ── */}
      {step === 3 && (
        <div className="fade-up">
          <div className="page-header" style={{ marginTop: 'var(--sp-xs)', marginBottom: 'var(--sp-md)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Appointment Details</h2>
            <p>Please enter your contact information and select an appointment time.</p>
          </div>

          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', marginBottom: 'var(--sp-lg)' }}>
            {/* Patient Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="patient-name">Patient Full Name</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined">person</span>
                <input
                  id="patient-name"
                  className="form-input"
                  placeholder="e.g. Jane Doe"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Patient Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="patient-email">Contact Email</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined">mail</span>
                <input
                  id="patient-email"
                  type="email"
                  className="form-input"
                  placeholder="e.g. jane.doe@example.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Patient Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="patient-phone">Phone Number</label>
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

            {/* Date and Time Selector */}
            <div className="form-group">
              <label className="form-label" htmlFor="appt-datetime">Appointment Date & Time</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined">calendar_today</span>
                <input
                  id="appt-datetime"
                  type="datetime-local"
                  className="form-input"
                  value={appointmentDateTime}
                  onChange={(e) => setAppointmentDateTime(e.target.value)}
                  required
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Booking Reason */}
            <div className="form-group">
              <label className="form-label" htmlFor="appt-reason">Reason for Consultation</label>
              <div className="input-wrapper" style={{ alignItems: 'flex-start', paddingTop: 8 }}>
                <span className="material-symbols-outlined" style={{ marginTop: 2 }}>description</span>
                <textarea
                  id="appt-reason"
                  className="form-input"
                  placeholder="Please briefly describe your clinical symptoms or consultation request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  required
                  style={{ resize: 'none', background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'var(--on-surface)' }}
                />
              </div>
            </div>

            {/* Actions Buttons */}
            <div style={{ display: 'flex', gap: 'var(--sp-md)', marginTop: 'var(--sp-sm)' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(2)}
                disabled={submitting}
                style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={submitting}
                style={{ flex: 2, display: 'flex', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? (
                  <>
                    <span className="spinner" style={{ borderColor: '#fff', borderTopColor: 'transparent', marginRight: 8 }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book Appointment
                    <span className="material-symbols-outlined">check</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── STEP 4: BEAUTIFUL RECEIPT / SUCCESS STATE ── */}
      {step === 4 && receipt && (
        <div className="fade-up" style={{ textAlign: 'center', padding: 'var(--sp-sm) 0' }}>
          {/* Animated Success Badge */}
          <div style={{ display: 'inline-flex', width: 68, height: 68, borderRadius: '50%', background: 'rgba(109,245,225,.2)', color: 'var(--secondary)', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-md)', border: '2px solid var(--secondary)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 36 }}>verified</span>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--on-surface)', margin: '0 0 8px 0' }}>Appointment Booked!</h2>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: 15, margin: '0 0 var(--sp-lg) 0' }}>Your consultation request has been submitted successfully and is currently pending doctor review.</p>

          {/* Premium Ticket Receipt card */}
          <div className="glass-card medical-glow" style={{ padding: 'var(--sp-md)', borderRadius: 'var(--r-xl)', textAlign: 'left', background: 'var(--surface-container-high)', border: '1px solid var(--primary-fixed-dim)', margin: '0 auto var(--sp-xl) auto', maxWidth: 460 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-container-highest)', paddingBottom: 'var(--sp-sm)', marginBottom: 'var(--sp-md)' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>BOOKING REFERENCE</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace', marginTop: 2 }}>{receipt.id.substring(0, 8).toUpperCase()}</div>
              </div>
              <span className="badge badge--pending" style={{ height: 'fit-content' }}>PENDING</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>HOSPITAL LOCATION</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)', marginTop: 2 }}>{receipt.hospitalName || activeHospital?.name}</div>
              </div>

              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>PRACTITIONER</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)', marginTop: 2 }}>{receipt.doctorName || activeDoctor?.fullName}</div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--sp-md)' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>DATE & TIME</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)', marginTop: 2 }}>
                    {new Date(receipt.appointmentDateTime).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 1 }}>
                    {new Date(receipt.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>PATIENT</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)', marginTop: 2 }}>{receipt.patientName}</div>
                  <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 1 }}>{receipt.patientPhoneNumber}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--surface-container-highest)', paddingTop: 'var(--sp-sm)', marginTop: 'var(--sp-xs)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--outline)' }}>REASON FOR VISIT</span>
                <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginTop: 4, fontStyle: 'italic' }}>"{receipt.reason}"</div>
              </div>
            </div>
          </div>

          {/* Complete Flow actions */}
          <button
            className="btn-primary"
            onClick={() => {
              // Reset wizard state
              setStep(1)
              setSelectedHospitalId('')
              setSelectedDoctorUserId('')
              setPatientName('')
              setPatientEmail('')
              setPatientPhoneNumber('')
              setAppointmentDateTime('')
              setReason('')
              setReceipt(null)
            }}
            style={{ display: 'inline-flex', gap: 8 }}
          >
            <span className="material-symbols-outlined">restart_alt</span>
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  )
}

export default BookAppointment
