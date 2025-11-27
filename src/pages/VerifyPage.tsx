import { CertificateVerificationModule } from '../components/CertificateVerificationModule';
import { Card } from '../components/ui/card';
import { Shield } from 'lucide-react';

export function VerifyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Large organic blob shapes */}
      <div className="absolute -top-32 left-[5%] w-[550px] h-[550px] bg-[#FB923C] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-90"></div>
      <div className="absolute top-[10%] -right-40 w-[500px] h-[500px] bg-[#3B82F6] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] opacity-90"></div>
      <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-[#8B5CF6] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-85"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-[#2DD4BF] rounded-[50%_50%_30%_70%/50%_50%_70%_30%] opacity-85"></div>
      <div className="absolute top-[40%] -left-40 w-[400px] h-[400px] bg-[#FACC15] rounded-[70%_30%_50%_50%/60%_40%_60%_40%] opacity-80"></div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#8B5CF6] to-[#FB923C] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#8B5CF6]/30">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-foreground mb-4 text-4xl uppercase font-black tracking-tight">Verify Certificate</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Enter a certificate hash to verify its authenticity on the Polkadot Relay Chain.
            Retrieve complete certificate metadata, timestamp, and verification details.
          </p>
        </div>

        <div className="space-y-6">
          <CertificateVerificationModule />

          <Card className="p-8 bg-card border-2 border-[#2DD4BF]/50 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FACC15]/20 rounded-full blur-2xl"></div>
            <h3 className="text-card-foreground mb-6 font-bold text-xl uppercase tracking-wide relative z-10">Verification Process</h3>
            <div className="space-y-4 text-card-foreground/70 relative z-10">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] text-white rounded-2xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                  1
                </div>
                <div>
                  <p>Enter the SHA256 hash of the file you want to verify</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#FB923C] text-white rounded-2xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                  2
                </div>
                <div>
                  <p>Click "Verify" to query the Polkadot Relay Chain for matching certificate records</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FB923C] to-[#FACC15] text-white rounded-2xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                  3
                </div>
                <div>
                  <p>View complete certificate metadata including issuer, recipient, dates, and blockchain details</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-2 border-[#8B5CF6]/50 shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#3B82F6]/20 rounded-full blur-2xl"></div>
            <h3 className="text-card-foreground mb-6 font-bold text-xl uppercase tracking-wide relative z-10">Why Verify?</h3>
            <ul className="space-y-3 text-card-foreground/70 relative z-10">
              <li className="flex gap-3 items-start">
                <span className="text-[#8B5CF6] text-2xl flex-shrink-0">•</span>
                <span>Confirm file authenticity and detect tampering</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#2DD4BF] text-2xl flex-shrink-0">•</span>
                <span>Establish proof of ownership with timestamp evidence</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#FB923C] text-2xl flex-shrink-0">•</span>
                <span>Access original metadata and geolocation information</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#3B82F6] text-2xl flex-shrink-0">•</span>
                <span>Access permanent, immutable records on the Polkadot Relay Chain</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}