import { SectionCard } from "../../../components/ui/SectionCard";

interface QuickBookingCardProps {
  onBook: () => void;
}

export const QuickBookingCard = ({ onBook }: QuickBookingCardProps) => {
  return (
    <SectionCard title="Quick Booking" animDelay={0.2}>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Use the dedicated appointment page to schedule your next visit with a verified specialist.
      </p>
      <button className="welcome-banner__cta" onClick={onBook} style={{ width: "auto" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
          calendar_add_on
        </span>
        Book New Appointment
      </button>
    </SectionCard>
  );
};
