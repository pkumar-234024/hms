import { Button } from "../../../components/ui/Button";
import { Activity } from "lucide-react";

export const SecurityActivityLogs = () => {
  return (
    <div className="lg:col-span-4 bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Security &amp; Activity Logs
          </h3>
          <Activity className="w-4.5 h-4.5 text-[#003c90] animate-pulse" />
        </div>
        <div className="space-y-4">
          {[
            { title: "Appointment Registered", detail: "Just now • System SHA-256" },
            { title: "Lab Reports Synchronized", detail: "2 hours ago • Pathology Desk" },
            { title: "E-Prescription Dispensed", detail: "Yesterday • Pharmacy Hub" },
          ].map((up, i) => (
            <div key={i} className="flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center shrink-0 border border-blue-100 text-[#003c90]">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-sans text-xs font-bold text-slate-800 leading-tight">
                  {up.title}
                </p>
                <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">
                  {up.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outlined"
        colorType="primary"
        onClick={() =>
          alert("Loading full audit logs under SHA-256 HIPAA specification...")
        }
        className="w-full mt-6 py-2.5 !rounded-xl font-bold text-xs bg-white"
      >
        Request Audit Log
      </Button>
    </div>
  );
};
