import { useState } from 'react'

const DoctorManagement = () => {
  const [filter, setFilter] = useState('all')

  const doctors = [
    { name: 'Dr. Michael Chen', role: 'Chief of Cardiology', id: '4421', status: 'ACTIVE' },
    { name: 'Dr. Sarah Jenkins', role: 'Neurosurgeon', id: '8892', status: 'PENDING', requiresVerification: true },
    { name: 'Dr. James Wilson', role: 'Pediatric Specialist', id: '1024', status: 'ACTIVE', lastActive: '2h ago' },
  ]

  return (
    <div className="fade-up">
      <div className="page-header">
        <h1>Staff Management</h1>
        <p>Manage medical professionals and their clinical access.</p>
      </div>

      {/* Search & Filter */}
      <div className="glass-card glass-card--flat" style={{ marginBottom: 'var(--sp-lg)' }}>
        <div className="input-wrapper" style={{ marginBottom: 'var(--sp-sm)' }}>
          <span className="material-symbols-outlined">search</span>
          <input className="input-field" placeholder="Search by name or specialty..." />
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          <button className={`btn-chip ${filter === 'all' ? 'btn-chip--active' : ''}`} onClick={() => setFilter('all')}>All Doctors</button>
          <button className={`btn-chip ${filter === 'cardio' ? 'btn-chip--active' : ''}`} onClick={() => setFilter('cardio')}>Cardiology</button>
          <button className={`btn-chip ${filter === 'pedia' ? 'btn-chip--active' : ''}`} onClick={() => setFilter('pedia')}>Pediatrics</button>
        </div>
      </div>

      {/* Doctor List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', marginBottom: 'var(--sp-xl)' }}>
        {doctors.map((doc) => (
          <div key={doc.id} className="glass-card glass-card--flat" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="doctor-card" style={{ borderBottom: 'none' }}>
              <div className="doctor-card__top">
                <div className="doctor-card__avatar">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="doctor-card__info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="doctor-card__name">{doc.name}</div>
                    <span className={`badge badge--${doc.status.toLowerCase()}`}>{doc.status}</span>
                  </div>
                  <div className="doctor-card__specialty">{doc.role}</div>
                  <div className="doctor-card__id">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>badge</span>
                    Hosp-ID: {doc.id}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div style={{ background: 'var(--surface)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--surface-container-high)' }}>
                {doc.requiresVerification ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--error)', fontSize: 13, fontWeight: 500 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>warning</span>
                      Verification Required
                    </div>
                    <button className="section-link" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Approve <span className="material-symbols-outlined" style={{ fontSize: 18 }}>verified</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {doc.lastActive ? (
                        <span style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>Last Active: {doc.lastActive}</span>
                      ) : (
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--secondary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
                          {doc.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <button className="section-link" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      View Profile <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="pagination__info">Showing 3 of 124 Doctors</span>
        <button className="pagination__btn"><span className="material-symbols-outlined">chevron_left</span></button>
        <button className="pagination__btn pagination__btn--active">1</button>
        <button className="pagination__btn">2</button>
        <button className="pagination__btn">...</button>
        <button className="pagination__btn"><span className="material-symbols-outlined">chevron_right</span></button>
      </div>

      <button className="fab">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  )
}

export default DoctorManagement
