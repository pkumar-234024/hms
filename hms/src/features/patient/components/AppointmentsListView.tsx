import { Plus, Heart } from "lucide-react";
import type { AppointmentDto } from "../types";

interface AppointmentsListViewProps {
  appointments: AppointmentDto[];
  getApptDateDetails: (dateTimeStr: string) => {
    day: string;
    month: string;
    time: string;
    full: string;
  };
}

export const AppointmentsListView = ({
  appointments,
  getApptDateDetails,
}: AppointmentsListViewProps) => {
  return (
    <div className="space-y-6 bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-xl border border-slate-200/80">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-black text-[#0c1a30] tracking-tight">
            Active Registered Consultations
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-0.5">
            Manage your pending reviews and confirmed appointments.
          </p>
        </div>
        <a
          href="/book"
          className="bg-[#eff4ff] hover:bg-[#e5eeff] text-[#003c90] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors no-underline"
        >
          <Plus className="w-4 h-4" /> Book Consultation
        </a>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 mb-3 text-slate-400">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-700">
            No scheduled visits yet
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-1 max-w-sm font-medium">
            Any slots you request or approve via the medical portals will display
            here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-150">
          {appointments.map((app) => {
            const details = getApptDateDetails(app.appointmentDateTime);
            return (
              <div
                key={app.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display font-black text-[#0c1a30] text-base">
                      {app.reason}
                    </h4>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                        app.status === "Approved"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : app.status === "Declined"
                            ? "bg-red-50 text-red-800 border-red-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-500 font-semibold">
                    Scheduled for {details.full}
                  </p>
                  <p className="font-sans text-[11px] text-slate-400 font-medium">
                    Provider: {app.doctorName} | Clinic Unit ({app.hospitalName})
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
