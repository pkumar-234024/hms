import type { AppointmentDto } from "../types";

interface ClinicalStatsProps {
  appointments: AppointmentDto[];
  pendingCount: number;
  approvedCount: number;
}

export const ClinicalStats = ({ appointments, pendingCount, approvedCount }: ClinicalStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <div className="bg-gradient-to-br from-[#0c1a30] to-[#0f52ba] p-5 rounded-3xl text-white shadow-md flex flex-col justify-between h-32 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "16px 16px" }} />
        <p className="font-sans text-[10px] font-bold text-blue-200 uppercase tracking-widest">Pending Review</p>
        <h4 className="font-display text-2xl font-black text-white tracking-tight">{pendingCount} Requests</h4>
        <div className="w-full bg-white/20 h-1.5 rounded-full mt-2">
          <div className="bg-[#6cf8bb] h-full rounded-full transition-all duration-500" style={{ width: appointments.length ? `${(pendingCount / appointments.length) * 100}%` : "0%" }}></div>
        </div>
      </div>
      
      <div className="bg-white/70 backdrop-blur-md p-5 rounded-3xl border border-slate-250 text-slate-800 shadow-sm flex flex-col justify-between h-32 group">
        <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">Approved Sessions</p>
        <h4 className="font-display text-2xl font-black text-[#0c1a30] tracking-tight">{approvedCount} Cleared</h4>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
          <div className="bg-[#003c90] h-full rounded-full transition-all duration-500" style={{ width: appointments.length ? `${(approvedCount / appointments.length) * 100}%` : "0%" }}></div>
        </div>
      </div>
    </div>
  );
};
