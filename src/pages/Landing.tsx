import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, MapPin, Truck, TrendingUp, CheckCircle2, Search, ArrowRightLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../lib/store";

export default function Landing() {
  const [stats, setStats] = useState({ activeTravelers: 0, deliveriesToday: 0, citiesCovered: 0, revenueSaved: 0 });

  useEffect(() => {
    api.getStats()
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 -left-1/4 w-[150%] h-full bg-gradient-to-br from-primary-50/80 via-white to-surface-100/50 transform -skew-y-[4deg] origin-top-left" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6 border border-primary-100">
                <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
                Enterprise-Grade Delivery Network
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 tracking-tight leading-[1.15] mb-6">
                Fast, secure intercity parcel delivery powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">verified travelers.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                Connect your urgent deliveries with verified travelers moving along the same route. Save money, reduce carbon footprint, and track in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 group">
                  Send a Parcel <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="flex items-center justify-center bg-white text-primary-700 border border-primary-200 px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-sm">
                  Become a Traveler
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-secondary-500" /> OTP Secured
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-500" /> Same-Day Delivery
                </div>
              </div>
            </motion.div>

            {/* Simulated Live Route Map Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block h-[500px]"
            >
              <div className="absolute inset-0 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
                {/* Abstract Map Background */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
                
                {/* Live Tracking Overlay Concept */}
                <motion.div 
                  initial={{ top: '60%', left: '20%' }}
                  animate={{ top: '30%', left: '70%' }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute z-20 flex flex-col items-center"
                >
                  <div className="bg-white px-3 py-1.5 rounded-md text-xs font-bold text-navy-900 shadow-md mb-2 flex items-center gap-1">
                    <Truck className="h-3 w-3" /> Rahul S.
                  </div>
                  <div className="h-4 w-4 bg-primary-500 rounded-full border-2 border-white shadow-lg relative">
                    <div className="absolute inset-0 rounded-full border border-primary-400 animate-ping" />
                  </div>
                </motion.div>

                {/* Cities */}
                <div className="absolute top-[60%] left-[20%] w-3 h-3 bg-white rounded-full z-10" />
                <div className="absolute top-[30%] left-[70%] w-3 h-3 bg-white rounded-full z-10" />
                
                {/* Path line */}
                <svg className="absolute inset-0 h-full w-full opacity-30 z-0">
                  <path d="M 20% 60% Q 40% 30% 70% 30%" fill="transparent" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
                </svg>

                {/* Tracking Widget Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl z-30">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-white font-medium text-sm">Active Delivery #P1049</div>
                    <div className="text-primary-400 text-xs font-bold bg-primary-900/50 px-2 py-1 rounded">In Transit</div>
                  </div>
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Mumbai</span>
                      <span className="text-xs">08:00 AM</span>
                    </div>
                    <ArrowRightLeft className="h-4 w-4 text-white/40" />
                    <div className="flex flex-col text-right">
                      <span className="text-white font-semibold">Pune</span>
                      <span className="text-xs">ETA 11:30 AM</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-4 overflow-hidden">
                    <motion.div 
                      className="bg-primary-400 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-navy-900 mb-1">{stats.activeTravelers || 245}</div>
              <div className="text-sm text-slate-500 font-medium">Active Travelers</div>
            </div>
            <div className="text-center border-l border-slate-100">
              <div className="text-3xl font-bold text-navy-900 mb-1">{stats.deliveriesToday || 1208}</div>
              <div className="text-sm text-slate-500 font-medium">Deliveries Today</div>
            </div>
            <div className="text-center border-l border-slate-100">
              <div className="text-3xl font-bold text-primary-600 mb-1">₹{stats.revenueSaved?.toLocaleString() ?? "2.5M"}</div>
              <div className="text-sm text-slate-500 font-medium">Delivery Cost Saved</div>
            </div>
            <div className="text-center border-l border-slate-100">
              <div className="text-3xl font-bold text-navy-900 mb-1">{stats.citiesCovered || 42}</div>
              <div className="text-sm text-slate-500 font-medium">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4 tracking-tight">Banking-Grade Logistics</h2>
            <p className="text-lg text-slate-600">Built with enterprise security paradigms, ensuring your parcels are tracked, insured, and verified at every step.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "AI Route Matching", desc: "Our proprietary engine matches your parcel with travelers holding verified tickets for optimal delivery times." },
              { icon: ShieldCheck, title: "Escrow Payments & OTP", desc: "Payments are held securely in escrow and only released to the traveler upon biometric or OTP confirmation at delivery." },
              { icon: TrendingUp, title: "Dynamic Pricing", desc: "Fair market pricing based on vehicle capacity, urgency, and live traveler availability along the requested route." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Track Widget */}
      <section id="tracking" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-8">Track Your Parcel</h2>
            <div className="flex shadow-sm rounded-lg overflow-hidden border border-slate-300">
              <input type="text" placeholder="Enter Tracking ID (e.g., P1049)" className="flex-1 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 text-navy-900 font-medium" />
              <button className="bg-primary-600 text-white px-8 font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2">
                <Search className="h-4 w-4" /> Track
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-4">For registered users, you can also login to view live map tracking.</p>
        </div>
      </section>

    </div>
  );
}
