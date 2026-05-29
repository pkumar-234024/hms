import { Button } from "../../../components/ui/Button";
import { ShoppingCart } from "lucide-react";

export const PharmacyAutoRefills = () => {
  return (
    <div className="group relative rounded-xl overflow-hidden min-h-[220px] shadow-sm border border-slate-100 flex flex-col justify-end p-8">
      {/* Coverage Pharmacy shelves backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all group-hover:scale-105 duration-700" 
        style={{ backgroundImage: "url('/pharmacy_shelves.png')" }}
      />
      {/* Dark overlay to ensure absolute readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent pointer-events-none" />

      <div className="relative z-10 text-white max-w-md space-y-4">
        <span className="inline-flex items-center px-3 py-1 rounded bg-[#E6F4EA]/20 backdrop-blur-sm border border-white/10 text-[#6cf8bb] text-[10px] font-extrabold uppercase tracking-widest">
          Health &amp; Wellness
        </span>
        <div>
          <h3 className="font-display text-2xl font-black mb-1.5 tracking-tight">
            Medical Store
          </h3>
          <p className="text-xs text-slate-200/90 leading-relaxed font-semibold">
            Order prescribed medications and healthcare essentials directly to your ward or home.
          </p>
        </div>
        <Button
          variant="filled"
          onClick={() =>
            alert(
              "Navigating to secure clinical store. Refill codes pre-populated.",
            )
          }
          className="!bg-white !text-[#003c90] px-5 py-2.5 !rounded-xl text-xs font-bold hover:shadow-lg hover:bg-slate-50 transition-all cursor-pointer h-11 w-auto inline-flex items-center gap-2"
        >
          Browse Store
          <ShoppingCart className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
