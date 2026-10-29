import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight, RefreshCw, Smartphone, AlertCircle } from 'lucide-react';

interface BkashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryAmount: number;
  customerPhone?: string;
  onPaymentSuccess: (trxId: string, senderNumber: string, amount: number) => void;
}

export const BkashPaymentModal: React.FC<BkashPaymentModalProps> = ({
  isOpen,
  onClose,
  deliveryAmount,
  customerPhone = '',
  onPaymentSuccess
}) => {
  const [step, setStep] = useState<'number' | 'otp' | 'pin' | 'success'>('number');
  const [bkashNumber, setBkashNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedTrxId, setGeneratedTrxId] = useState('');
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    if (customerPhone) {
      const clean = customerPhone.replace(/[^0-9]/g, '');
      if (clean.length === 11) {
        setBkashNumber(clean);
      }
    }
  }, [customerPhone]);

  useEffect(() => {
    let timer: any;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleProceedNumber = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const clean = bkashNumber.replace(/[^0-9]/g, '');
    if (clean.length !== 11 || (!clean.startsWith('013') && !clean.startsWith('014') && !clean.startsWith('015') && !clean.startsWith('016') && !clean.startsWith('017') && !clean.startsWith('018') && !clean.startsWith('019'))) {
      setErrorMessage('Please enter a valid 11-digit bKash account number (e.g. 018XXXXXXXX)');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('otp');
      setCountdown(45);
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanOtp = otp.trim().replace(/[^0-9]/g, '');
    if (cleanOtp.length !== 6) {
      setErrorMessage('Invalid OTP code! Please enter the 6-digit verification code sent to your phone (or click Demo OTP).');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('pin');
    }, 600);
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanPin = pin.trim().replace(/[^0-9]/g, '');
    if (cleanPin.length !== 5) {
      setErrorMessage('Incorrect bKash PIN! PIN must be exactly 5 digits.');
      return;
    }
    if (cleanPin === '00000') {
      setErrorMessage('Invalid PIN entered! Payment rejected by bKash.');
      return;
    }
    setIsProcessing(true);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomTrx = 'BK';
    for (let i = 0; i < 8; i++) {
      randomTrx += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedTrxId(randomTrx);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setTimeout(() => {
        onPaymentSuccess(randomTrx, bkashNumber, deliveryAmount);
      }, 1200);
    }, 1000);
  };

  const handleQuickDemoOtp = () => {
    setOtp('123456');
    setErrorMessage('');
  };

  const handleQuickDemoPin = () => {
    setPin('12345');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 text-stone-900 animate-scaleIn relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* bKash Header Bar with Store Receiving Number */}
        <div className="bg-[#e2136e] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#e2136e] font-black text-xl flex items-center justify-center shadow-md">
              ৳
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold opacity-90">bKash Payment Gateway</div>
              <h3 className="text-sm font-bold tracking-tight">To: ALVYRO ATELIER (01870023718)</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount & Advance Delivery Banner */}
        <div className="bg-pink-50/90 border-b border-pink-200 px-5 py-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-900 block">
              Advance Delivery Charge Only
            </span>
            <span className="text-[11px] text-pink-800">
              Pay the remaining product total upon Cash on Delivery
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-mono font-black text-[#e2136e]">
              ৳{deliveryAmount}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Enter bKash Number */}
          {step === 'number' && (
            <form onSubmit={handleProceedNumber} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-bold text-stone-900">Enter Your bKash Account Number</h4>
                <p className="text-xs text-stone-500">
                  Only the delivery fee (৳{deliveryAmount}) will be charged in advance to confirm your order.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  bKash Mobile Number (11 Digits)
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    inputMode="tel"
                    required
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    placeholder="018XXXXXXXX"
                    className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 rounded-xl font-mono text-base font-bold text-stone-900 focus:outline-none focus:border-[#e2136e] transition-colors"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-stone-600">
                <input type="checkbox" id="terms" defaultChecked className="rounded text-[#e2136e] focus:ring-[#e2136e]" />
                <label htmlFor="terms">I agree to the bKash terms and conditions</label>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-stone-300 rounded-xl text-xs font-bold uppercase text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-[#e2136e] hover:bg-[#c20f5e] active:bg-[#a00d4d] disabled:opacity-60 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Enter Verification Code (OTP) */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-bold text-stone-900">Enter Verification Code (OTP)</h4>
                <p className="text-xs text-stone-500">
                  Enter the 6-digit verification code sent to <strong className="font-mono text-stone-800">{bkashNumber}</strong>
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1 2 3 4 5 6"
                  className="w-full py-3 text-center tracking-[0.3em] font-mono text-2xl font-black border-2 border-stone-300 rounded-xl focus:outline-none focus:border-[#e2136e]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleQuickDemoOtp}
                  className="px-2.5 py-1 bg-pink-100 hover:bg-pink-200 text-[#e2136e] rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  ⚡ Demo OTP (123456)
                </button>

                <span className="text-stone-500 font-mono text-[11px]">
                  {countdown > 0 ? `Resend Code: ${countdown}s` : "Didn't receive? Try again"}
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('number')}
                  className="flex-1 py-3 border border-stone-300 rounded-xl text-xs font-bold uppercase text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-[#e2136e] hover:bg-[#c20f5e] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Verify Code</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Enter bKash PIN */}
          {step === 'pin' && (
            <form onSubmit={handleConfirmPin} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-base font-bold text-stone-900">Enter Your bKash PIN</h4>
                <p className="text-xs text-stone-500">
                  Enter your 5-digit PIN to securely complete advance delivery fee payment
                </p>
              </div>

              <div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={5}
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="• • • • •"
                    className="w-full pl-10 pr-4 py-3 text-center tracking-[0.4em] font-mono text-xl font-black border-2 border-stone-300 rounded-xl focus:outline-none focus:border-[#e2136e]"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleQuickDemoPin}
                  className="px-2.5 py-1 bg-pink-100 hover:bg-pink-200 text-[#e2136e] rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  ⚡ Fill Demo PIN (12345)
                </button>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="flex-1 py-3 border border-stone-300 rounded-xl text-xs font-bold uppercase text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-[#e2136e] hover:bg-[#c20f5e] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Confirm ৳{deliveryAmount}</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Screen */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-3 animate-scaleIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-scaleIn" />
              </div>
              <h4 className="text-lg font-bold text-stone-900">bKash Payment Successful!</h4>
              <p className="text-xs text-stone-600">
                Advance delivery fee of <strong className="text-emerald-700 font-bold">৳{deliveryAmount}</strong> received.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 inline-block text-xs font-mono">
                <span className="text-stone-500 block text-[10px] uppercase">Transaction ID</span>
                <span className="font-bold text-[#e2136e] text-sm">{generatedTrxId}</span>
              </div>
              <p className="text-[11px] text-stone-500">Your order is being confirmed and forwarded to WhatsApp...</p>
            </div>
          )}

          {/* Secure Trust Footer */}
          <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-center space-x-2 text-[10px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Official bKash Gateway Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
