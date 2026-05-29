import { Button } from "../../../components/ui/Button";
import { Download } from "lucide-react";
import type { LabReport } from "../types";

interface PathologyArchivesViewProps {
  labReports: LabReport[];
  downloadingReportId: string | null;
  handleDownload: (report: LabReport) => void;
}

export const PathologyArchivesView = ({
  labReports,
  downloadingReportId,
  handleDownload,
}: PathologyArchivesViewProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-xl border border-slate-200/80 space-y-6">
      <div>
        <h3 className="font-display text-xl font-black text-[#0c1a30] tracking-tight">
          Secure Medical Pathology Archives
        </h3>
        <p className="font-sans text-xs text-slate-400 mt-0.5">
          All pathology metrics and clinical data is signed under SHA-256 cryptography.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {labReports.map((rep) => (
          <div
            key={rep.id}
            className="p-4 bg-white rounded-xl border border-slate-200/80 flex flex-col justify-between h-40 shadow-sm hover:border-[#003c90] transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-display font-bold text-slate-800 text-sm tracking-tight">
                  {rep.title}
                </p>
                <p className="font-sans text-[11px] text-slate-400 mt-1 font-semibold">
                  Category: {rep.category} | Size: {rep.fileSize}
                </p>
              </div>
              <span
                className={`text-[9px] font-extrabold tracking-wider border px-2.5 py-0.5 rounded-full uppercase ${
                  rep.status === "Verified"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                    : "bg-amber-50 text-amber-800 border-amber-100"
                }`}
              >
                {rep.status}
              </span>
            </div>
            <Button
              variant="outlined"
              disabled={downloadingReportId === rep.id}
              onClick={() => handleDownload(rep)}
              className="w-full text-center py-2.5 !rounded-xl text-xs font-bold mt-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-[#eff4ff] hover:bg-[#e5eeff] text-[#003c90]"
            >
              {downloadingReportId === rep.id ? (
                <span className="text-[10px] text-slate-400 font-bold animate-pulse whitespace-nowrap">
                  Securing...
                </span>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> Download Encrypted PDF
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
