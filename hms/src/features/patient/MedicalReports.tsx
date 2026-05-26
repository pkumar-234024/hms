import { useState } from 'react'

const MedicalReports = () => {
  const [filter, setFilter] = useState('all')

  return (
    <div className="fade-up">
      <div className="page-header">
        <h1>Medical Records</h1>
        <p>Manage and access your diagnostic reports securely.</p>
      </div>

      <div className="upload-area" style={{ marginBottom: 'var(--sp-lg)' }}>
        <span className="material-symbols-outlined">cloud_upload</span>
        <div className="upload-area__title">Upload New Report</div>
        <div className="upload-area__desc">Drag and drop your medical documents here, or click to browse files (PDF, JPG, PNG).</div>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 'var(--sp-md)', marginBottom: 'var(--sp-sm)' }}>
        <button className={`btn-chip ${filter === 'all' ? 'btn-chip--active' : ''}`} onClick={() => setFilter('all')}>All Reports</button>
        <button className={`btn-chip ${filter === 'lab' ? 'btn-chip--active' : ''}`} onClick={() => setFilter('lab')}>Laboratory</button>
        <button className={`btn-chip ${filter === 'rad' ? 'btn-chip--active' : ''}`} onClick={() => setFilter('rad')}>Radiology</button>
        <button className={`btn-chip ${filter === 'vac' ? 'btn-chip--active' : ''}`} onClick={() => setFilter('vac')}>Vaccination</button>
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', marginBottom: 'var(--sp-sm)' }}>PROCESSING</div>
      
      <div className="glass-card glass-card--flat" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-lg)', borderLeft: '4px solid var(--secondary)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: 'var(--surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
          <span className="material-symbols-outlined">description</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>MRI_Brain_Scan_Final.pdf</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--secondary)' }}>85%</span>
          </div>
          <div className="capacity-bar__track" style={{ height: 4 }}>
            <div className="capacity-bar__fill capacity-bar__fill--secondary" style={{ width: '85%' }} />
          </div>
        </div>
        <button style={{ border: 'none', background: 'none', color: 'var(--outline)', cursor: 'pointer', display: 'flex' }}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div>
        <div className="report-card">
          <div className="report-card__image">
            <span className="material-symbols-outlined">radiology</span>
            <span className="report-card__category report-card__category--radiology">Radiology</span>
          </div>
          <div className="report-card__body">
            <div className="report-card__title">Full Body MRI Scan</div>
            <div className="report-card__date">Uploaded Oct 24, 2023</div>
            <div className="report-card__footer">
              <div className="report-card__status report-card__status--verified">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                Verified
              </div>
              <div className="report-card__actions">
                <button className="report-card__action-btn report-card__action-btn--outline"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>visibility</span></button>
                <button className="report-card__action-btn"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span></button>
              </div>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-card__image">
            <span className="material-symbols-outlined">biotech</span>
            <span className="report-card__category report-card__category--laboratory">Laboratory</span>
          </div>
          <div className="report-card__body">
            <div className="report-card__title">Annual Blood Panel</div>
            <div className="report-card__date">Uploaded Sep 12, 2023</div>
            <div className="report-card__footer">
              <div className="report-card__status report-card__status--review">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                Requires Review
              </div>
              <div className="report-card__actions">
                <button className="report-card__action-btn report-card__action-btn--outline"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>visibility</span></button>
                <button className="report-card__action-btn"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span></button>
              </div>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-card__image">
            <span className="material-symbols-outlined">vaccines</span>
            <span className="report-card__category report-card__category--vaccination">Vaccination</span>
          </div>
          <div className="report-card__body">
            <div className="report-card__title">COVID-19 Booster Cert</div>
            <div className="report-card__date">Uploaded Aug 05, 2023</div>
            <div className="report-card__footer">
              <div className="report-card__status report-card__status--verified">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                Verified
              </div>
              <div className="report-card__actions">
                <button className="report-card__action-btn report-card__action-btn--outline"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>visibility</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="fab">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  )
}

export default MedicalReports
