import "./DashboardFooter.css";

interface DashboardFooterProps {
  description?: string;
}

export const DashboardFooter = ({ description }: DashboardFooterProps) => {
  return (
    <footer className="dashboard-footer">
      <div>
        <h2 className="dashboard-footer__brand">Clinical Clarity</h2>
        <p className="dashboard-footer__copy">
          {description ||
            "Dedicated to professional medical management with HIPAA compliant security and real-time patient care integration."}
        </p>
        <p className="dashboard-footer__legal">
          (c) 2024 Clinical Clarity Hospital Management. HIPAA Compliant.
        </p>
      </div>
      <nav className="dashboard-footer__links" aria-label="Footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#compliance">Compliance</a>
        <a href="#support">Contact Support</a>
      </nav>
    </footer>
  );
};
