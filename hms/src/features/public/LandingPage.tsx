import { Link } from 'react-router-dom'
import '../../landing.css'

const LandingPage = () => (
  <div className="landing">
    {/* ═══ HERO SECTION ═══ */}
    <section className="landing-hero">
      <div className="landing-hero__bg">
        <img src="/hospital-hero.png" alt="Modern hospital interior" className="landing-hero__img" />
        <div className="landing-hero__overlay" />
      </div>
      <div className="landing-hero__content">
        <span className="landing-hero__badge">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
          Trusted by 150+ Hospitals Worldwide
        </span>
        <h1 className="landing-hero__title">
          Your Health,<br />
          <span className="landing-hero__title--accent">Our Priority.</span>
        </h1>
        <p className="landing-hero__desc">
          Experience world-class healthcare with seamless appointment booking, 
          expert doctors, and personalized patient care — all in one platform.
        </p>
        <div className="landing-hero__actions">
          <Link to="/book" className="landing-btn landing-btn--primary">
            <span className="material-symbols-outlined">calendar_month</span>
            Book Appointment
          </Link>
          <Link to="/about" className="landing-btn landing-btn--glass">
            Learn More
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>

    {/* ═══ STATS TICKER ═══ */}
    <section className="landing-stats">
      {[
        { value: '2.4M+', label: 'Patients Served', icon: 'group' },
        { value: '500+', label: 'Expert Doctors', icon: 'stethoscope' },
        { value: '99.9%', label: 'Patient Satisfaction', icon: 'thumb_up' },
        { value: '24/7', label: 'Emergency Care', icon: 'emergency' },
      ].map((s) => (
        <div key={s.label} className="landing-stat">
          <span className="material-symbols-outlined landing-stat__icon">{s.icon}</span>
          <div className="landing-stat__value">{s.value}</div>
          <div className="landing-stat__label">{s.label}</div>
        </div>
      ))}
    </section>

    {/* ═══ SERVICES ═══ */}
    <section className="landing-section">
      <div className="landing-section__header">
        <span className="landing-tag">Our Services</span>
        <h2 className="landing-section__title">Comprehensive Healthcare Solutions</h2>
        <p className="landing-section__desc">
          From routine check-ups to specialized treatments, we provide end-to-end 
          medical care with cutting-edge technology.
        </p>
      </div>
      <div className="landing-services">
        {[
          { icon: 'cardiology', title: 'Cardiology', desc: 'Advanced heart care with state-of-the-art diagnostic equipment and experienced cardiologists.', color: '#ef4444' },
          { icon: 'neurology', title: 'Neurology', desc: 'Comprehensive brain and nervous system care with cutting-edge neuroimaging technology.', color: '#8b5cf6' },
          { icon: 'pediatrics', title: 'Pediatrics', desc: 'Specialized care for children with child-friendly facilities and expert pediatricians.', color: '#06b6d4' },
          { icon: 'orthopedics', title: 'Orthopedics', desc: 'Complete bone and joint care including sports medicine and joint replacement surgery.', color: '#f59e0b' },
          { icon: 'vaccines', title: 'Immunology', desc: 'Immune system disorders treatment with personalized immunotherapy programs.', color: '#10b981' },
          { icon: 'psychology', title: 'Mental Health', desc: 'Confidential counseling and psychiatric care with experienced mental health professionals.', color: '#ec4899' },
        ].map((svc) => (
          <div key={svc.title} className="landing-service-card">
            <div className="landing-service-card__icon" style={{ background: `${svc.color}15`, color: svc.color }}>
              <span className="material-symbols-outlined">{svc.icon}</span>
            </div>
            <h3 className="landing-service-card__title">{svc.title}</h3>
            <p className="landing-service-card__desc">{svc.desc}</p>
            <span className="landing-service-card__link">
              Learn more <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* ═══ HOW IT WORKS ═══ */}
    <section className="landing-section landing-section--tinted">
      <div className="landing-section__header">
        <span className="landing-tag">How It Works</span>
        <h2 className="landing-section__title">Book Your Appointment in 3 Easy Steps</h2>
      </div>
      <div className="landing-steps">
        {[
          { step: '01', icon: 'person_search', title: 'Choose a Doctor', desc: 'Browse our network of qualified specialists and find the right doctor for your needs.' },
          { step: '02', icon: 'event_available', title: 'Pick a Time Slot', desc: 'Select a convenient date and time from available slots in the doctor\'s schedule.' },
          { step: '03', icon: 'check_circle', title: 'Confirm & Visit', desc: 'Get instant confirmation and visit the hospital at your scheduled time.' },
        ].map((s) => (
          <div key={s.step} className="landing-step">
            <div className="landing-step__number">{s.step}</div>
            <div className="landing-step__icon-wrap">
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <h3 className="landing-step__title">{s.title}</h3>
            <p className="landing-step__desc">{s.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link to="/book" className="landing-btn landing-btn--primary landing-btn--lg">
          <span className="material-symbols-outlined">calendar_month</span>
          Book Your Appointment Now
        </Link>
      </div>
    </section>

    {/* ═══ DOCTORS SECTION ═══ */}
    <section className="landing-section">
      <div className="landing-section__header">
        <span className="landing-tag">Our Doctors</span>
        <h2 className="landing-section__title">Meet Our Expert Medical Team</h2>
        <p className="landing-section__desc">
          Our doctors are leaders in their respective fields, bringing decades of 
          combined experience and a commitment to excellence in patient care.
        </p>
      </div>
      <div className="landing-doctors">
        <div className="landing-doctors__showcase">
          <img src="/doctor-team.png" alt="Our medical team" className="landing-doctors__img" />
          <div className="landing-doctors__overlay">
            <div className="landing-doctors__badge-float">
              <span className="material-symbols-outlined">workspace_premium</span>
              Board Certified Specialists
            </div>
          </div>
        </div>
        <div className="landing-doctors__grid">
          {[
            { name: 'Dr. Sarah Chen', specialty: 'Cardiologist', exp: '15+ Years', rating: '4.9' },
            { name: 'Dr. James Wilson', specialty: 'Neurologist', exp: '12+ Years', rating: '4.8' },
            { name: 'Dr. Priya Sharma', specialty: 'Pediatrician', exp: '10+ Years', rating: '4.9' },
            { name: 'Dr. Michael Brown', specialty: 'Orthopedic', exp: '18+ Years', rating: '4.7' },
          ].map((doc) => (
            <div key={doc.name} className="landing-doctor-card">
              <div className="landing-doctor-card__avatar">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="landing-doctor-card__info">
                <div className="landing-doctor-card__name">{doc.name}</div>
                <div className="landing-doctor-card__specialty">{doc.specialty}</div>
                <div className="landing-doctor-card__meta">
                  <span><span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> {doc.exp}</span>
                  <span><span className="material-symbols-outlined" style={{ fontSize: 14, color: '#f59e0b' }}>star</span> {doc.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ TESTIMONIALS ═══ */}
    <section className="landing-section landing-section--tinted">
      <div className="landing-section__header">
        <span className="landing-tag">Testimonials</span>
        <h2 className="landing-section__title">What Our Patients Say</h2>
      </div>
      <div className="landing-testimonials">
        {[
          { quote: 'The appointment booking process was incredibly smooth. I was able to see a specialist within 24 hours of booking. Truly exceptional service!', name: 'Rajesh Kumar', role: 'Patient', rating: 5 },
          { quote: 'MediFlow has transformed how we manage our hospital. The doctor dashboard gives us real-time insights and the patient tracking is seamless.', name: 'Dr. Amanda Foster', role: 'Chief of Medicine', rating: 5 },
          { quote: 'As a first-time visitor, I was impressed by how easy it was to navigate the system. From booking to consultation, everything was professional.', name: 'Anita Desai', role: 'Patient', rating: 5 },
        ].map((t) => (
          <div key={t.name} className="landing-testimonial">
            <div className="landing-testimonial__stars">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="material-symbols-outlined" style={{ fontSize: 18, color: '#f59e0b', fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <p className="landing-testimonial__quote">"{t.quote}"</p>
            <div className="landing-testimonial__author">
              <div className="landing-testimonial__avatar">{t.name.charAt(0)}</div>
              <div>
                <div className="landing-testimonial__name">{t.name}</div>
                <div className="landing-testimonial__role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ═══ CTA BANNER ═══ */}
    <section className="landing-cta">
      <div className="landing-cta__glow" />
      <div className="landing-cta__content">
        <h2 className="landing-cta__title">Ready to Experience Better Healthcare?</h2>
        <p className="landing-cta__desc">
          Join thousands of patients who trust MediFlow for their healthcare needs. 
          Book your first appointment today — it's free and takes less than 2 minutes.
        </p>
        <div className="landing-hero__actions">
          <Link to="/book" className="landing-btn landing-btn--white">
            <span className="material-symbols-outlined">calendar_month</span>
            Book Free Appointment
          </Link>
          <Link to="/contact" className="landing-btn landing-btn--outline-white">
            Contact Us
          </Link>
        </div>
      </div>
    </section>

    {/* ═══ FOOTER ═══ */}
    <footer className="landing-footer">
      <div className="landing-footer__top">
        <div className="landing-footer__brand">
          <div className="landing-footer__logo">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>clinical_notes</span>
            <span>MediFlow</span>
          </div>
          <p className="landing-footer__tagline">Precision Health, Managed.</p>
        </div>
        <div className="landing-footer__links">
          <div className="landing-footer__col">
            <h4>Quick Links</h4>
            <Link to="/book">Book Appointment</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="landing-footer__col">
            <h4>Services</h4>
            <a href="#">Cardiology</a>
            <a href="#">Neurology</a>
            <a href="#">Pediatrics</a>
          </div>
          <div className="landing-footer__col">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="landing-footer__bottom">
        <p>© 2026 MediFlow Healthcare. All rights reserved.</p>
        <div className="landing-footer__badges">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>verified_user</span>
          <span>HIPAA Compliant</span>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock</span>
          <span>SSL Secured</span>
        </div>
      </div>
    </footer>
  </div>
)

export default LandingPage
