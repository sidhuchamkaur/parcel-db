import { useState, useEffect } from "react";
import { Package, Plus, MapPin, Truck, ChevronRight, Clock, Star, ArrowRightLeft } from "lucide-react";
import { api } from "../lib/store";

export default function CustomerDash() {
  const [parcels, setParcels] = useState<any[]>([]);

  useEffect(() => {
    api.getParcels()
      .then(data => setParcels(data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex-1 bg-surface-50 p-4 sm:p-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Customer Workspace</h1>
          <p className="text-sm text-slate-500">Manage your parcels and track active deliveries.</p>
        </div>
        <button className="bg-primary-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-primary-700 transition-colors shadow-sm">
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">New Parcel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Active & History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Deliveries */}
          <div>
            <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary-600" /> Active Deliveries
            </h2>
            <div className="space-y-4">
              {parcels.filter(p => p.status === 'In Transit' || p.status === 'Pending').map(parcel => (
                <div key={parcel.id} className="bg-white border text-left border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  {parcel.status === 'In Transit' && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500" />
                  )}
                  {parcel.status === 'Pending' && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-400" />
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ID: {parcel.id}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-navy-900">{parcel.from}</span>
                        <ArrowRightLeft className="h-4 w-4 text-slate-400" />
                        <span className="font-semibold text-navy-900">{parcel.to}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      parcel.status === 'In Transit' ? 'bg-primary-50 text-primary-700 border border-primary-100' :
                      'bg-orange-50 text-orange-700 border border-orange-100'
                    }`}>
                      {parcel.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1.5"><Package className="h-4 w-4 text-slate-400"/> {parcel.weight}</div>
                    <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-slate-400"/> Created {new Date(parcel.createdAt).toLocaleDateString()}</div>
                    {parcel.travelerId && (
                      <div className="flex items-center gap-1.5 ml-auto text-primary-600 font-medium">
                        <Truck className="h-4 w-4"/> View Live Tracking <ChevronRight className="h-4 w-4"/>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {parcels.filter(p => p.status === 'In Transit' || p.status === 'Pending').length === 0 && (
                <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-slate-500">No active deliveries.</p>
                </div>
              )}
            </div>
          </div>

          {/* Past Deliveries */}
          <div>
            <h2 className="text-lg font-bold text-navy-900 mb-4">Recent History</h2>
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm border-slate-200">
               <table className="min-w-full divide-y divide-slate-200">
                 <thead className="bg-slate-50">
                   <tr>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Parcel ID</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Route</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                     <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-slate-200">
                   {parcels.filter(p => p.status === 'Delivered').map((parcel) => (
                     <tr key={parcel.id} className="hover:bg-slate-50">
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">{parcel.id}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{parcel.from} to {parcel.to}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(parcel.createdAt).toLocaleDateString()}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 text-right">₹{parcel.price}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>

        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6">
           <div className="bg-navy-900 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0" />
             <h3 className="text-sm font-medium text-slate-400 mb-1 relative z-10">Wallet Balance</h3>
             <div className="text-3xl font-bold mb-6 relative z-10">₹4,500.00</div>
             <div className="flex gap-3 relative z-10">
               <button className="flex-1 bg-white text-navy-900 py-2 rounded font-semibold text-sm">Add Funds</button>
               <button className="flex-1 bg-slate-800 text-white py-2 rounded font-semibold text-sm border border-slate-700">History</button>
             </div>
           </div>

           <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
             <h3 className="font-bold text-navy-900 mb-4">Saved Addresses</h3>
             <ul className="space-y-3">
               <li className="flex items-start gap-3 p-3 bg-slate-50 rounded border border-slate-100">
                 <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                 <div>
                   <div className="font-medium text-sm text-navy-900">Home</div>
                   <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">123, Sea Face, Worli, Mumbai 400018</div>
                 </div>
               </li>
               <li className="flex items-start gap-3 p-3 bg-slate-50 rounded border border-slate-100">
                 <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                 <div>
                   <div className="font-medium text-sm text-navy-900">Office</div>
                   <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">Tech Park, Phase 1, Hinjewadi, Pune</div>
                 </div>
               </li>
             </ul>
             <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded text-sm font-medium text-primary-600 hover:bg-slate-50 transition-colors">
               + Add New Address
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
