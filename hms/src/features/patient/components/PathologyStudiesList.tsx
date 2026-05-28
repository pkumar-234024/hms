import { Button } from "../../../components/ui/Button";
import { FileText, Download } from "lucide-react";
import type { LabReport } from "../types";

interface PathologyStudiesListProps {
  labReports: LabReport[];
  downloadingReportId: string | null;
  handleDownload: (report: LabReport) => void;
  setActiveSubTab: (tab: "overview" | "appointments" | "records") => void;
}

export const PathologyStudiesList = ({
  labReports,
  downloadingReportId,
  handleDownload,
  setActiveSubTab,
}: PathologyStudiesListProps) => {
  return (
    <div className="lg:col-span-6 bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-black text-[#0c1a30] tracking-tight">
            Active Pathology Studies
          </h3>
          <button
            onClick={() => setActiveSubTab("records")}
            className="text-[#003c90] font-extrabold text-xs hover:underline flex items-center"
          >
            View Archive
          </button>
        </div>

        <div className="space-y-3.5">
          {labReports.map((report) => (
            <div
              key={report.id}
              className="p-3 bg-white hover:bg-slate-50/50 rounded-2xl border border-slate-200/80 flex items-center justify-between transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#003c90] border border-blue-50/50">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-slate-800 leading-tight">
                    {report.title}
                  </p>
                  <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">
                    EHR Released: {report.date}
                  </p>
                </div>
              </div>
              <Button
                variant="text"
                disabled={downloadingReportId === report.id}
                onClick={() => handleDownload(report)}
                className="p-2 !rounded-xl transition-all h-auto w-auto"
              >
                {downloadingReportId === report.id ? (
                  <span className="text-[10px] text-slate-400 font-bold animate-pulse whitespace-nowrap">
                    Securing...
                  </span>
                ) : (
                  <Download className="w-4 h-4 shrink-0" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
