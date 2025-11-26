import { CertificateVerificationModule } from '../components/CertificateVerificationModule';
import { Card } from '../components/ui/card';
import { Shield } from 'lucide-react';

interface VerifyPageProps {
  isPolkadotConnected?: boolean;
}

export function VerifyPage({ isPolkadotConnected = false }: VerifyPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Radial Gradients */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-cyan-500/5 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-[20%] -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/15 to-blue-500/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 py-16 max-w-5xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-3xl mb-8 shadow-2xl shadow-blue-500/20 border border-blue-500/20 backdrop-blur-xl">
            <Shield className="text-blue-400" size={48} />
          </div>
          
          <h1 className="text-slate-100 mb-4 text-5xl uppercase font-black tracking-widest leading-tight">
            Verify Certificate
          </h1>
          
          <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
            Query the Polkadot blockchain for certificate records. Verify authenticity and retrieve complete metadata.
          </p>

          <div className="mt-8">
            {isPolkadotConnected ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 rounded-xl text-emerald-300 text-sm font-semibold border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                <Shield size={18} />
                <span>Polkadot Connected</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 rounded-xl text-amber-300 text-sm font-semibold border border-amber-500/30 shadow-lg shadow-amber-500/10">
                <Shield size={18} />
                <span>Wallet Pending</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <CertificateVerificationModule />

          {/* Verification Process Card */}
          <div className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-950 border-2 border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/10 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-slate-100 mb-8 font-bold text-2xl uppercase tracking-widest relative z-10">Verification Process</h3>
            <div className="space-y-6 text-slate-300 relative z-10">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-blue-500/20">
                  1
                </div>
                <div className="pt-1">
                  <p className="text-slate-100 font-semibold mb-1">Enter Certificate Hash</p>
                  <p className="text-slate-400 text-sm">Provide the SHA256 hash of the certificate you want to verify</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-cyan-500/20">
                  2
                </div>
                <div className="pt-1">
                  <p className="text-slate-100 font-semibold mb-1">Query Polkadot Chain</p>
                  <p className="text-slate-400 text-sm">System searches Polkadot Relay Chain for matching certificate records</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-emerald-500/20">
                  3
                </div>
                <div className="pt-1">
                  <p className="text-slate-100 font-semibold mb-1">Retrieve Metadata</p>
                  <p className="text-slate-400 text-sm">View complete certificate details including issuer, dates, and blockchain verification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Verify Card */}
          <div className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-950 border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-slate-100 mb-6 font-bold text-2xl uppercase tracking-widest relative z-10">Why Verify?</h3>
            <ul className="space-y-4 text-slate-300 relative z-10">
              <li className="flex gap-3 items-start">
                <span className="text-cyan-400 text-xl flex-shrink-0">✓</span>
                <span className="pt-0.5">Confirm file authenticity and detect tampering</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-cyan-400 text-xl flex-shrink-0">✓</span>
                <span className="pt-0.5">Establish proof of ownership with timestamp evidence</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-cyan-400 text-xl flex-shrink-0">✓</span>
                <span className="pt-0.5">Access original metadata and geolocation information</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-cyan-400 text-xl flex-shrink-0">✓</span>
                <span className="pt-0.5">Access permanent, immutable records on Polkadot Relay Chain</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}