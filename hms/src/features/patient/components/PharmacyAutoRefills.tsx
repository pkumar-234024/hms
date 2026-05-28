import { Button } from "../../../components/ui/Button";
import { ShoppingCart } from "lucide-react";

export const PharmacyAutoRefills = () => {
  return (
    <div className="lg:col-span-6 group relative rounded-3xl overflow-hidden min-h-[220px] shadow-md border border-blue-900/10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a30] to-[#003c90] transition-all group-hover:scale-105 duration-700"></div>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-sm relative z-10 space-y-3">
        <span className="font-sans text-[9px] text-[#6cf8bb] font-extrabold tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded border border-white/10">
          Auto-Dispensary
        </span>
        <h3 className="font-display text-xl font-extrabold mb-1 tracking-tight">
          Pharmacy Auto-Refills
        </h3>
        <p className="font-sans text-xs text-blue-100 opacity-80 leading-relaxed font-normal">
          Order active maintenance medication or clinical monitoring tools. Delivered
          to your door.
        </p>
        <Button
          variant="filled"
          onClick={() =>
            alert(
              "Navigating to secure clinical store. Refill codes pre-populated.",
            )
          }
          className="!bg-white !text-[#003c90] px-4.5 py-2.5 !rounded-xl text-xs font-bold hover:shadow-lg hover:bg-slate-50 transition-all cursor-pointer h-auto w-auto inline-flex items-center gap-2"
        >
          Browse Pharmacy Store
          <ShoppingCart className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
