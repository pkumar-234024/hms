import { Button } from "../../../components/ui/Button";
import { Download } from "lucide-react";
import type { LabReport } from "../types";

interface PathologyStudiesListProps {
  labReports: LabReport[];
  downloadingReportId: string | null;
  handleDownload: (report: LabReport) => void;
}

export const PathologyStudiesList = ({
  labReports,
  downloadingReportId,
  handleDownload,
}: PathologyStudiesListProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-extrabold text-[#0B1C30] tracking-tight">
            Pathology Reports
          </h3>
          <span className="text-slate-400 font-extrabold text-xs">
            Recent
          </span>
        </div>

        <div className="space-y-3.5">
          {labReports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-[#EFF4FF]/60 hover:bg-[#EFF4FF]/80 rounded-xl border border-blue-50/50 flex items-center justify-between transition-colors shadow-inner"
            >
              <div className="flex items-center gap-3">
                {/* Blue circular paper file container */}
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#003c90] border border-blue-100/50 shadow-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-slate-800 leading-tight">
                    {report.title}
                  </p>
                  <p className="font-sans text-[10px] text-slate-400 font-semibold mt-1">
                    Released: {report.date}
                  </p>
                </div>
              </div>
              <Button
                variant="text"
                disabled={downloadingReportId === report.id}
                onClick={() => handleDownload(report)}
                className="p-2 !rounded-xl transition-all h-auto w-auto text-[#003c90]"
              >
                {downloadingReportId === report.id ? (
                  <span className="text-[10px] text-slate-400 font-bold animate-pulse whitespace-nowrap">
                    Securing...
                  </span>
                ) : (
                  <Download className="w-4 h-4 shrink-0 text-[#003c90]" strokeWidth={2.5} />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
