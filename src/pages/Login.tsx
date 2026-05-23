import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Fingerprint, Smartphone, Lock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Login() {
  const [step, setStep] = useState<"phone" | "otp" | "verified">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setStep("verified");
      setTimeout(() => {
        if (phone === "0000000000") {
          navigate("/admin");
        } else if (phone === "1111111111") {
          navigate("/traveler");
        } else {
          navigate("/customer");
        }
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex w-full bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-navy-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Securely login to your CarryGo account
            </p>
          </div>

          <div className="mt-8">
            <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10">
              <AnimatePresence mode="wait">
                {step === "phone" && (
                  <motion.form 
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6" 
                    onSubmit={handlePhoneSubmit}
                  >
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                        Mobile Number
                      </label>
                      <div className="mt-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-slate-500 sm:text-sm font-medium">+91</span>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className="block w-full pl-12 pr-3 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-slate-50"
                          placeholder="99999 99999"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          maxLength={10}
                          autoFocus
                          required
                        />
                      </div>
                      <div className="mt-3 text-xs text-slate-500 bg-slate-100 p-2 rounded border border-slate-200">
                        <span className="font-semibold text-slate-700">Demo Accounts:</span><br/>
                        • Admin: Enter <strong>0000000000</strong><br/>
                        • Traveler: Enter <strong>1111111111</strong><br/>
                        • Customer: Any other 10-digit number
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={phone.length < 10}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-all"
                    >
                      Get OTP
                    </button>
                  </motion.form>
                )}

                {step === "otp" && (
                  <motion.form
                    key="otp"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                    onSubmit={handleOtpSubmit}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                          One Time Password
                        </label>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">Sent to +91 {phone}</p>
                      
                      <div className="bg-primary-50 border border-primary-100 rounded-md p-3 mb-4 text-xs text-primary-700">
                        <span className="font-semibold">Test Mode Active:</span> No real SMS is sent. Please enter any 4-digit code (e.g., <strong>1234</strong>) to login.
                      </div>

                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          name="otp"
                          id="otp"
                          className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center tracking-[0.5em] font-mono text-lg bg-slate-50"
                          placeholder="••••"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          autoFocus
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={otp.length < 4}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-all"
                    >
                      Verify & Proceed
                    </button>
                  </motion.form>
                )}

                {step === "verified" && (
                   <motion.div
                    key="verified"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                   >
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                       <CheckCircle2 className="h-8 w-8 text-green-600" />
                     </div>
                     <h3 className="text-lg font-bold text-navy-900">Verification Successful</h3>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="w-full flex flex-col items-center justify-center px-4 py-3 border border-slate-200 rounded-md shadow-sm bg-white text-xs font-medium text-slate-600">
                <Shield className="h-5 w-5 mb-1 text-slate-400" />
                256-bit Encryption
              </div>
              <div className="w-full flex flex-col items-center justify-center px-4 py-3 border border-slate-200 rounded-md shadow-sm bg-white text-xs font-medium text-slate-600">
                <Fingerprint className="h-5 w-5 mb-1 text-slate-400" />
                Biometric Ready
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1 bg-navy-900">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-navy-900 to-primary-900">
           <div className="h-full flex flex-col p-24 justify-between relative z-10">
              <div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">Deliver with Trust.<br/>Earn with Freedom.</h1>
                <p className="text-lg text-primary-100 max-w-lg">Join India's most secure intercity delivery network.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
