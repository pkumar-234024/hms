import type { AppointmentDto } from "../types";

interface ClinicalPassportProps {
  primaryAppointment: AppointmentDto | undefined;
  getApptDateDetails: (dateTimeStr: string) => {
    day: string;
    month: string;
    time: string;
    full: string;
  };
}

export const ClinicalPassport = (_props: ClinicalPassportProps) => {
  return (
    <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between group transition-all duration-300">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-4">
          {/* Awaiting Consultation Badge */}
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#E6F4EA] text-[#006C49] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006C49] mr-1.5" />
            Awaiting Consultation
          </span>
          
          <div>
            <h3 className="font-display text-2xl font-black tracking-tight text-[#0B1C30] mb-1">
              Cardiology Follow-up
            </h3>
            <p className="text-sm text-slate-500 font-semibold">
              Dr. Adrian Sterling | Room 402, Main Wing
            </p>
          </div>
        </div>

        {/* Clinical card outline graphic */}
        <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner shrink-0 text-slate-300">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-150 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">QUEUE POSITION</p>
            <p className="text-xl font-extrabold text-[#003c90]">#04</p>
          </div>
          <div className="border-l border-slate-100 pl-8">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">EST. WAIT</p>
            <p className="text-xl font-extrabold text-[#0B1C30]">12 mins</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => alert("Displaying active routing map to Cardiology Room 402.")}
          className="text-[#003c90] hover:text-[#0b57d0] font-extrabold text-sm flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          View Directions
          <svg className="w-4 h-4 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </button>
      </div>
    </div>
  );
};
