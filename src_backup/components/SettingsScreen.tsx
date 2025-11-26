import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

export function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('gmt+5:30');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      <h2 className="text-white mb-6">Settings</h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-[#1f1f1f] border border-[#2a2a2a] mb-6">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-600">
            General
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-blue-600">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-blue-600">
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-6">
            <h3 className="text-white mb-6">General Settings</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-[#2a2a2a]">
                <div className="space-y-1">
                  <Label htmlFor="dark-mode" className="text-white">Dark Mode</Label>
                  <p className="text-gray-400">Enable dark mode theme</p>
                </div>
                <Switch 
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="space-y-3 py-4 border-b border-[#2a2a2a]">
                <Label htmlFor="language" className="text-white">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 py-4">
                <Label htmlFor="timezone" className="text-white">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone" className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                    <SelectItem value="gmt+5:30">(GMT+5:30) India Standard Time</SelectItem>
                    <SelectItem value="gmt+0">(GMT+0) Greenwich Mean Time</SelectItem>
                    <SelectItem value="gmt-5">(GMT-5) Eastern Time</SelectItem>
                    <SelectItem value="gmt-8">(GMT-8) Pacific Time</SelectItem>
                    <SelectItem value="gmt+1">(GMT+1) Central European Time</SelectItem>
                    <SelectItem value="gmt+9">(GMT+9) Japan Standard Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-6">
            <h3 className="text-white mb-4">Account Settings</h3>
            <p className="text-gray-400">Account management features coming soon...</p>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-6">
            <h3 className="text-white mb-4">Notification Preferences</h3>
            <p className="text-gray-400">Notification settings coming soon...</p>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-6">
            <h3 className="text-white mb-4">API Configuration</h3>
            <p className="text-gray-400">API management features coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
