import { Outlet, Link, useLocation } from "react-router-dom";
import { Package, Menu, X, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isDashboard = ["/customer", "/traveler", "/admin"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-primary-100 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg text-white shadow-md shadow-primary-500/20">
                <Package className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl md:text-2xl text-navy-900 tracking-tight">
                Carry<span className="text-primary-600">Go</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center">
              {!isDashboard && (
                <>
                  <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md transition-colors hover:bg-primary-50">Home</Link>
                  <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md transition-colors hover:bg-primary-50">How it Works</a>
                  <a href="#tracking" className="text-sm font-medium text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md transition-colors hover:bg-primary-50">Track Parcel</a>
                </>
              )}
              {isDashboard ? (
                 <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-slate-200">
                    <button className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-primary-600">
                      <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-primary-600 font-bold shadow-sm">
                        JD
                      </div>
                      <span className="hidden lg:block">John Doe</span>
                    </button>
                    <Link to="/login" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">Logout</Link>
                 </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link to="/login" className="text-sm font-medium text-primary-600 px-4 py-2 rounded-md border border-primary-200 hover:bg-primary-50 transition-colors shadow-sm">
                    Login
                  </Link>
                  <Link to="/login" className="text-sm font-medium text-white bg-primary-600 px-5 py-2 rounded-md hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20 flex items-center gap-1 group">
                    Get Started <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-primary-600 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-primary-100 shadow-lg absolute w-full left-0 z-40">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {!isDashboard ? (
                <>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">Home</Link>
                  <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">How it Works</a>
                  <div className="pt-4 pb-2 border-t border-slate-100 mt-2 flex flex-col gap-3">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center px-4 py-3 rounded-md text-base font-medium text-primary-600 border border-primary-200 shadow-sm">Login</Link>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-center px-4 py-3 rounded-md text-base font-medium text-white bg-primary-600 shadow-md">Get Started</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-3 py-4 flex items-center gap-3 border-b border-slate-100 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">JD</div>
                    <div>
                      <div className="font-semibold text-slate-900">John Doe</div>
                      <div className="text-sm text-slate-500">View Profile</div>
                    </div>
                  </div>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-secondary-600 hover:bg-secondary-50">Logout</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col relative w-full">
        <Outlet />
      </main>

      {!isDashboard && (
        <footer className="bg-navy-900 text-slate-300 py-12 md:py-16 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="col-span-2 md:col-span-1 border-b md:border-b-0 border-slate-700 pb-8 md:pb-0">
                <Link to="/" className="flex items-center space-x-2 mb-6">
                  <div className="bg-white/10 p-1.5 rounded-lg text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-xl text-white tracking-tight">CarryGo</span>
                </Link>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Enterprise-grade intercity human-powered parcel delivery. Secure, fast, and reliable.
                </p>
                <div className="flex space-x-4">
                  {/* Social icons placeholders */}
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary-600 transition-colors cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary-600 transition-colors cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary-600 transition-colors cursor-pointer" />
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4 tracking-tight">Services</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Send a Parcel</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Become a Traveler</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Enterprise API</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4 tracking-tight">Company</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Trust & Safety</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4 tracking-tight">Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Insurance Details</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 md:mt-16 pt-8 border-t border-slate-800 text-sm md:flex md:justify-between md:items-center text-slate-500 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} CarryGo Technologies Inc. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-4">
                <span>ISO 27001 Certified</span>
                <span className="hidden md:inline">&bull;</span>
                <span>PCI-DSS Compliant</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
