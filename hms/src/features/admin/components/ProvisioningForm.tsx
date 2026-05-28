import { Button } from "../../../components/ui/Button";

interface ProvisioningFormProps {
  provName: string;
  setProvName: (name: string) => void;
  provId: string;
  setProvId: (id: string) => void;
  generatedKey: string;
  handleRegenKey: () => void;
  handleCopyKey: () => void;
  copied: boolean;
  handleProvision: (e: React.FormEvent) => void;
}

export const ProvisioningForm = ({
  provName,
  setProvName,
  provId,
  setProvId,
  generatedKey,
  handleRegenKey,
  handleCopyKey,
  copied,
  handleProvision,
}: ProvisioningFormProps) => {
  return (
    <div className="bg-white p-lg rounded-xl custom-shadow border border-outline-variant/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-lg">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Patient Credential Provisioning
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Generate secure access keys for new patients.
          </p>
        </div>
        <Button
          type="button"
          variant="outlined"
          colorType="primary"
          onClick={handleRegenKey}
          className="px-6 py-3 rounded-lg font-label-md text-label-md transition-all flex items-center gap-sm h-12 bg-white"
        >
          <span className="material-symbols-outlined">refresh</span>
          Regenerate Key
        </Button>
      </div>

      <form onSubmit={handleProvision} className="space-y-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-xs flex flex-col">
            <label className="font-label-md text-label-md text-on-surface-variant ml-1">
              Patient Full Name
            </label>
            <input
              required
              value={provName}
              onChange={(e) => setProvName(e.target.value)}
              className="w-full h-12 border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-4 bg-white"
              placeholder="e.g. Robert Smith"
              type="text"
            />
          </div>
          <div className="space-y-xs flex flex-col">
            <label className="font-label-md text-label-md text-on-surface-variant ml-1">
              Medical Record ID
            </label>
            <input
              required
              value={provId}
              onChange={(e) => setProvId(e.target.value)}
              className="w-full h-12 border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-4 bg-white"
              placeholder="e.g. PX-102938"
              type="text"
            />
          </div>
        </div>

        <div className="p-md bg-surface-container-low rounded-lg border border-primary/10 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-inner">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary border border-outline-variant/20 shadow-sm">
              <span className="material-symbols-outlined">vpn_key</span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface font-semibold">
                Generated Key: {generatedKey}
              </p>
              <p className="font-caption text-caption text-on-surface-variant">
                Expires in 24 hours
              </p>
            </div>
          </div>
          <div className="flex gap-sm w-full sm:w-auto">
            <Button
              type="button"
              variant="outlined"
              colorType="primary"
              onClick={handleCopyKey}
              className="p-2 text-primary hover:bg-primary-container/10 rounded-lg transition-colors bg-white flex items-center justify-center w-12 h-10 shrink-0"
            >
              <span className="material-symbols-outlined">
                {copied ? "check" : "content_copy"}
              </span>
            </Button>

            <Button
              type="submit"
              variant="filled"
              colorType="secondary"
              className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-label-md text-label-md h-10 flex-1 sm:flex-initial flex items-center justify-center"
            >
              Provision
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
