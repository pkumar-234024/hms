import { useState } from 'react'

const FeedbackPage = () => {
  const [rating, setRating] = useState(0)
  const [mood, setMood] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')

  return (
    <div className="fade-up">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1>Your Voice Matters</h1>
        <p>Help us improve the MediFlow experience by sharing your recent visit feedback.</p>
      </div>

      <div className="glass-card" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div style={{ marginBottom: 'var(--sp-lg)' }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--on-surface)', marginBottom: 'var(--sp-sm)', textAlign: 'center' }}>Rate your experience</div>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`material-symbols-outlined star-rating__star ${star <= rating ? 'star-rating__star--active' : ''}`}
                style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
                onClick={() => setRating(star)}
              >
                star
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 'var(--sp-lg)' }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--on-surface)', marginBottom: 'var(--sp-md)', textAlign: 'center' }}>How do you feel today?</div>
          <div className="emoji-row">
            {[
              { id: 'poor', emoji: 'sentiment_very_dissatisfied', label: 'Poor' },
              { id: 'okay', emoji: 'sentiment_neutral', label: 'Okay' },
              { id: 'good', emoji: 'sentiment_satisfied', label: 'Good' },
              { id: 'great', emoji: 'sentiment_very_satisfied', label: 'Great' },
            ].map(m => (
              <div
                key={m.id}
                className={`emoji-option ${mood === m.id ? 'emoji-option--active' : ''}`}
                onClick={() => setMood(m.id)}
              >
                <span className="material-symbols-outlined emoji-option__face">{m.emoji}</span>
                <span className="emoji-option__label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 'var(--sp-lg)' }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--on-surface)', marginBottom: 'var(--sp-sm)' }}>Share more details</div>
          <textarea
            className="textarea-field"
            placeholder="How was your consultation with Dr. Vance?"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </div>

        <button className="btn-primary" disabled={!rating || !mood}>
          Submit Feedback
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
        </button>
      </div>

      <div>
        <div className="section-header" style={{ marginBottom: 'var(--sp-md)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>Patient Testimonials</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="pagination__btn" style={{ width: 32, height: 32 }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_left</span></button>
            <button className="pagination__btn" style={{ width: 32, height: 32 }}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span></button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--sp-sm)', overflowX: 'auto', paddingBottom: 8 }}>
          {[
            { name: 'Sarah J.', quote: '"The process was so smooth. Dr. Vance took the time to explain everything clearly."' },
            { name: 'Michael T.', quote: '"Efficient service and excellent analytical reporting. Highly recommend."' },
          ].map((t) => (
            <div key={t.name} className="testimonial-card" style={{ minWidth: 260, flexShrink: 0 }}>
              <div className="testimonial-card__author" style={{ marginBottom: 'var(--sp-sm)' }}>
                <div className="testimonial-card__avatar">
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
                </div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="star-rating" style={{ gap: 2, justifyContent: 'flex-start' }}>
                    {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined" style={{ fontSize: 12, color: '#f59e0b', fontVariationSettings: "'FILL' 1" }}>star</span>)}
                  </div>
                </div>
              </div>
              <p className="testimonial-card__quote">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
