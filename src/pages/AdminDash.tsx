import { useState, useEffect } from "react";
import { Users, Truck, AlertTriangle, Activity, CheckCircle, XCircle, Map, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { api } from "../lib/store";

export default function AdminDash() {
  const [stats, setStats] = useState<any>({});
  const [kycs, setKycs] = useState<any[]>([]);
  const [charges, setCharges] = useState<any[]>([]);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [routeData, setRouteData] = useState({ from: "", to: "" });

  const fetchData = () => {
    api.getStats().then(setStats);
    api.getTravelers().then(data => setKycs(data.filter((t: any) => t.kycStatus === 'Pending')));
    api.getCharges().then(data => setCharges(data.filter((c: any) => c.status === 'Pending')));
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleKycApprove = (id: string) => {
    api.approveKyc(id).then(() => fetchData());
  };

  const handleKycReject = (id: string) => {
    api.rejectKyc(id).then(() => fetchData());
  };

  const handleChargeApprove = (id: string) => {
    api.approveCharge(id).then(() => fetchData());
  };

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    api.createRoute({ ...routeData, createdBy: "Admin" }).then(() => { setShowRouteModal(false); fetchData(); });
  };

  return (
    <div className="flex-1 bg-surface-50 p-4 sm:p-8 w-full max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Admin Operations Center</h1>
          <p className="text-sm text-slate-500">System overview, KYC management, and network health.</p>
        </div>
        <button onClick={() => setShowRouteModal(true)} className="bg-primary-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-primary-700 transition-colors shadow-sm">
          <Map className="h-5 w-5" /> Create Base Route
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Volume</h3>
            <Activity className="h-5 w-5 text-primary-500" />
          </div>
          <div className="text-3xl font-bold text-navy-900">₹{stats.revenueSaved?.toLocaleString() || "24.5M"}</div>
          <div className="mt-2 text-xs font-medium text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded border border-green-100">+12% vs last week</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-secondary-500" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">KYC Pending</h3>
            <Users className="h-5 w-5 text-secondary-500" />
          </div>
          <div className="text-3xl font-bold text-navy-900">24</div>
          <div className="mt-2 text-xs font-medium text-slate-500">Requires manual review</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Deliveries</h3>
            <Truck className="h-5 w-5 text-primary-600" />
          </div>
          <div className="text-3xl font-bold text-navy-900">{stats.deliveriesToday || 45}</div>
          <div className="mt-2 text-xs font-medium text-slate-500">On-route right now</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Disputes</h3>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-navy-900">2</div>
          <div className="mt-2 text-xs font-medium text-red-600 bg-red-50 w-fit px-2 py-0.5 rounded border border-red-100">Critical</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* KYC Table */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-navy-900">KYC Verification Queue</h2>
              <span className="bg-secondary-100 text-secondary-700 px-2.5 py-0.5 rounded-full text-xs font-bold">{kycs.length} Pending</span>
           </div>
           <div className="flex-1 overflow-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-xs text-slate-500 uppercase tracking-wide border-b border-slate-200">
                    <th className="px-5 py-3 font-medium">Traveler</th>
                    <th className="px-5 py-3 font-medium">Document Type</th>
                    <th className="px-5 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {kycs.length > 0 ? kycs.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-medium text-navy-900">{u.name}</td>
                      <td className="px-5 py-4 text-slate-500">{u.docType || 'Unknown'}</td>
                      <td className="px-5 py-4">
                         <div className="flex items-center justify-end gap-2">
                           <button onClick={() => handleKycApprove(u.id)} className="p-1.5 text-green-600 bg-green-50 rounded hover:bg-green-100 transition"><CheckCircle className="h-5 w-5"/></button>
                           <button onClick={() => handleKycReject(u.id)} className="p-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 transition"><XCircle className="h-5 w-5"/></button>
                         </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-5 py-8 text-center text-slate-500">No pending KYC requests</td>
                    </tr>
                  )}
                </tbody>
             </table>
           </div>
         </div>

         {/* Route Charges */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-navy-900">Pending Route Charges</h2>
              <span className="bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full text-xs font-bold">{charges.length} Pending</span>
           </div>
           <div className="flex-1 overflow-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-xs text-slate-500 uppercase tracking-wide border-b border-slate-200">
                    <th className="px-5 py-3 font-medium">Route</th>
                    <th className="px-5 py-3 font-medium">Charge</th>
                    <th className="px-5 py-3 font-medium text-right">Approve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {charges.length > 0 ? charges.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-medium text-navy-900">{c.from} ➔ {c.to}</td>
                      <td className="px-5 py-4 text-slate-500">₹{c.charge}</td>
                      <td className="px-5 py-4 text-right">
                         <button onClick={() => handleChargeApprove(c.id)} className="bg-primary-600 text-white px-3 py-1.5 text-xs font-semibold rounded hover:bg-primary-700 transition">Approve</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-5 py-8 text-center text-slate-500">No pending charges</td>
                    </tr>
                  )}
                </tbody>
             </table>
           </div>
         </div>
      </div>

      <AnimatePresence>
        {showRouteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-navy-900">Create Base Route</h3>
                <button onClick={() => setShowRouteModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleCreateRoute} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">From City</label>
                  <input type="text" required value={routeData.from} onChange={e => setRouteData({...routeData, from: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" placeholder="e.g. Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">To City</label>
                  <input type="text" required value={routeData.to} onChange={e => setRouteData({...routeData, to: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" placeholder="e.g. Pune" />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg mt-6 hover:bg-primary-700 transition text-sm">
                  Create Route
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
