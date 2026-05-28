export const ComplianceStatus = () => {
  return (
    <div className="bg-white p-lg rounded-xl custom-shadow border border-outline-variant/20">
      <div className="flex items-center gap-sm mb-md border-b border-slate-100 pb-3">
        <span className="material-symbols-outlined text-primary">
          verified_user
        </span>
        <h4 className="font-label-md text-label-md font-bold text-on-surface">
          Compliance Status
        </h4>
      </div>
      <ul className="space-y-md font-sans text-xs">
        <li className="flex items-start gap-md">
          <div className="w-2 h-2 mt-2 bg-secondary rounded-full shrink-0"></div>
          <div>
            <p className="font-body-md text-body-md text-on-surface font-semibold">
              HIPAA Audit 2024
            </p>
            <p className="font-caption text-caption text-secondary font-bold uppercase tracking-wider">
              Verified &amp; Compliant
            </p>
          </div>
        </li>
        <li className="flex items-start gap-md">
          <div className="w-2 h-2 mt-2 bg-error rounded-full shrink-0 animate-pulse"></div>
          <div>
            <p className="font-body-md text-body-md text-on-surface font-semibold">
              Credential Renewals
            </p>
            <p className="font-caption text-caption text-error font-bold uppercase tracking-wider">
              14 Staff Pending
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
