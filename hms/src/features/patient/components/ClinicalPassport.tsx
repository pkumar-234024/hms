import { Button } from "../../../components/ui/Button";
import { ShieldCheck, ChevronRight, Heart, Plus } from "lucide-react";
import type { AppointmentDto } from "../types";

interface ClinicalPassportProps {
  primaryAppointment: AppointmentDto | undefined;
  getApptDateDetails: (dateTimeStr: string) => {
    day: string;
    month: string;
    time: string;
    full: string;
  };
  setActiveSubTab: (tab: "overview" | "appointments" | "records") => void;
}

export const ClinicalPassport = ({
  primaryAppointment,
  getApptDateDetails,
  setActiveSubTab,
}: ClinicalPassportProps) => {
  return (
    <>
      {primaryAppointment ? (
        <div className="lg:col-span-8 bg-gradient-to-br from-[#0c1a30] via-[#003c90] to-[#0f52ba] rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[320px] group border border-blue-900/30">
          {/* Tech vector dots overlay for high-fidelity clinical passport look */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[#6cf8bb] text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
                {primaryAppointment.status}
              </span>
              <span className="text-[10px] bg-white/10 text-slate-200 px-3 py-1 rounded-lg border border-white/10 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                HIPAA Confirmed
              </span>
            </div>

            <div>
              <p className="font-sans text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-1.5">
                Reason for Visit
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
                {primaryAppointment.reason || "General Consultation"}
              </h3>
              <p className="font-sans text-xs text-blue-100/90 font-medium">
                Assigned Practitioner:{" "}
                <strong className="text-white">
                  {primaryAppointment.doctorName}
                </strong>{" "}
                • {primaryAppointment.hospitalName || "Main Wing"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-6 relative z-10 gap-4 flex-wrap">
            <div className="flex gap-8">
              <div>
                <p className="font-sans text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-1">
                  Time Slot
                </p>
                <p className="font-display text-2xl font-black text-[#6cf8bb]">
                  {getApptDateDetails(primaryAppointment.appointmentDateTime).time}
                </p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="font-sans text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-1">
                  Date
                </p>
                <p className="font-display text-2xl font-black text-white">
                  {getApptDateDetails(primaryAppointment.appointmentDateTime).month}{" "}
                  {getApptDateDetails(primaryAppointment.appointmentDateTime).day}
                </p>
              </div>
            </div>

            <Button
              variant="outlined"
              onClick={() => setActiveSubTab("appointments")}
              className="!bg-white/10 hover:!bg-white/20 !text-white !border-white/25 px-4 py-2.5 !rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] h-auto w-auto"
            >
              Manage Booking
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 flex flex-col items-center justify-center text-center min-h-[320px] shadow-sm">
          <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="font-display text-lg font-black text-[#0c1a30]">
            No Active Consultations
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-1.5 max-w-sm font-medium">
            Use the scheduler tool to quickly book a priority medical consultation
            slot.
          </p>
          <a
            href="/book"
            className="mt-6 px-5 py-2.5 bg-[#003c90] hover:bg-[#0f52ba] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:translate-y-[-1px] no-underline"
          >
            <Plus className="w-4 h-4" />
            Schedule Now
          </a>
        </div>
      )}
    </>
  );
};
