import { Button } from "../../../components/ui/Button";
import { Activity, User, Sparkles, Trash2, Send } from "lucide-react";
import type { AppointmentDto, Prescription } from "../types";

interface EhrDetailPanelProps {
  activeApp: AppointmentDto | undefined;
  detailTab: "summary" | "vitals" | "labs";
  setDetailTab: (tab: "summary" | "vitals" | "labs") => void;
  notesText: string;
  setNotesText: (text: string) => void;
  aiDrafting: boolean;
  handleAiNoteAssist: () => Promise<void>;
  prescriptions: Prescription[];
  setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>;
  newMedName: string;
  setNewMedName: (name: string) => void;
  newMedDosage: string;
  setNewMedDosage: (dosage: string) => void;
  handleAddRx: (e: React.FormEvent) => void;
}

export const EhrDetailPanel = ({
  activeApp,
  detailTab,
  setDetailTab,
  notesText,
  setNotesText,
  aiDrafting,
  handleAiNoteAssist,
  prescriptions,
  setPrescriptions,
  newMedName,
  setNewMedName,
  newMedDosage,
  setNewMedDosage,
  handleAddRx,
}: EhrDetailPanelProps) => {
  return (
    <section className="xl:col-span-7">
      {activeApp ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden glass-premium">
          {/* Detail Header */}
          <div className="bg-slate-50/50 px-6 py-6 border-b border-slate-200 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#003c90] font-display font-black text-lg border border-blue-150 shadow-inner">
                {activeApp.patientName?.charAt(0) || "P"}
              </div>
              <div>
                <h3 className="font-display text-lg font-black text-slate-800 leading-tight">
                  {activeApp.patientName}
                </h3>
                <p className="font-sans text-xs text-slate-500 mt-1 font-semibold">
                  Chart ID:{" "}
                  <strong className="text-slate-700">
                    {activeApp.id.substring(0, 8).toUpperCase()}
                  </strong>{" "}
                  • {activeApp.hospitalName}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Tabs */}
          <div className="p-6 space-y-6">
            <div className="flex border-b border-slate-200 gap-6 overflow-x-auto">
              {(["summary", "vitals", "labs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`pb-3 font-sans text-xs font-bold border-b-2 tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    detailTab === tab
                      ? "border-[#003c90] text-[#003c90] font-black"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab === "summary"
                    ? "EHR Summary"
                    : tab === "vitals"
                      ? "Vitals Log"
                      : "Lab Pathology"}
                </button>
              ))}
            </div>

            {/* Summary Panel */}
            {detailTab === "summary" && (
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h4 className="font-display text-xs font-bold text-[#003c90] tracking-wider uppercase flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#003c90]" />
                    Consultation Agenda
                  </h4>
                  <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl shadow-inner">
                    <p className="font-sans text-xs font-bold text-slate-800 leading-relaxed">
                      {activeApp.reason}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2.5 font-bold uppercase tracking-wider">
                      EHR TIMESTAMP •{" "}
                      {new Date(
                        activeApp.appointmentDateTime,
                      ).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-block mt-3 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                        activeApp.status === "Approved"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-250"
                          : activeApp.status === "Declined"
                            ? "bg-red-50 text-red-800 border-red-250"
                            : "bg-[#eff4ff] text-[#003c90] border-blue-250"
                      }`}
                    >
                      {activeApp.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-400" />
                    Patient Registry
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase">
                        Email
                      </span>
                      <span>{activeApp.patientEmail}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase">
                        Phone
                      </span>
                      <span>{activeApp.patientPhoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vitals Tab (High-Fidelity) */}
            {detailTab === "vitals" && (
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                  <p className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    Heart Rate
                  </p>
                  <p className="font-display text-xl font-black text-[#0c1a30] mt-1.5">
                    72 BPM
                  </p>
                  <span className="inline-block mt-2 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Normal
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                  <p className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    Blood Pressure
                  </p>
                  <p className="font-display text-xl font-black text-[#0c1a30] mt-1.5">
                    120/80
                  </p>
                  <span className="inline-block mt-2 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Optimal
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                  <p className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    Oxygen Saturation
                  </p>
                  <p className="font-display text-xl font-black text-[#0c1a30] mt-1.5">
                    99%
                  </p>
                  <span className="inline-block mt-2 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Excellent
                  </span>
                </div>
              </div>
            )}

            {/* Labs Tab (High-Fidelity) */}
            {detailTab === "labs" && (
              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-sans text-xs font-bold text-slate-800">
                      Metabolic Panel (CMP)
                    </p>
                    <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">
                      EHR Released: Oct 20, 2025
                    </p>
                  </div>
                  <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                    Verified
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-sans text-xs font-bold text-slate-800">
                      Lipid &amp; Cholesterol Study
                    </p>
                    <p className="font-sans text-[10px] text-slate-400 font-semibold mt-0.5">
                      EHR Released: Oct 14, 2025
                    </p>
                  </div>
                  <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                    Verified
                  </span>
                </div>
              </div>
            )}

            {/* Consultation Notes Editor with Premium Gemini styling */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <h4 className="font-display text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Clinical Chart Notes
                </h4>
                <Button
                  type="button"
                  variant="outlined"
                  colorType="primary"
                  disabled={aiDrafting}
                  onClick={handleAiNoteAssist}
                  className="bg-gradient-to-r from-[#eff4ff] to-blue-50 text-[#003c90] border border-blue-200 hover:shadow-sm text-[10px] font-bold px-3 py-1.5 !rounded-xl flex items-center gap-1.5 transition duration-300 cursor-pointer animate-pulse-soft h-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#003c90]" />
                  {aiDrafting
                    ? "Gemini AI Summarizing..."
                    : "Summarize with Gemini AI"}
                </Button>
              </div>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                className="w-full h-32 p-4 bg-white border border-slate-255 focus:ring-2 focus:ring-blue-100 focus:border-[#003c90] rounded-2xl outline-none text-xs font-sans text-slate-700 leading-relaxed transition shadow-inner"
                placeholder="Document clinical symptom updates, check-up insights, diagnostic observations, or chronic health feedback..."
              />
              <div className="flex justify-end">
                <Button
                  variant="filled"
                  onClick={() =>
                    alert(
                      `Clinical summary saved successfully for ${activeApp.patientName}`,
                    )
                  }
                  className="bg-[#0c1a30] hover:bg-slate-900 !text-white px-5 py-2.5 !rounded-xl text-xs font-bold h-auto w-auto"
                >
                  Commit Chart Notes
                </Button>
              </div>
            </div>

            {/* Prescription Management Section */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <h4 className="font-display text-xs font-bold text-[#003c90] tracking-wider uppercase border-b border-slate-100 pb-3">
                Active Prescription Registry
              </h4>

              <form
                onSubmit={handleAddRx}
                className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
              >
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold ml-1">
                    Pharmaceutical Item
                  </label>
                  <input
                    type="text"
                    required
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="E.g. Metoprolol 50mg"
                    className="h-9 border border-slate-255 bg-white rounded-lg px-2 text-xs focus:ring-2 focus:ring-blue-100 focus:border-blue-900 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold ml-1">
                    Dosage Protocol
                  </label>
                  <select
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    className="h-9 border border-slate-255 bg-white rounded-lg px-2 text-xs transition-all"
                  >
                    <option>1 Tablet</option>
                    <option>2 Tablets</option>
                    <option>10 ml Liquid</option>
                    <option>As Directed</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  variant="filled"
                  colorType="primary"
                  className="h-9 bg-[#003c90] hover:bg-[#0f52ba] text-white text-xs font-bold !rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm shadow-blue-900/10 flex items-center justify-center"
                >
                  Add Registry
                </Button>
              </form>

              {/* Prescriptions Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#eff4ff]">
                    <tr>
                      <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider">
                        Medicine Name
                      </th>
                      <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider">
                        Dosage
                      </th>
                      <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="p-3 font-bold text-[#003c90] text-[10px] uppercase tracking-wider text-right">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {prescriptions.map((px) => (
                      <tr
                        key={px.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-3 font-semibold text-slate-800">
                          {px.medicineName}
                        </td>
                        <td className="p-3 text-slate-505 font-medium">
                          {px.dosage}
                        </td>
                        <td className="p-3 text-slate-505 font-medium">
                          {px.frequency}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setPrescriptions((prev) =>
                                prev.filter((p) => p.id !== px.id),
                              )
                            }
                            className="text-red-650 hover:text-red-800 p-1 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 inline-block" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outlined"
                  onClick={() =>
                    alert("Prescription draft saved to clinical buffer.")
                  }
                  className="px-5 py-2.5 bg-white border border-slate-255 text-slate-700 !rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer h-auto w-auto"
                >
                  Save As Draft
                </Button>
                <Button
                  variant="filled"
                  colorType="primary"
                  onClick={() =>
                    alert(
                      `Prescription dispatched securely to patient pharmacy for ${activeApp.patientName}`,
                    )
                  }
                  className="px-5 py-2.5 bg-[#003c90] hover:bg-[#0f52ba] text-white !rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] shadow cursor-pointer h-auto w-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch to Pharmacy
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/75 backdrop-blur rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-display text-base font-bold text-slate-700">
            Select clinical record
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Select an active patient appointment from the left queue to inspect
            EHR summaries.
          </p>
        </div>
      )}
    </section>
  );
};
