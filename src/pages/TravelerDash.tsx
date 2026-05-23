import { useState, useEffect } from "react";
import { Truck, Map, IndianRupee, Star, Search, ShieldCheck, MapPin, ChevronRight, CheckCircle2, X, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { api } from "../lib/store";

export default function TravelerDash() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planData, setPlanData] = useState({ from: "", to: "", vehicle: "Car" });
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<{from: string; to: string} | null>(null);

  const [me, setMe] = useState<any>(null);
  const [showKycModal, setShowKycModal] = useState(false);
  const [kycDoc, setKycDoc] = useState("Aadhaar");
  
  const [charges, setCharges] = useState<any[]>([]);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [chargeData, setChargeData] = useState({ from: "", to: "", charge: "" });

  const fetchData = () => {
    api.getParcels().then(setParcels);
    api.getTravelers().then(data => setMe(data.find((t: any) => t.id === "T201")));
    api.getCharges().then(data => setCharges(data.filter((c: any) => c.travelerId === "T201")));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.submitKyc("T201", kycDoc).then(() => { setShowKycModal(false); fetchData(); });
  };

  const handleCreateCharge = (e: React.FormEvent) => {
    e.preventDefault();
    api.createCharge({ travelerId: "T201", ...chargeData }).then(() => { setShowChargeModal(false); fetchData(); });
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    api.createTravelPlan(planData).then(() => {
        setActiveRoute({ from: planData.from, to: planData.to });
        setShowPlanModal(false);
      });
  };

  const handleAcceptParcel = (parcelId: string) => {
    api.acceptParcel(parcelId, "T201").then(() => fetchData());
  };

  const handleUpdateLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
      return;
    }
    
    setLocationStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        api.updateLocation("T201", latitude, longitude)
          .then(() => {
            setLocationStatus("Location updated successfully!");
            setTimeout(() => setLocationStatus(null), 3000);
          })
          .catch(() => setLocationStatus("Failed to update"));
      },
      () => {
        setLocationStatus("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="flex-1 bg-surface-50 p-4 sm:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Traveler Workspace</h1>
          <p className="text-sm text-slate-500">Find parcels along your route and track your earnings.</p>
        </div>
        <div className="flex items-center gap-3">
           {me?.kycStatus === 'Approved' ? (
             <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-green-200">
               <ShieldCheck className="h-4 w-4" /> KYC Verified
             </div>
           ) : me?.kycStatus === 'Pending' ? (
             <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-orange-200">
               <ShieldCheck className="h-4 w-4" /> KYC Pending
             </div>
           ) : (
             <button onClick={() => setShowKycModal(true)} className="flex items-center gap-2 bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors px-3 py-1.5 rounded-full text-sm font-semibold border border-orange-300">
               <ShieldCheck className="h-4 w-4" /> Complete KYC
             </button>
           )}
           <button onClick={() => setShowChargeModal(true)} className="bg-white border border-slate-300 text-navy-900 px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-slate-50 transition-colors shadow-sm">
             <IndianRupee className="h-5 w-5" /> Post Charges
           </button>
           <button onClick={() => setShowPlanModal(true)} className="bg-primary-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-primary-700 transition-colors shadow-sm">
             <Map className="h-5 w-5" /> Post Travel Plan
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2 font-medium">
             <IndianRupee className="h-5 w-5 text-primary-500" /> Total Earnings
          </div>
          <div className="text-3xl font-bold text-navy-900">₹12,450</div>
          <div className="text-sm text-green-600 mt-2 font-medium flex items-center gap-1">+14% vs last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2 font-medium">
             <CheckCircle2 className="h-5 w-5 text-primary-500" /> Completed Trips
          </div>
          <div className="text-3xl font-bold text-navy-900">42</div>
          <div className="text-sm text-slate-500 mt-2 font-medium">Across 8 cities</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2 font-medium">
             <Star className="h-5 w-5 text-yellow-500" /> Rating
          </div>
          <div className="text-3xl font-bold text-navy-900">4.8</div>
          <div className="text-sm text-slate-500 mt-2 font-medium flex items-center">Based on 38 reviews</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Available Requests */}
        <div className="xl:col-span-2">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-bold text-navy-900">Match Opportunities</h2>
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input type="text" placeholder="Search routes..." className="pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
             </div>
          </div>

          <div className="space-y-4">
             {parcels.filter(p => p.status === 'Pending').map(parcel => (
                <div key={parcel.id} className="bg-white border text-left border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-500" />
                   
                   <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Request {parcel.id}</div>
                     <div className="flex flex-col gap-1 mb-3">
                        <div className="flex items-center gap-2 font-semibold text-navy-900 text-lg">
                           <MapPin className="h-4 w-4 text-slate-400" /> {parcel.from}
                        </div>
                        <div className="pl-2 ml-2 border-l-2 border-slate-200 h-3" />
                        <div className="flex items-center gap-2 font-semibold text-navy-900 text-lg">
                           <MapPin className="h-4 w-4 text-primary-600" /> {parcel.to}
                        </div>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md font-medium">{parcel.weight}</span>
                        <span>•</span>
                        <span>Deliver by Today</span>
                     </div>
                   </div>

                   <div className="flex flex-col sm:items-end gap-3 min-w-[120px]">
                      <div className="text-2xl font-bold text-navy-900">₹{parcel.price}</div>
                      <button onClick={() => handleAcceptParcel(parcel.id)} className="w-full sm:w-auto bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition">
                         Accept
                      </button>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Active Route overview */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-navy-900 flex items-center gap-2"><Truck className="h-4 w-4"/> Current Route</h3>
                <span className="px-2.5 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded">Active</span>
             </div>
              <div className="p-6">
                <div className="mb-4">
                   <div className="flex items-center gap-3">
                     <div className="h-3 w-3 bg-slate-400 rounded-full" />
                     <div className="font-semibold text-navy-900">{activeRoute ? activeRoute.from : "Mumbai Central"}</div>
                   </div>
                   <div className="h-8 border-l-2 border-dashed border-slate-300 ml-1.5 my-1" />
                   <div className="flex items-center gap-3">
                     <div className="h-3 w-3 bg-primary-600 rounded-full shadow-[0_0_0_4px_rgba(0,76,143,0.1)]" />
                     <div className="font-semibold text-navy-900">{activeRoute ? activeRoute.to : "Pune Station"}</div>
                   </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mt-6 space-y-2">
                   <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Carrying</div>
                   {parcels.filter(p => p.status === 'In Transit').length > 0 ? (
                     parcels.filter(p => p.status === 'In Transit').map(p => (
                       <div key={p.id} className="flex justify-between items-center text-sm border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                          <span className="font-medium text-navy-900">1x {p.weight} Parcel ({p.id})</span>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                       </div>
                     ))
                   ) : (
                     <div className="text-sm text-slate-500">No active parcels</div>
                   )}
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mt-4 space-y-2">
                   <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">My Posted Charges</div>
                   {charges.length > 0 ? (
                     charges.map(c => (
                       <div key={c.id} className="flex justify-between items-center text-sm border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                          <span className="font-medium text-navy-900">{c.from} to {c.to} - ₹{c.charge}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${c.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{c.status}</span>
                       </div>
                     ))
                   ) : (
                     <div className="text-sm text-slate-500">No charges posted</div>
                   )}
                </div>
                
                <button onClick={handleUpdateLocation} className="w-full bg-white border border-slate-300 text-navy-900 font-semibold py-2.5 rounded-lg mt-4 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                   <Navigation className="h-4 w-4" /> Update Live Location
                </button>
                {locationStatus && (
                  <p className="text-center text-xs mt-2 text-primary-600 font-medium">{locationStatus}</p>
                )}
             </div>
           </div>
        </div>

      </div>

      <AnimatePresence>
        {showPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-navy-900">Post New Travel Plan</h3>
                <button onClick={() => setShowPlanModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleCreatePlan} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">From City</label>
                  <input type="text" required value={planData.from} onChange={e => setPlanData({...planData, from: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" placeholder="e.g. Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">To City</label>
                  <input type="text" required value={planData.to} onChange={e => setPlanData({...planData, to: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" placeholder="e.g. Pune" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                  <select value={planData.vehicle} onChange={e => setPlanData({...planData, vehicle: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                    <option>Car</option>
                    <option>Bus</option>
                    <option>Train</option>
                    <option>Flight</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg mt-6 hover:bg-primary-700 transition text-sm">
                  Publish Plan
                </button>
              </form>
            </motion.div>
          </div>
        )}
        
        {showChargeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-navy-900">Post Route Charges</h3>
                <button onClick={() => setShowChargeModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleCreateCharge} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">From City</label>
                  <input type="text" required value={chargeData.from} onChange={e => setChargeData({...chargeData, from: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" placeholder="e.g. Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">To City</label>
                  <input type="text" required value={chargeData.to} onChange={e => setChargeData({...chargeData, to: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" placeholder="e.g. Pune" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Charge (₹)</label>
                  <input type="number" required value={chargeData.charge} onChange={e => setChargeData({...chargeData, charge: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" placeholder="e.g. 250" />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg mt-6 hover:bg-primary-700 transition text-sm">
                  Submit for Approval
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {showKycModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-navy-900">Complete KYC</h3>
                <button onClick={() => setShowKycModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleKycSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
                  <select value={kycDoc} onChange={e => setKycDoc(e.target.value)} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                    <option>Aadhaar</option>
                    <option>Passport</option>
                    <option>Driving License</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
                   <p className="text-sm text-slate-500 mb-2">Upload Document Front & Back</p>
                   <button type="button" className="text-primary-600 font-medium text-sm hover:underline">Select Files</button>
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg mt-6 hover:bg-primary-700 transition text-sm">
                  Submit Verification
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
