import { FileText, ShieldCheck, MessageSquare, RotateCw } from "lucide-react";

export const SecurityActivityLogs = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between group transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Doctor Updates
          </h3>
          <button 
            onClick={() => alert("Re-syncing clinical update streams...")}
            className="text-slate-400 hover:text-[#003c90] cursor-pointer transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-5">
          {/* Item 1 */}
          <div className="flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] flex items-center justify-center shrink-0 border border-blue-100/50 text-[#003c90]">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold text-slate-800 leading-tight">
                Prescription Updated
              </p>
              <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">
                2 hours ago | Dr. Sterling
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] flex items-center justify-center shrink-0 border border-blue-100/50 text-[#003c90]">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold text-slate-800 leading-tight">
                Pathology Results Verified
              </p>
              <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">
                Yesterday | Lab Admin
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] flex items-center justify-center shrink-0 border border-blue-100/50 text-[#003c90]">
              <MessageSquare className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold text-slate-800 leading-tight">
                Message from Oncology
              </p>
              <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">
                2 days ago | Dr. Miller
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => alert("Loading full EHR clinical log registry...")}
        className="w-full mt-6 py-2.5 rounded-lg font-bold text-xs bg-white text-[#003c90] border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer text-center"
      >
        View All Activity
      </button>
    </div>
  );
};
