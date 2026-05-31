import { ShieldAlert } from "lucide-react";
import "../../components/dashboard/dashboard.css";

interface ErrorBannerProps {
  message: string;
  className?: string;
}

export const ErrorBanner = ({ message, className = "" }: ErrorBannerProps) => {
  return (
    <div className={`error-banner ${className}`}>
      <ShieldAlert className="error-banner__icon" size={20} />
      <p className="error-banner__text">{message}</p>
    </div>
  );
};
