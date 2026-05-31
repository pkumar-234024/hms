import { useState } from "react";
import {
  Phone,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Share2,
  Network,
  Layers,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { PublicNavBar } from "../../components/layout/PublicNavBar";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  // Emergency state
  const [emergencyActive, setEmergencyActive] = useState(false);
  const handleToggleEmergency = () => setEmergencyActive(!emergencyActive);

  const handleNavigateToRole = (role: string) => {
    if (role === "patient") {
      navigate("/login");
    }
  };

  return (
    <div id="landing-page-view">
      <PublicNavBar />

      {/* Active emergency alert system banner */}
      {emergencyActive && (
        <div className="bg-red-600 text-white py-3 px-4 z-50 text-center font-bold text-xs tracking-wide sticky top-16 shadow flex items-center justify-center gap-2">
          <span>
            ACTIVE EMERGENCY DETECTED: CLINI-TRAUMA CODE RED. DISPATCH FLUID
            MONITORING ACTIVATED.
          </span>
          <button
            onClick={handleToggleEmergency}
            className="ml-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-[10px] font-bold transition-colors border-none cursor-pointer"
          >
            Dismiss Alert
          </button>
        </div>
      )}

      {/* ── Hero Section (Exact code.html Match) ── */}
      <section className="hero-gradient overflow-hidden relative pt-xl pb-24 md:py-32">
        <div className="mx-auto w-full px-gutter grid lg:grid-cols-2 gap-xl items-center">
          <div className="z-10 text-center lg:text-left">
            <span className="inline-block bg-primary-container text-on-primary-container px-6 py-1 rounded font-label-md mb-md">
              Trust | Precision | Care
            </span>

            <h1 className="font-display-lg text-display-lg text-primary mb-md leading-tight">
              Your Health, <br />
              <span className="text-secondary">Our Priority</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-lg mx-auto lg:mx-0">
              Experience clinical excellence with Clinical Clarity. We combine
              advanced medical technology with compassionate care to ensure your
              well-being.
            </p>

            <div className="flex flex-col sm:flex-row gap-sm justify-center lg:justify-start">
              <Button
                variant="gradient"
                colorType="primary"
                onClick={() => navigate("/book")}
                className="h-12 w-full sm:w-auto min-w-[11rem] !rounded-lg whitespace-nowrap"
              >
                Book Appointment
              </Button>
              <Button
                variant="outlined"
                colorType="primary"
                onClick={() => {
                  const el = document.getElementById("integrated-services");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-12 w-full sm:w-auto min-w-[13rem] !rounded-lg bg-white whitespace-nowrap"
              >
                View Medical Services
              </Button>
            </div>

            <div className="mt-lg grid grid-cols-1 sm:grid-cols-3 gap-sm max-w-3xl mx-auto lg:mx-0">
              {[
                {
                  title: "Fast Booking",
                  description:
                    "Schedule consultations in under a minute with live doctor availability.",
                },
                {
                  title: "Trusted Care",
                  description:
                    "Connect with verified specialists from a HIPAA-compliant network.",
                },
                {
                  title: "Personalized Support",
                  description:
                    "Manage appointments, records, and care plans all in one place.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-md rounded-3xl shadow-sm border border-outline-variant"
                >
                  <p className="font-label-md text-label-md text-secondary mb-xs">
                    {item.title}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container opacity-20 rounded-full blur-3xl"></div>

            <img
              alt="Healthcare Professional"
              className="rounded-xl shadow-2xl relative z-10 w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkcxLcQIH91eh3UpeBys9htbF84utJxLTBK8mUeiRXF79QSs2elLhXW-pNTjQSpGb2vw1Qwairw_irEr0jPEXwbttnrs-pD-2dPr33cIPGju2MjxgcSp4FX06o_XnfR2ywVgU311ENIdIrIfjP1ezldGrJ9oc3fITkK-MYPtLGMkPed6026EL17lxUE1vDi6Az8u9I77sBMmMzoMc7G-zdBsPDHJez0khLsBYua1upSMkA6o8xehS1QcWpe-IlL3znA49yfo661OI"
            />

            <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-xl shadow-lg z-20 flex items-center gap-md">
              <div className="bg-secondary text-on-secondary p-3 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-label-md text-label-md font-bold">
                  HIPAA Compliant
                </p>
                <p className="font-caption text-caption text-on-surface-variant">
                  Secure Patient Data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Booking & Services Bento (Exact code.html Match) ── */}
      <section className="py-xl mx-auto px-gutter" id="booking">
        <div className="grid lg:grid-cols-3 gap-md">
          {/* Booking CTA Card */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-md lg:p-lg rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
            <div>
              <p className="font-label-md text-label-md text-secondary mb-xs">
                Online Appointment Scheduling
              </p>
              <h3 className="font-headline-lg text-headline-lg text-primary mb-md">
                Book your next consultation on a dedicated page.
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-lg">
                Use our new booking page to choose a specialist, pick a convenient time, and manage appointments all from one place.
              </p>
              <Button
                variant="gradient"
                colorType="primary"
                onClick={() => navigate("/book")}
                className="h-14 w-full sm:w-auto !rounded-xl"
              >
                Book Now
              </Button>
            </div>
            <div className="mt-lg grid grid-cols-1 sm:grid-cols-2 gap-sm">
              {[
                {
                  label: "Easy scheduling",
                  text: "No more inline forms. One clear booking experience.",
                },
                {
                  label: "Safe & secure",
                  text: "HIPAA-compliant appointment flow for every patient.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white p-md rounded-3xl shadow-sm border border-outline-variant"
                >
                  <p className="font-label-md text-label-md text-secondary mb-xs">
                    {item.label}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact Sidebar */}
          <div className="bg-error-container text-on-error-container p-lg rounded-xl flex flex-col justify-between border border-error/10">
            <div>
              <div className="bg-error text-on-error w-12 h-12 rounded-full flex items-center justify-center mb-md shadow-lg animate-pulse">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-headline-md text-headline-md mb-sm text-on-error-container">
                Emergency Care
              </h3>
              <p className="font-body-md text-body-md opacity-90 mb-lg leading-relaxed">
                Our trauma unit and ambulance services are available 24/7 for
                urgent medical needs.
              </p>
            </div>

            <div>
              <div className="bg-white/40 p-md rounded-lg backdrop-blur-sm border border-white/50 mb-md">
                <p className="font-label-md text-label-md text-on-error-container">
                  Direct Emergency Line
                </p>
                <p className="font-headline-lg text-headline-lg font-bold text-on-error-container">
                  0800-CLINIC
                </p>
              </div>

              <Button
                variant="filled"
                colorType="error"
                onClick={handleToggleEmergency}
                className="w-full !rounded-lg py-3 hover:bg-error transition-colors"
              >
                Call Ambulance Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section (Exact code.html Match) ── */}
      <section
        className="bg-surface-container-low py-xl"
        id="integrated-services"
      >
        <div className="mx-auto px-gutter">
          <div className="text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-sm">
              Our Integrated Services
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Seamless healthcare under one roof. From diagnostic pathology to
              life-saving medicines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-md">
            {/* Pathology Card */}
            <div className="bg-white p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center mb-lg group-hover:scale-110 transition-transform shadow-inner">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-sm">
                  Pathology
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                  Advanced laboratory testing with results delivered directly to
                  your Clinical Clarity dashboard within 24 hours.
                </p>
                <ul className="space-y-sm mb-lg">
                  <li className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    Blood Work
                  </li>
                  <li className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    Molecular Diagnostics
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleNavigateToRole("patient")}
                className="text-primary font-label-md text-label-md hover:underline inline-flex items-center gap-xs bg-transparent border-none cursor-pointer self-start"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Medical Store Card */}
            <div className="bg-white p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center mb-lg group-hover:scale-110 transition-transform shadow-inner">
                  <ShoppingCart className="w-8 h-8 text-on-secondary-container" />
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-sm">
                  Medical Store
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                  Fully stocked pharmacy with verified prescription management
                  and home delivery for maintenance medications.
                </p>
                <ul className="space-y-sm mb-lg">
                  <li className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    Verified Generic Brands
                  </li>
                  <li className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    Auto-Refill Program
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleNavigateToRole("patient")}
                className="text-primary font-label-md text-label-md hover:underline inline-flex items-center gap-xs bg-transparent border-none cursor-pointer self-start"
              >
                Visit Store <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Emergency Unit Card */}
            <div className="bg-white p-md rounded-xl shadow-sm border border-outline-variant hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 bg-error-container text-on-error-container rounded-xl flex items-center justify-center mb-lg group-hover:scale-110 transition-transform shadow-inner">
                  <Phone className="w-8 h-8 text-on-error-container" />
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-sm">
                  Emergency Unit
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                  Round-the-clock intensive care unit staffed with specialists
                  in cardiology, trauma, and emergency surgery.
                </p>
                <ul className="space-y-sm mb-lg">
                  <li className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    24/7 ICU Support
                  </li>
                  <li className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    Rapid Response Team
                  </li>
                </ul>
              </div>
              <button
                onClick={handleToggleEmergency}
                className="text-primary font-label-md text-label-md hover:underline inline-flex items-center gap-xs bg-transparent border-none cursor-pointer self-start"
              >
                Emergency Protocols <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Integration CTA (Exact code.html Match) ── */}
      <section className="py-xl mx-auto px-gutter text-center">
        <div className="bg-primary text-on-primary p-lg md:p-xl rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          <div className="relative z-10">
            <h2 className="font-headline-lg text-headline-lg mb-md">
              Keep Track of Your Health Journey
            </h2>
            <p className="font-body-lg text-body-lg opacity-90 mb-lg">
              Login with your account to view test results, manage recurring
              appointments, and sync with your health apps.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
              <Button
                onClick={() => handleNavigateToRole("patient")}
                className="
    flex items-center gap-3
    bg-white text-primary
    h-14 px-8
    rounded-xl
    shadow-lg
    hover:bg-gray-100
    transition-all duration-200
    font-medium
  "
              >
                <img
                  alt="Google"
                  className="w-5 h-5 object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJJxocefS5zl662GBbqzdYmIoLl5rg1SvPK-av2S_sHWKtcstU7FLAMAnYeedtgnL8VUi04axry2KINWOBGsA9I3g73WJZXfCtIrskVKDJDAVjXOuqmBbsPnl-40iNfGfw0qPBC_J0q11imbLCmCkY9cCP3MAc36cTuTC-d5vQ0WGq0cpTY--SlUrXIqx-kLy3BSMUKP8WFZyhy7U8m83Plmn9FCpcv6nl2JLTjcnDnTe-Ojf_dXM0Y0Z_LiYo7Nb59epBr8DZb-s"
                />
                <span>Sign in with Google</span>
              </Button>

              <Button
                onClick={() => handleNavigateToRole("patient")}
                className="
    h-14 px-8
    rounded-xl
    border border-white
    text-white
    hover:bg-white hover:text-primary
    transition-all duration-200
    font-medium
  "
              >
                Create Patient Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Light Footer (Exact code.html Match) ── */}
      <footer className="bg-surface-container-highest border-t border-outline-variant">
        <div className="w-full py-xl px-gutter grid grid-cols-1 md:grid-cols-2 gap-md mx-auto">
          <div className="flex flex-col gap-sm text-left">
            <span className="font-headline-md text-headline-md font-bold text-on-surface">
              Clinical Clarity
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
              Pioneering medical management through technology and human-centric
              care systems.
            </p>

            <div className="flex gap-md mt-md">
              <a
                className="text-on-surface-variant hover:text-primary transition-all"
                href="#"
              >
                <Network className="w-5 h-5" />
              </a>
              <a
                className="text-on-surface-variant hover:text-primary transition-all"
                href="#"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                className="text-on-surface-variant hover:text-primary transition-all"
                href="#"
              >
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md text-left">
            <div className="flex flex-col gap-sm">
              <p className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">
                Company
              </p>
              <button
                onClick={() => navigate("/login")}
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all bg-transparent border-none cursor-pointer self-start"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate("/login")}
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all bg-transparent border-none cursor-pointer self-start"
              >
                Terms of Service
              </button>
              <button
                onClick={() => navigate("/login")}
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all bg-transparent border-none cursor-pointer self-start"
              >
                Compliance
              </button>
            </div>

            <div className="flex flex-col gap-sm">
              <p className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">
                Support
              </p>
              <button
                onClick={() => navigate("/login")}
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all bg-transparent border-none cursor-pointer self-start"
              >
                Contact Support
              </button>
              <button
                onClick={() => navigate("/login")}
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all bg-transparent border-none cursor-pointer self-start"
              >
                Emergency Help
              </button>
              <button
                onClick={() => navigate("/login")}
                className="font-body-md text-body-md text-on-surface-variant hover:underline hover:text-primary transition-all bg-transparent border-none cursor-pointer self-start"
              >
                FAQs
              </button>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-outline-variant py-md px-gutter text-center">
          <p className="font-caption text-caption text-on-surface-variant">
            (c) 2024 Clinical Clarity Hospital Management. HIPAA Compliant.
          </p>
        </div>
      </footer>
    </div>
  );
}
