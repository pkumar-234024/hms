import { useState } from 'react'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', department: '', message: '', priority: false })

  return (
    <div className="fade-up">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1>Get in Touch</h1>
        <p>Connect with our specialized medical teams. Whether you're seeking a consultation or require technical support, MediFlow is here to help.</p>
      </div>

      {/* Contact Form */}
      <div className="glass-card glass-card--glow" style={{ marginBottom: 'var(--sp-lg)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 'var(--sp-md)' }}>Send a Secure Message</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }} onSubmit={e => e.preventDefault()}>
          <input className="input-field input-field--no-icon" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input-field input-field--no-icon" placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <select className="input-field input-field--no-icon" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={{ appearance: 'none' }}>
            <option value="">Select Department</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="support">Technical Support</option>
          </select>
          <textarea className="textarea-field" placeholder="How can we help you?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--on-surface-variant)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.priority} onChange={e => setForm({ ...form, priority: e.target.checked })} style={{ accentColor: 'var(--primary)' }} />
            Mark as priority inquiry
          </label>
          <button className="btn-primary" type="submit">Submit Request</button>
        </form>
      </div>

      {/* Map placeholder */}
      <div style={{ height: 180, borderRadius: 'var(--r-2xl)', background: 'linear-gradient(135deg, #0a1628, #1a2a4a)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: 'var(--sp-md)', marginBottom: 'var(--sp-lg)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Main Campus</div>
          <div style={{ fontSize: 12, opacity: .8 }}>450 Medical Plaza, NY 10012</div>
        </div>
        <button className="btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)', fontSize: 12 }}>Directions</button>
      </div>

      {/* Emergency Card */}
      <div className="emergency-card" style={{ marginBottom: 'var(--sp-lg)' }}>
        <h3><span className="material-symbols-outlined">warning</span> Medical Emergency</h3>
        <p>If you are experiencing a life-threatening emergency, please dial your local emergency services immediately.</p>
        <button className="emergency-card__btn">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>call</span>
          Emergency: 9-1-1
        </button>
      </div>

      {/* Contact Info */}
      <div style={{ marginBottom: 'var(--sp-lg)' }}>
        {[
          { icon: 'call', title: 'General Inquiries', desc: '+1 (555) 123-4567' },
          { icon: 'mail', title: 'Support Email', desc: 'help@mediflow.com' },
          { icon: 'chat', title: 'Live Concierge', desc: '24/7 Portal Chat' },
          { icon: 'schedule', title: 'Office Hours', desc: 'Mon-Fri: 8am-6pm' },
        ].map((c) => (
          <div key={c.title} className="contact-row">
            <span className="material-symbols-outlined contact-row__icon">{c.icon}</span>
            <div className="contact-row__text">
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Support Lead */}
      <div className="glass-card" style={{ marginBottom: 'var(--sp-lg)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--on-surface-variant)', marginBottom: 'var(--sp-sm)' }}>Patient Support Lead</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-sm)' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>person</span>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Sarah Mitchell</div>
            <div style={{ fontSize: 13, color: 'var(--primary)', fontStyle: 'italic' }}>Head of Patient Relations</div>
          </div>
        </div>
        <div style={{ padding: 'var(--sp-sm)', background: 'var(--surface-container-low)', borderRadius: 'var(--r-lg)', fontStyle: 'italic', fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
          "We strive to ensure every patient journey is seamless and supported by the highest standard of care."
        </div>
      </div>
    </div>
  )
}

export default ContactPage
