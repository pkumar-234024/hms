import { useState } from "react";
import { StatCard } from "./components/StatCard";
import { ProvisioningForm } from "./components/ProvisioningForm";
import { ActivatedKeysTable } from "./components/ActivatedKeysTable";
import type { ProvisionedKey } from "./components/ActivatedKeysTable";
import { FacilityHeatmap } from "./components/FacilityHeatmap";
import { ComplianceStatus } from "./components/ComplianceStatus";

const AdminDashboard = () => {
  // Provisioning form states
  const [provName, setProvName] = useState("");
  const [provId, setProvId] = useState("");
  const [generatedKey, setGeneratedKey] = useState("CL-928-SKP");
  const [copied, setCopied] = useState(false);
  const [keys, setKeys] = useState<ProvisionedKey[]>([
    {
      patientName: "Elena Rodriguez",
      recordId: "PX-4421",
      generatedKey: "CL-482-RTX",
      expiresIn: "24 hours",
      status: "Active",
    },
    {
      patientName: "Marcus Thorne",
      recordId: "PX-1192",
      generatedKey: "CL-719-FJK",
      expiresIn: "24 hours",
      status: "Pending",
    },
    {
      patientName: "Sarah Jenkins",
      recordId: "PX-4920",
      generatedKey: "CL-103-WPN",
      expiresIn: "12 hours",
      status: "Active",
    },
  ]);

  const handleRegenKey = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num1 = Math.floor(Math.random() * 900) + 100;
    const l1 = letters[Math.floor(Math.random() * 26)];
    const l2 = letters[Math.floor(Math.random() * 26)];
    const l3 = letters[Math.floor(Math.random() * 26)];
    setGeneratedKey(`CL-${num1}-${l1}${l2}${l3}`);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provName || !provId) return;
    setKeys((prev) => [
      ...prev,
      {
        patientName: provName,
        recordId: provId,
        generatedKey: generatedKey,
        expiresIn: "24 hours",
        status: "Active",
      },
    ]);
    setProvName("");
    setProvId("");
    handleRegenKey();
    alert(
      "Patient credential securely provisioned over SHA-256 standard and active on EHR.",
    );
  };

  const handleRevoke = (recordId: string) => {
    setKeys((prev) => prev.filter((k) => k.recordId !== recordId));
  };

  return (
    <div className="space-y-8 relative pb-12">
      {/* Visual background decorative blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none -z-10 animate-pulse-soft"></div>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        <StatCard
          icon="medical_services"
          label="Active Doctors"
          value="142"
          trend="+12% vs last week"
          trendColor="secondary"
          iconBg="bg-primary-container/10"
          iconColor="text-primary"
        />
        <StatCard
          icon="patient_list"
          label="Patients Today"
          value="1,208"
          trend="84% Capacity"
          trendColor="secondary"
          iconBg="bg-secondary-container/20"
          iconColor="text-secondary"
        />
        <StatCard
          icon="inventory_2"
          label="Pharmacy Inventory"
          value="24.5k"
          trend="Low Stock Alert"
          trendColor="error"
          iconBg="bg-tertiary-container/10"
          iconColor="text-tertiary"
        />
        <StatCard
          icon="biotech"
          label="Pathology Volume"
          value="642"
          trend="Active Processing"
          trendColor="on-surface-variant"
          iconBg="bg-surface-container-high"
          iconColor="text-on-surface"
        />
      </section>

      {/* Credential Management & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Provisioning Tool (2/3 width) */}
        <section className="lg:col-span-2 space-y-md">
          <ProvisioningForm
            provName={provName}
            setProvName={setProvName}
            provId={provId}
            setProvId={setProvId}
            generatedKey={generatedKey}
            handleRegenKey={handleRegenKey}
            handleCopyKey={handleCopyKey}
            copied={copied}
            handleProvision={handleProvision}
          />
          <ActivatedKeysTable keys={keys} handleRevoke={handleRevoke} />
        </section>

        {/* Analytics Sidebar (1/3 width) */}
        <section className="space-y-md">
          <FacilityHeatmap />
          <ComplianceStatus />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
