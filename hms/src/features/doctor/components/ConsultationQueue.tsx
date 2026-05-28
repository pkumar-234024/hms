import { Button } from "../../../components/ui/Button";
import { Clock, MapPin, ChevronRight, X, Check, Activity, Calendar } from "lucide-react";
import type { AppointmentDto } from "../types";

interface ConsultationQueueProps {
  appointments: AppointmentDto[];
  loading: boolean;
  selectedApptId: string | null;
  setSelectedApptId: (id: string | null) => void;
  resolvingId: string | null;
  showDeclineForm: string | null;
  setShowDeclineForm: (id: string | null) => void;
  declineReason: string;
  setDeclineReason: (reason: string) => void;
  handleApprove: (id: string) => Promise<void>;
  handleDecline: (id: string) => Promise<void>;
}

export const ConsultationQueue = ({
  appointments,
  loading,
  selectedApptId,
  setSelectedApptId,
  resolvingId,
  showDeclineForm,
  setShowDeclineForm,
  declineReason,
  setDeclineReason,
  handleApprove,
  handleDecline,
}: ConsultationQueueProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-black text-[#0c1a30] tracking-tight">Consultation Queue</h3>
        <span className="text-[10px] bg-[#eff4ff] text-[#003c90] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-blue-100">
          Live Feed
        </span>
      </div>

      {loading && appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#003c90] bg-white/70 backdrop-blur rounded-3xl border border-slate-200 shadow-sm">
          <Activity className="w-8 h-8 animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Verifying Clinical Keys...</span>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white/70 backdrop-blur rounded-3xl p-8 border border-slate-200/80 text-center shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-display text-base font-bold text-slate-700">No Patient Appointments</h3>
          <p className="font-sans text-xs text-slate-400 mt-1 max-w-xs mx-auto font-medium">Pending EHR requests will automatically stream to this section.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => {
            const isActive = selectedApptId === app.id;
            const dateObj = new Date(app.appointmentDateTime);
            return (
              <div
                key={app.id}
                onClick={() => {
                  if (resolvingId) return;
                  setSelectedApptId(isActive ? null : app.id);
                  setShowDeclineForm(null);
                  setDeclineReason("");
                }}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? "bg-white border-[#003c90] ring-1 ring-[#003c90]/25 shadow-md"
                    : "bg-white/70 backdrop-blur hover:bg-white border-slate-200/80 shadow-sm"
                }`}
              >
                {/* Visual left indicator color bars based on status */}
                <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  app.status === "Approved" ? "bg-emerald-500" :
                  app.status === "Declined" ? "bg-red-500" :
                  "bg-amber-400"
                }`} />

                <div className="flex justify-between items-start mb-3 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#003c90] font-black text-sm border border-blue-50">
                      {app.patientName?.charAt(0) || "P"}
                    </div>
                    <div>
                      <p className="font-sans text-xs font-bold text-slate-800 tracking-wide">{app.patientName}</p>
                      <p className="font-sans text-[11px] text-slate-400 font-semibold mt-0.5">{app.reason}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                    app.status === "Approved" ? "bg-emerald-50 text-emerald-800 border-emerald-150" :
                    app.status === "Declined" ? "bg-red-50 text-red-800 border-red-150" :
                    "bg-amber-50 text-amber-700 border-amber-150"
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 pl-2">
                  <div className="flex gap-4 text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {app.hospitalName || "Main Wing"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Expanded drawer for actions */}
                {isActive && (
                  <div
                    className="mt-4 pt-4 border-t border-slate-200/80 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email Address</div>
                        <div className="text-xs text-slate-700 font-semibold mt-0.5 truncate">{app.patientEmail}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Contact Phone</div>
                        <div className="text-xs text-slate-700 font-semibold mt-0.5">{app.patientPhoneNumber}</div>
                      </div>
                    </div>

                    {app.status === "Pending" && (
                      <div className="space-y-3">
                        {showDeclineForm === app.id ? (
                          <div className="space-y-3 mt-2">
                            <input
                              className="w-full h-10 border border-slate-200 rounded-xl px-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#003c90]"
                              placeholder="Provide professional rationale for decline..."
                              value={declineReason}
                              onChange={(e) => setDeclineReason(e.target.value)}
                              disabled={resolvingId === app.id}
                            />
                            <div className="flex gap-2">
                              <Button
                                variant="outlined"
                                onClick={() => { setShowDeclineForm(null); setDeclineReason(""); }}
                                disabled={resolvingId === app.id}
                                className="flex-1 py-2 !rounded-xl text-xs font-bold h-auto"
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="filled"
                                colorType="error"
                                onClick={() => handleDecline(app.id)}
                                disabled={resolvingId === app.id}
                                className="flex-2 py-2 !rounded-xl text-xs font-bold h-auto"
                              >
                                {resolvingId === app.id ? <Activity className="w-4 h-4 animate-spin" /> : <><X className="w-3.5 h-3.5" /> Submit Decline</>}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outlined"
                              colorType="error"
                              onClick={() => setShowDeclineForm(app.id)}
                              disabled={resolvingId === app.id}
                              className="flex-1 py-2.5 !rounded-xl text-xs font-bold h-auto"
                            >
                              Decline Slot
                            </Button>
                            <Button
                              variant="filled"
                              colorType="primary"
                              onClick={() => handleApprove(app.id)}
                              disabled={resolvingId === app.id}
                              className="flex-1 py-2.5 !rounded-xl text-xs font-bold shadow-sm shadow-blue-900/15 h-auto"
                            >
                              {resolvingId === app.id ? <Activity className="w-4 h-4 animate-spin" /> : <><Check className="w-3.5 h-3.5" /> Approve Slot</>}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {app.status !== "Pending" && (
                      <div className="border-t border-dashed border-slate-200 pt-3 mt-3">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">EHR Resolution Log</div>
                        {app.decisionNote ? (
                          <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">"{app.decisionNote}"</p>
                        ) : (
                          <p className="text-xs text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100">Approved under standard telemetry protocol.</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
