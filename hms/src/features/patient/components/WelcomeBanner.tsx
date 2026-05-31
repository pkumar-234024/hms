import "../../../components/dashboard/dashboard.css";

interface WelcomeBannerProps {
  firstName: string;
  onBookAppointment: () => void;
}

export const WelcomeBanner = ({
  firstName,
  onBookAppointment,
}: WelcomeBannerProps) => {
  return (
    <div className="welcome-banner fade-in-up">
      <div>
        <h1 className="welcome-banner__title">
          Welcome back, {firstName}
        </h1>
        <p className="welcome-banner__subtitle">
          Here's what's happening with your clinical profile today.
        </p>
      </div>
      <button className="welcome-banner__cta" onClick={onBookAppointment}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          add
        </span>
        Book Appointment
      </button>
    </div>
  );
};
