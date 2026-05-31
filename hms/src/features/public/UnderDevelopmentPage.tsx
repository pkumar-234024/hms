import { Wrench } from "lucide-react";

export default function UnderDevelopmentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-amber-100 p-4 animate-pulse">
            <Wrench className="h-10 w-10 text-amber-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          This Page Is Under Development
        </h1>

        <p className="mt-4 text-slate-600">
          Our team is currently building this feature. It will be available
          soon.
        </p>

        <div className="mt-8">
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            🚧 Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}
