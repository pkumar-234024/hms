export const FacilityHeatmap = () => {
  return (
    <div className="bg-primary text-on-primary p-lg rounded-xl custom-shadow overflow-hidden relative">
      {/* Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      ></div>
      <h3 className="font-headline-md text-headline-md relative z-10 text-white font-bold leading-tight">
        Facility Heatmap
      </h3>
      <p className="font-body-md text-body-md text-on-primary/80 mb-lg relative z-10">
        Operational density across wards.
      </p>

      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-white/20 mb-md">
        <img
          alt="Heatmap floor plan"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTJiOXaMeDzxIfq09edmkpQM-XXb_wh6wHWAm3_fXDW6VUvGp8XHmRZTmco64nM3Z-Ok_EjPQ64dhVXE6zZ_550JX7kZTChUA5fXI5Zi7oSFqWH7fmExCg0xK3Tg81CO4WMgSzypekMzG3MVDkfHBXA19trzHxAPRESjjHne3LK7Dmx8UavpeifB2JjusMFkZXOGS95CH_MLF6SoKNsgaWwR7sWmrC65smIJuw6PtxZuyHE1k2Buy0JfnBnqG9PDunEh6u6msG-f8"
        />
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-primary font-label-md text-label-md font-semibold">
          Main Wing: High Traffic
        </div>
      </div>

      <div className="space-y-sm relative z-10 font-sans text-xs">
        <div className="flex justify-between items-center text-blue-100">
          <span className="font-caption text-caption text-blue-100/90 font-medium">
            Emergency Care
          </span>
          <div className="flex-1 h-2 bg-white/20 mx-md rounded-full overflow-hidden">
            <div className="h-full bg-[#6cf8bb] w-4/5"></div>
          </div>
          <span className="font-label-md text-label-md font-bold text-white">
            82%
          </span>
        </div>
        <div className="flex justify-between items-center text-blue-100">
          <span className="font-caption text-caption text-blue-100/90 font-medium">
            Pediatrics
          </span>
          <div className="flex-1 h-2 bg-white/20 mx-md rounded-full overflow-hidden">
            <div className="h-full bg-[#6cf8bb] w-1/3"></div>
          </div>
          <span className="font-label-md text-label-md font-bold text-white">
            34%
          </span>
        </div>
      </div>
    </div>
  );
};
