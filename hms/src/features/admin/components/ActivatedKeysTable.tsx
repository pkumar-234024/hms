import { Button } from "../../../components/ui/Button";

export interface ProvisionedKey {
  patientName: string;
  recordId: string;
  generatedKey: string;
  expiresIn: string;
  status: string;
}

interface ActivatedKeysTableProps {
  keys: ProvisionedKey[];
  handleRevoke: (recordId: string) => void;
}

export const ActivatedKeysTable = ({
  keys,
  handleRevoke,
}: ActivatedKeysTableProps) => {
  return (
    <div className="bg-white p-lg rounded-xl custom-shadow border border-outline-variant/20 mt-6">
      <h4 className="font-label-md text-label-md font-bold mb-md uppercase tracking-wider text-on-surface ml-1">
        Active Cryptographic Keys
      </h4>
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse font-sans text-xs">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant font-bold">
                Patient
              </th>
              <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant font-bold">
                ID
              </th>
              <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant font-bold">
                Active Token
              </th>
              <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant font-bold text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {keys.map((k) => (
              <tr
                key={k.recordId}
                className="hover:bg-surface-container-high/20 transition-colors"
              >
                <td className="py-4 px-4 font-body-md text-body-md text-on-surface font-medium">
                  {k.patientName}
                </td>
                <td className="py-4 px-4 font-caption text-caption text-on-surface-variant font-mono font-semibold uppercase">
                  {k.recordId}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-700 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded-md font-bold">
                      {k.generatedKey}
                    </span>
                    <span
                      className={`px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider ${
                        k.status === "Active"
                          ? "bg-secondary-container/30 text-secondary"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      {k.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button
                    variant="text"
                    colorType="error"
                    onClick={() => handleRevoke(k.recordId)}
                    className="hover:underline font-bold text-[11px] p-1 !rounded-lg inline-block w-auto h-auto bg-transparent border-none"
                  >
                    Revoke
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
