import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, BadgePercent, ShieldCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../context/Store';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedSeats, confirmBooking, user } = useApp();
  const [method, setMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const tax = Math.round(totalPrice * 0.1); // 10% tax
  const finalTotal = totalPrice + tax;

  const handlePay = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      confirmBooking(method);
      setIsProcessing(false);
      navigate('/ticket');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Payment Methods */}
        <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
            
            <div className="space-y-4 mb-8">
                <label className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all group ${method === 'card' ? 'border-brand-500 bg-brand-900/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}>
                <input type="radio" name="payment" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="w-5 h-5 accent-brand-500" />
                <div className="bg-slate-800 p-3 rounded-xl group-hover:bg-slate-700 transition-colors"><CreditCard className="w-6 h-6 text-white" /></div>
                <div className="flex-1">
                    <p className="font-bold text-white text-lg">Credit / Debit Card</p>
                    <p className="text-sm text-slate-500">Visa, Mastercard, Amex</p>
                </div>
                </label>

                <label className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all group ${method === 'upi' ? 'border-brand-500 bg-brand-900/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}>
                <input type="radio" name="payment" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} className="w-5 h-5 accent-brand-500" />
                <div className="bg-slate-800 p-3 rounded-xl group-hover:bg-slate-700 transition-colors"><ShieldCheck className="w-6 h-6 text-green-400" /></div>
                <div className="flex-1">
                    <p className="font-bold text-white text-lg">UPI / Net Banking</p>
                    <p className="text-sm text-slate-500">Google Pay, PhonePe, BHIM</p>
                </div>
                </label>
                
                <label className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all group ${method === 'wallet' ? 'border-brand-500 bg-brand-900/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}>
                <input type="radio" name="payment" value="wallet" checked={method === 'wallet'} onChange={() => setMethod('wallet')} className="w-5 h-5 accent-brand-500" />
                <div className="bg-slate-800 p-3 rounded-xl group-hover:bg-slate-700 transition-colors"><Wallet className="w-6 h-6 text-orange-400" /></div>
                <div className="flex-1">
                    <p className="font-bold text-white text-lg">Wallets</p>
                    <p className="text-sm text-slate-500">Paytm, Amazon Pay</p>
                </div>
                </label>
            </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px]">
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
                
                <div className="flex gap-4 mb-6 pb-6 border-b border-slate-800">
                    <img src={selectedMovie?.posterUrl} className="w-16 h-24 object-cover rounded-lg" />
                    <div>
                        <p className="font-bold text-white mb-1">{selectedMovie?.title}</p>
                        <p className="text-sm text-slate-400">{selectedSeats.length} Tickets</p>
                        <p className="text-sm text-slate-400">{selectedSeats.map(s => `${s.row}${s.col}`).join(', ')}</p>
                    </div>
                </div>

                <div className="flex justify-between mb-3">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-white font-medium">${totalPrice}</span>
                </div>
                <div className="flex justify-between mb-6">
                    <span className="text-slate-400">Convenience Fee (10%)</span>
                    <span className="text-white font-medium">${tax}</span>
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-6">
                    <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 flex items-center gap-2">
                    <BadgePercent className="w-5 h-5 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Promo Code" 
                        className="bg-transparent border-none focus:outline-none text-white w-full py-3 text-sm"
                    />
                    </div>
                    <button className="px-4 rounded-xl font-bold text-sm text-brand-500 bg-brand-500/10 hover:bg-brand-500/20 transition-colors">Apply</button>
                </div>

                <div className="border-t border-slate-800 pt-4 mb-6 flex justify-between items-center">
                    <span className="font-bold text-slate-300">Total Amount</span>
                    <span className="font-bold text-brand-500 text-3xl">${finalTotal}</span>
                </div>

                <button 
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-brand-900/20"
                >
                    {isProcessing ? 'Processing Payment...' : (
                        <>
                            Pay Now <ChevronRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
