import { Link } from 'react-router-dom'

const AboutPage = () => (
  <div className="fade-up" style={{ paddingTop: '1rem' }}>
    {/* Mission Header */}
    <section style={{ marginBottom: '3.5rem' }}>
      <span className="landing-tag" style={{ marginBottom: '1rem', display: 'inline-flex' }}>About MediFlow</span>
      <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', margin: '12px 0 16px', color: 'var(--on-surface)' }}>
        Precision in Care,{' '}
        <span style={{ color: 'var(--primary)' }}>Clarity in Data.</span>
      </h1>
      <p style={{ fontSize: 17, color: 'var(--on-surface-variant)', lineHeight: 1.7, maxWidth: 600 }}>
        We bridge the gap between complex medical diagnostics and actionable patient insights 
        through our premium healthcare ecosystem built for modern hospitals.
      </p>
    </section>

    {/* Hospital Image */}
    <div style={{ height: 260, borderRadius: 24, background: 'linear-gradient(135deg, #001e50 0%, #004ac6 50%, #006b5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(109,245,225,.15) 0%, transparent 60%)' }} />
      <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 8, display: 'block', opacity: .6 }}>local_hospital</span>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Since 2020</div>
        <div style={{ fontSize: 14, opacity: .8 }}>Transforming Healthcare Technology</div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: '3.5rem' }}>
      {[
        { value: '2.4M', label: 'Patients Managed', icon: 'group' },
        { value: '99.9%', label: 'System Uptime', icon: 'speed' },
        { value: '150+', label: 'Partner Hospitals', icon: 'domain' },
        { value: '24/7', label: 'Clinical Support', icon: 'support_agent' },
      ].map((s) => (
        <div key={s.label} style={{ textAlign: 'center', padding: 24, borderRadius: 16, border: '1px solid #f0f0f5', background: '#fff' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)', marginBottom: 8, display: 'block' }}>{s.icon}</span>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--on-surface)', letterSpacing: '-.02em' }}>{s.value}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--on-surface-variant)', marginTop: 4 }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Values */}
    <section style={{ marginBottom: '3.5rem' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: 'var(--on-surface)' }}>Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: 'shield', title: 'Uncompromising Security', desc: 'HIPAA compliant architecture protecting every medical record with AES-256 encryption.', color: '#004ac6' },
          { icon: 'auto_awesome', title: 'AI-Powered Insights', desc: 'Machine learning algorithms assist in diagnostics and improve operational efficiency.', color: '#8b5cf6' },
          { icon: 'favorite', title: 'Patient-First Design', desc: 'Every feature is designed with patient comfort and ease-of-use as the top priority.', color: '#ef4444' },
          { icon: 'speed', title: 'Lightning Fast', desc: 'Sub-second response times and 99.9% uptime guaranteed for uninterrupted care.', color: '#10b981' },
        ].map((f) => (
          <div key={f.title} style={{ display: 'flex', gap: 16, padding: 24, borderRadius: 16, border: '1px solid #f0f0f5', background: '#fff', transition: 'all .25s', cursor: 'pointer' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${f.color}12`, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined">{f.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--on-surface)', marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section style={{ marginBottom: '3.5rem' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: 'var(--on-surface)' }}>World-Class Specialists</h2>
      <p style={{ fontSize: 15, color: 'var(--on-surface-variant)', marginBottom: 24, lineHeight: 1.6 }}>Our medical team brings decades of combined experience from leading institutions worldwide.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { name: 'Dr. Sarah Chen', role: 'Neurosurgeon', university: 'Oxford University, PhD', rating: '4.9' },
          { name: 'Dr. Marcus Thorn', role: 'Cardiologist', university: 'Stanford Medicine', rating: '4.8' },
          { name: 'Dr. Priya Mehta', role: 'Pediatrician', university: 'AIIMS New Delhi', rating: '4.9' },
        ].map((doc) => (
          <div key={doc.name} style={{ padding: 24, borderRadius: 16, border: '1px solid #f0f0f5', background: '#fff', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-fixed), #e0e7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--primary)' }}>person</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--on-surface)' }}>{doc.name}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginTop: 2 }}>{doc.role}</div>
            <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginTop: 4 }}>{doc.university}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 13, fontWeight: 600, color: '#f59e0b' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
              {doc.rating}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonial */}
    <section style={{ marginBottom: '3.5rem' }}>
      <div style={{ padding: 32, borderRadius: 20, background: 'linear-gradient(135deg, #f8faff, #fff)', border: '1px solid #f0f0f5' }}>
        <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="material-symbols-outlined" style={{ fontSize: 18, color: '#f59e0b', fontVariationSettings: "'FILL' 1" }}>star</span>
          ))}
        </div>
        <p style={{ fontStyle: 'italic', fontSize: 17, color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: 20 }}>
          "The interface is intuitive and clear, reducing our administrative overhead by nearly 40% in just six months. 
          MediFlow has truly transformed how we deliver patient care."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--secondary), #059669)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>JS</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--on-surface)' }}>James Sterling</div>
            <div style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>Hospital Administrator, Metro Health</div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <div style={{ padding: 40, borderRadius: 24, background: 'linear-gradient(135deg, #001e50, #004ac6)', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(109,245,225,.1) 0%, transparent 60%)' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Ready to Get Started?</h3>
        <p style={{ fontSize: 15, opacity: .85, marginBottom: 24, lineHeight: 1.6 }}>Join over 150 hospitals already using MediFlow to deliver better patient care.</p>
        <Link to="/book" className="landing-btn landing-btn--white">
          <span className="material-symbols-outlined">calendar_month</span>
          Book Your First Appointment
        </Link>
      </div>
    </div>
  </div>
)

export default AboutPage
