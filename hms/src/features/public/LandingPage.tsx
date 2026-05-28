import React, { useState } from "react";
import {
  Phone,
  Activity,
  ChevronRight,
  ArrowRight,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Bell,
  Globe,
  Share2,
  Network,
  Layers,
  ShoppingCart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Formal form states
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialty, setSpecialty] = useState("General Consultation");
  const [dateTime, setDateTime] = useState("");

  // Submit animation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Emergency state
  const [emergencyActive, setEmergencyActive] = useState(false);
  const handleToggleEmergency = () => setEmergencyActive(!emergencyActive);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) {
      alert("Please fill in your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Mock successful booking
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after a brief moment
      setTimeout(() => {
        setIsSuccess(false);
        setFullName("");
        setPhoneNumber("");
        setDateTime("");
        // Smoothly scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 3000);
    }, 1500);
  };

  const handleNavigateToRole = (role: string) => {
    if (role === "patient") {
      navigate("/login");
    }
  };

  return (
    <div id="landing-page-view">
      {/* ── Custom Landing Header / Navigation Bar (Exact code.html Match) ── */}
      <header className="bg-surface border-b border-outline-variant shadow-sm top-0 z-50 sticky">
        <nav className="flex justify-between items-center w-full px-gutter mx-auto h-16">
          <div
            className="flex items-center gap-md cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="font-headline-md text-headline-md font-bold text-primary">
              Clinical Clarity
            </span>
          </div>

          <div className="hidden md:flex items-center gap-lg">
            <button
              onClick={() => navigate("/login")}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Appointments
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Medical Records
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("integrated-services");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Pathology
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Store
            </button>
          </div>

          <div className="flex items-center gap-xs">
            <div className="hidden sm:flex items-center gap-md mr-md">
              <button
                className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <Button
              variant="filled"
              colorType="primary"
              onClick={() =>
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="!py-1.5 !px-5 h-auto text-sm"
            >
              Book Now
            </Button>
            <Button
              variant="filled"
              colorType="primary"
              onClick={() => navigate("/login")}
              className="!py-1.5 !px-5 h-auto text-sm"
            >
              Login
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-all bg-transparent border-none cursor-pointer flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-surface/95 backdrop-blur-md border-b border-outline-variant shadow-lg z-40 transition-all duration-300">
          <div className="flex flex-col p-4 gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/login");
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Appointments
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/login");
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Medical Records
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.getElementById("integrated-services");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Pathology
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/login");
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Store
            </button>
          </div>
        </div>
      )}

      {/* Active emergency alert system banner */}
      {emergencyActive && (
        <div className="bg-red-600 text-white py-3 px-4 z-50 text-center font-bold text-xs tracking-wide sticky top-16 shadow flex items-center justify-center gap-2">
          <span>
            🚨 ACTIVE EMERGENCY DETECTED: CLINI-TRAUMA CODE RED. DISPATCH FLUID
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
        <div className="mx auto px-gutter grid lg:grid-cols-2 gap-xl items-center">
          <div className="z-10 text-center lg:text-left">
            <span className="inline-block bg-primary-container text-on-primary-container px-6 py-1 rounded font-label-l mb-md">
              Trust • Precision • Care
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
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-12 w-36 !rounded-lg"
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
                className="h-12 w-42 !rounded-lg bg-white"
              >
                View Medical Services
              </Button>
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
          {/* Booking Form Card */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-md lg:p-lg rounded-xl shadow-sm border border-outline-variant">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary mb-xs">
                  Quick Appointment
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Fill in your details below for a fast-track consultation.
                </p>
              </div>

              <div className="hidden sm:block text-right">
                <p className="font-caption text-caption text-on-surface-variant mb-xs">
                  Returning patient?
                </p>
                <button
                  onClick={() => handleNavigateToRole("patient")}
                  className="text-primary font-label-md text-label-md hover:underline flex items-center justify-end gap-xs bg-transparent border-none cursor-pointer"
                >
                  <Eye className="w-[18px] h-[18px] inline-block" /> Login to
                  Sync
                </button>
              </div>
            </div>

            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-150 text-emerald-950 p-8 rounded-xl text-center flex flex-col items-center justify-center min-h-[260px] shadow-inner">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mb-4 animate-bounce" />
                <h3 className="font-headline-md text-headline-md text-secondary mb-xs">
                  Slot Secured Successfully!
                </h3>
                <p className="font-body-md text-body-md text-slate-600 leading-relaxed mb-4">
                  Your appointment slot has been reserved. Switch to the{" "}
                  <strong>Patient</strong> or <strong>Doctor</strong> dashboards
                  in the top role bar to inspect the slot details.
                </p>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-3 py-1 rounded">
                  No login required for first-time bookings
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid sm:grid-cols-2 gap-md"
              >
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 border border-outline-variant rounded-lg focus:ring-primary-container focus:border-primary px-4 font-body-md transition-all bg-white hover:border-outline"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface ml-1">
                    Phone Number
                  </label>
                  <input
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 border border-outline-variant rounded-lg focus:ring-primary-container focus:border-primary px-4 font-body-md transition-all bg-white hover:border-outline"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface ml-1">
                    Specialty
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="h-12 border border-outline-variant rounded-lg focus:ring-primary-container focus:border-primary px-4 font-body-md transition-all bg-white hover:border-outline"
                  >
                    <option>General Consultation</option>
                    <option>Pathology &amp; Blood Tests</option>
                    <option>Cardiology</option>
                    <option>Pediatrics</option>
                    <option>Pharmacy Services</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface ml-1">
                    Date &amp; Time
                  </label>
                  <input
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="h-12 border border-outline-variant rounded-lg focus:ring-primary-container focus:border-primary px-4 font-body-md transition-all bg-white hover:border-outline"
                    type="datetime-local"
                  />
                </div>
                <div className="sm:col-span-2 mt-md">
                  <Button
                    variant="gradient"
                    colorType="primary"
                    disabled={isSubmitting}
                    className="w-full h-14 !rounded-lg font-headline-md text-headline-md"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="w-5 h-5 animate-spin mr-1" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking{" "}
                        <ArrowRight className="w-5 h-5 inline-block" />
                      </>
                    )}
                  </Button>
                  <p className="text-center font-caption text-caption text-on-surface-variant mt-sm">
                    No login required for first-time bookings.
                  </p>
                </div>
              </form>
            )}
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
            © 2024 Clinical Clarity Hospital Management. HIPAA Compliant.
          </p>
        </div>
      </footer>
    </div>
  );
}
