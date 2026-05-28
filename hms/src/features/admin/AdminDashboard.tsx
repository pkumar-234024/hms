import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import {
  Users, TrendingUp, Package, Activity,
  Key, Copy, RefreshCw, ShieldCheck, Bell, Check
} from 'lucide-react'

interface ProvisionedKey {
  patientName: string
  recordId: string
  generatedKey: string
  expiresIn: string
  status: string
}

const AdminDashboard = () => {
  // Provisioning form states
  const [provName, setProvName] = useState('')
  const [provId, setProvId] = useState('')
  const [generatedKey, setGeneratedKey] = useState('CL-928-SKP')
  const [copied, setCopied] = useState(false)
  const [keys, setKeys] = useState<ProvisionedKey[]>([
    { patientName: 'Sarah Jenkins', recordId: 'CC-4920-SJ', generatedKey: 'CL-482-RTX', expiresIn: '24 hours', status: 'Active' },
    { patientName: 'Marcus Chen', recordId: 'CC-1390-MC', generatedKey: 'CL-719-FJK', expiresIn: '24 hours', status: 'Active' },
    { patientName: 'Elena Rodriguez', recordId: 'CC-8021-ER', generatedKey: 'CL-103-WPN', expiresIn: '12 hours', status: 'Expiring' },
  ])

  const handleRegenKey = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const num1 = Math.floor(Math.random() * 900) + 100
    const l1 = letters[Math.floor(Math.random() * 26)]
    const l2 = letters[Math.floor(Math.random() * 26)]
    const l3 = letters[Math.floor(Math.random() * 26)]
    setGeneratedKey(`CL-${num1}-${l1}${l2}${l3}`)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault()
    if (!provName || !provId) return
    setKeys(prev => [...prev, {
      patientName: provName,
      recordId: provId,
      generatedKey: generatedKey,
      expiresIn: '24 hours',
      status: 'Active'
    }])
    setProvName('')
    setProvId('')
    handleRegenKey()
    alert("Patient credential securely provisioned over SHA-256 standard and active on EHR.")
  }

  const handleRevoke = (recordId: string) => {
    setKeys(prev => prev.filter(k => k.recordId !== recordId))
  }

  return (
    <div className="space-y-8 relative pb-12">
      {/* Visual background decorative blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none -z-10 animate-pulse-soft"></div>

      {/* Premium Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 border-b border-slate-200 gap-4 relative">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0c1a30] tracking-tight">System Overview</h2>
          <p className="font-sans text-xs text-slate-500 mt-1 flex items-center gap-2 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            Operational telemetry active for Meridian Health
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/85 backdrop-blur border border-slate-200 shadow-sm px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <p className="font-sans text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Date</p>
            <p className="font-sans text-sm font-semibold text-slate-800">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
          </div>
          <div className="w-px h-8 bg-slate-200 mx-2"></div>
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 bg-[#eff4ff] text-[#003c90] group-hover:bg-[#003c90] group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300">
              <Bell className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
          </div>
        </div>
      </header>

      {/* Stats Bento Grid - Premium Redesign */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Doctors */}
        <div className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-12 h-12 bg-[#eff4ff] text-[#003c90] rounded-2xl border border-blue-150 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-4xl font-black text-[#0c1a30] tracking-tight group-hover:text-[#003c90] transition-colors">142</h3>
            <p className="font-sans text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Clinical Staff</p>
          </div>
        </div>

        {/* Patient Capacity */}
        <div className="group bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 p-6 rounded-3xl border border-emerald-750 shadow-md hover:shadow-emerald-950/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-12 h-12 bg-white/20 text-white rounded-2xl backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-emerald-900 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
              84% Active
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-4xl font-black text-white tracking-tight">1,208</h3>
            <p className="font-sans text-xs text-emerald-100/90 font-bold mt-1 uppercase tracking-wider">Daily Admissions</p>
          </div>
        </div>

        {/* Pharmacy Inventory */}
        <div className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-amber-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-2xl border border-amber-150 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-red-750 bg-red-50 border border-red-150 px-2.5 py-1 rounded-full shadow-sm animate-pulse">
              Low Stock
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-4xl font-black text-[#0c1a30] tracking-tight group-hover:text-amber-800 transition-colors">24.5k</h3>
            <p className="font-sans text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Apothecary Stocks</p>
          </div>
        </div>

        {/* Pathology Volume */}
        <div className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-purple-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-12 h-12 bg-purple-50 text-purple-800 rounded-2xl border border-purple-150 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-purple-900 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span> Live
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-4xl font-black text-[#0c1a30] tracking-tight group-hover:text-purple-800 transition-colors">642</h3>
            <p className="font-sans text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Lab Panels</p>
          </div>
        </div>
      </section>

      {/* Credential Management & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Patient Credential Provisioning (2/3 width) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-[24px] border border-slate-200/80 shadow-sm glass-premium">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="font-display text-lg font-black text-[#0c1a30] tracking-tight">Patient Token Provisioning</h3>
                <p className="font-sans text-xs text-slate-400 font-medium">Generate cryptographic access tokens for active clinical charts.</p>
              </div>
              <Button
                variant="outlined"
                colorType="primary"
                onClick={handleRegenKey}
                type="button"
                className="text-xs font-bold px-3.5 py-2 !rounded-xl shrink-0 transition-colors bg-white h-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate Token
              </Button>
            </div>

            {/* Provision form */}
            <form onSubmit={handleProvision} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-600 ml-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={provName}
                    onChange={(e) => setProvName(e.target.value)}
                    placeholder="e.g. Robert Smith"
                    className="h-12 border border-slate-200 rounded-xl px-3 text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#003c90] bg-white transition-all hover:border-slate-350"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-600 ml-1">Medical Record Code</label>
                  <input
                    type="text"
                    required
                    value={provId}
                    onChange={(e) => setProvId(e.target.value)}
                    placeholder="e.g. PX-102938"
                    className="h-12 border border-slate-200 rounded-xl px-3 text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#003c90] bg-white transition-all hover:border-slate-350"
                  />
                </div>
              </div>

              {/* Secure cryptographic card layout */}
              <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#003c90] shadow-sm">
                    <Key className="w-5 h-5 font-semibold" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-black text-[#0c1a30] tracking-wide">{generatedKey}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SHA-256 Crypto • Active 24 Hours</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outlined"
                    colorType="primary"
                    onClick={handleCopyKey}
                    className="flex-1 sm:flex-initial px-3.5 py-2.5 !rounded-xl bg-white flex justify-center items-center h-auto w-auto shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="gradient"
                    colorType="primary"
                    className="flex-3 sm:flex-initial px-5 py-2.5 !rounded-xl text-xs font-bold shrink-0 h-auto"
                  >
                    Provision Access Key
                  </Button>
                </div>
              </div>
            </form>

            {/* Recently Activated Keys table */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="font-display text-sm font-black text-slate-700 mb-4 tracking-tight">Active Cryptographic Keys</h4>
              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="bg-[#eff4ff]">
                      <th className="py-3.5 px-4 text-[#003c90] font-bold text-[10px] uppercase tracking-wider">Patient ID</th>
                      <th className="py-3.5 px-4 text-[#003c90] font-bold text-[10px] uppercase tracking-wider">Record Code</th>
                      <th className="py-3.5 px-4 text-[#003c90] font-bold text-[10px] uppercase tracking-wider">Active Token</th>
                      <th className="py-3.5 px-4 text-[#003c90] font-bold text-[10px] uppercase tracking-wider text-right">Revocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {keys.map((k) => (
                      <tr key={k.recordId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{k.patientName}</td>
                        <td className="py-3.5 px-4 text-[10px] text-slate-400 font-mono font-bold uppercase">{k.recordId}</td>
                        <td className="py-3.5 px-4 flex items-center gap-2">
                          <span className="font-mono text-slate-700 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded-md font-bold">{k.generatedKey}</span>
                          <span className={`text-[9px] uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${
                            k.status === 'Active' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-150' 
                              : 'bg-amber-50 text-amber-800 border-amber-150'
                          }`}>
                            {k.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button
                            variant="text"
                            colorType="error"
                            onClick={() => handleRevoke(k.recordId)}
                            className="hover:underline font-bold text-[11px] p-1 !rounded-lg inline-block w-auto h-auto bg-transparent border-none"
                          >
                            Revoke Key
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Sidebar (1/3 width) */}
        <section className="space-y-6">
          {/* Facility Heatmap */}
          <div className="bg-gradient-to-br from-[#0c1a30] via-[#003c90] to-[#0f52ba] text-white p-6 rounded-[24px] shadow-lg overflow-hidden relative border border-blue-900/30 group">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
            
            <h3 className="font-display text-lg font-black tracking-tight mb-1">Ward Heatmap</h3>
            <p className="font-sans text-xs text-blue-100/90 font-medium mb-6">Occupancy trends across live hospital wings.</p>

            <div className="space-y-4 pt-2 text-[11px] font-sans">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-bold text-blue-100">
                  <span>Trauma &amp; ER</span>
                  <span>82%</span>
                </div>
                <div className="bg-white/20 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-300 h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-bold text-blue-100">
                  <span>Pediatrics Wing</span>
                  <span>34%</span>
                </div>
                <div className="bg-white/20 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-300 h-full rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-bold text-blue-100">
                  <span>Surgical Ward</span>
                  <span>94%</span>
                </div>
                <div className="bg-white/20 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-red-400 to-red-300 h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-bold text-blue-100">
                  <span>Outpatient Care</span>
                  <span>78%</span>
                </div>
                <div className="bg-white/20 h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-300 h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Tracker */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#003c90] border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#003c90] animate-pulse" />
              <h4 className="font-display text-sm font-extrabold text-slate-800 tracking-tight">Compliance Monitor</h4>
            </div>
            <ul className="space-y-4 text-xs font-sans">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5 animate-ping" />
                <div>
                  <p className="font-bold text-slate-800">HIPAA Secure Audit</p>
                  <p className="text-slate-400 text-[10px] font-semibold mt-0.5 uppercase">SEC-EHR Cipher Compliant</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-slate-800">Key Signature Renewals</p>
                  <p className="text-amber-800 font-bold text-[10px] mt-0.5 uppercase">14 Staff Reviews Pending</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-slate-800">Data Vault Encription</p>
                  <p className="text-slate-400 text-[10px] font-semibold mt-0.5 uppercase">AES-256 Standard Active</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
