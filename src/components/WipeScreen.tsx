import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useState } from 'react';

export function WipeScreen() {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('nist');

  const handleStartWipe = () => {
    if (!selectedDevice) {
      alert('Please select a device to wipe');
      return;
    }
    alert(`Starting wipe for ${selectedDevice} using ${selectedMethod} method`);
  };

  return (
    <div className="p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-8 w-full max-w-2xl">
        <h2 className="text-white mb-8">Wipe a Device</h2>
        
        <div className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="device-select" className="text-gray-300">Select the device you want to wipe</Label>
            <Select value={selectedDevice} onValueChange={setSelectedDevice}>
              <SelectTrigger id="device-select" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                <SelectValue placeholder="Choose a device..." />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                <SelectItem value="Device-A1B2C3">Device-A1B2C3</SelectItem>
                <SelectItem value="Device-D4E5F6">Device-D4E5F6</SelectItem>
                <SelectItem value="Device-G7H8I9">Device-G7H8I9</SelectItem>
                <SelectItem value="Device-J0K1L2">Device-J0K1L2</SelectItem>
                <SelectItem value="Device-M3N4O5">Device-M3N4O5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-gray-300">Select Wiping Method</Label>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] hover:border-blue-500/50 transition-all">
                <RadioGroupItem value="nist" id="nist" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="nist" className="text-white cursor-pointer">
                    NIST SP 800-88
                  </Label>
                  <p className="text-gray-400 mt-1">National Institute of Standards and Technology guideline for media sanitization</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] hover:border-blue-500/50 transition-all">
                <RadioGroupItem value="dod" id="dod" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="dod" className="text-white cursor-pointer">
                    DoD 5220.22-M
                  </Label>
                  <p className="text-gray-400 mt-1">U.S. Department of Defense standard for secure data wiping</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] hover:border-blue-500/50 transition-all">
                <RadioGroupItem value="gutmann" id="gutmann" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="gutmann" className="text-white cursor-pointer">
                    Gutmann Method
                  </Label>
                  <p className="text-gray-400 mt-1">35-pass overwrite method for maximum security</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Button 
            onClick={handleStartWipe}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Start Wipe
          </Button>
        </div>
      </Card>
    </div>
  );
}
