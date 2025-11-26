import { VerificationModule } from '../components/VerificationModule';
import { Card } from '../components/ui/card';
import { Shield } from 'lucide-react';

export function VerifyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-foreground mb-3">Verify Media</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter a file hash to verify its authenticity and retrieve blockchain metadata including 
            timestamp, geolocation, and IPFS content identifier.
          </p>
        </div>

        <div className="space-y-6">
          <VerificationModule />

          <Card className="p-6 bg-secondary/10 border-border">
            <h3 className="text-foreground mb-3">Verification Process</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="mb-1">Enter the SHA256 hash of the file you want to verify</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="mb-1">Click "Verify" to query the blockchain for matching records</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="mb-1">View complete metadata including IPFS CID, timestamp, and location data</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-primary/10 border-border">
            <h3 className="text-foreground mb-3">Why Verify?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Confirm file authenticity and detect tampering</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Establish proof of ownership with timestamp evidence</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Access original metadata and geolocation information</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Retrieve files from IPFS using verified content identifiers</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
