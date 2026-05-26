const AdminDashboard = () => (
  <div className="fade-up">
    <div className="page-header">
      <h1>Admin Overview</h1>
      <p>Hospital performance and staff metrics</p>
    </div>

    {/* Stats Grid */}
    <div className="stats-grid" style={{ marginBottom: 'var(--sp-lg)' }}>
      {[
        { icon: 'group', color: 'primary', label: 'Total Doctors', value: '124', change: '+2', trend: 'up' },
        { icon: 'person_search', color: 'secondary', label: 'Total Patients', value: '8,420', change: '+140', trend: 'up' },
        { icon: 'payments', color: 'primary', label: 'Monthly Rev', value: '$1.2M', change: '+5.4%', trend: 'up' },
        { icon: 'bed', color: 'error', label: 'Available Beds', value: '42', change: '-12', trend: 'down' },
      ].map((s) => (
        <div key={s.label} className="stat-card">
          <div className={`stat-card__icon stat-card__icon--${s.color}`}>
            <span className="material-symbols-outlined">{s.icon}</span>
          </div>
          <div className="stat-card__label">{s.label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div className="stat-card__value">{s.value}</div>
            <div className={`stat-card__change stat-card__change--${s.trend}`}>
              {s.change} {s.trend === 'up' ? '↑' : '↓'}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Revenue Analytics Placeholder */}
    <div className="glass-card" style={{ marginBottom: 'var(--sp-lg)' }}>
      <div className="section-header" style={{ marginBottom: 'var(--sp-xs)' }}>
        <h2 className="section-title" style={{ fontSize: 18 }}>Revenue Analytics</h2>
        <select style={{ background: 'transparent', border: 'none', color: 'var(--on-surface-variant)', fontSize: 14, fontWeight: 500, outline: 'none' }}>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="chart-bars">
        {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
          <div key={i} className="chart-bar" style={{ height: `${h}%`, background: 'var(--primary)' }} />
        ))}
      </div>
      <div className="chart-labels">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </div>

    {/* Staff Capacity */}
    <div className="glass-card" style={{ marginBottom: 'var(--sp-lg)' }}>
      <h2 className="section-title" style={{ fontSize: 18, marginBottom: 'var(--sp-md)' }}>Staff Capacity</h2>
      <div className="capacity-bar">
        <div className="capacity-bar__header">
          <span className="capacity-bar__label">Surgery Department</span>
          <span className="capacity-bar__value" style={{ color: 'var(--error)' }}>94%</span>
        </div>
        <div className="capacity-bar__track">
          <div className="capacity-bar__fill capacity-bar__fill--primary" style={{ width: '94%', background: 'var(--error)' }} />
        </div>
      </div>
      <div className="capacity-bar">
        <div className="capacity-bar__header">
          <span className="capacity-bar__label">Emergency Ward</span>
          <span className="capacity-bar__value">78%</span>
        </div>
        <div className="capacity-bar__track">
          <div className="capacity-bar__fill capacity-bar__fill--secondary" style={{ width: '78%' }} />
        </div>
      </div>
      <div className="capacity-bar">
        <div className="capacity-bar__header">
          <span className="capacity-bar__label">Pediatrics</span>
          <span className="capacity-bar__value">45%</span>
        </div>
        <div className="capacity-bar__track">
          <div className="capacity-bar__fill capacity-bar__fill--primary" style={{ width: '45%' }} />
        </div>
      </div>
    </div>

    {/* Activity Feed */}
    <div style={{ marginBottom: 'var(--sp-lg)' }}>
      <h2 className="section-title" style={{ fontSize: 18, marginBottom: 'var(--sp-md)' }}>Recent Activity</h2>
      {[
        { icon: 'person_add', color: 'teal', title: 'New Admission', subtitle: 'Sarah Jenkins • Room 402', time: '10m' },
        { icon: 'science', color: 'blue', title: 'Lab Results Ready', subtitle: 'Batch #4429', time: '1h' },
        { icon: 'receipt_long', color: 'gray', title: 'Bulk Invoice Generated', subtitle: 'Insurance batch', time: '2h' },
      ].map((a) => (
        <div key={a.title} className="activity-item">
          <div className={`activity-item__icon activity-item__icon--${a.color}`}>
            <span className="material-symbols-outlined">{a.icon}</span>
          </div>
          <div className="activity-item__text">
            <div className="activity-item__title">{a.title}</div>
            <div className="activity-item__subtitle">{a.subtitle}</div>
          </div>
          <div className="activity-item__arrow">{a.time}</div>
        </div>
      ))}
    </div>
  </div>
)

export default AdminDashboard
