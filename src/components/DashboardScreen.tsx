import { Card } from './ui/card';
import { HardDrive, CheckCircle, Clock, XCircle, Download } from 'lucide-react';
import { Button } from './ui/button';

export function DashboardScreen() {
  const stats = [
    { title: 'Total Devices', value: '150', icon: HardDrive, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Wipes', value: '1,247', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { title: 'Pending Wipes', value: '12', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Failed Wipes', value: '3', icon: XCircle, color: 'from-red-500 to-red-600' },
  ];

  const recentActivity = [
    { deviceName: 'Device-A1B2C3', status: 'Completed', statusColor: 'text-green-500 bg-green-500/10' },
    { deviceName: 'Device-D4E5F6', status: 'Completed', statusColor: 'text-green-500 bg-green-500/10' },
    { deviceName: 'Device-G7H8I9', status: 'Failed', statusColor: 'text-red-500 bg-red-500/10' },
    { deviceName: 'Device-J0K1L2', status: 'Completed', statusColor: 'text-green-500 bg-green-500/10' },
    { deviceName: 'Device-M3N4O5', status: 'Completed', statusColor: 'text-green-500 bg-green-500/10' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-white mb-2">Hello, Admin</h2>
        <p className="text-gray-400">Welcome back to ZeroTrace Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-[#1f1f1f] border-[#2a2a2a] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <p className="text-gray-400 mb-1">{stat.title}</p>
              <p className="text-white">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-6">
        <h3 className="text-white mb-6">Recent Activity</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="text-left text-gray-400 pb-4">Device Name</th>
                <th className="text-left text-gray-400 pb-4">Status</th>
                <th className="text-left text-gray-400 pb-4">Report</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr key={index} className="border-b border-[#2a2a2a] last:border-0">
                  <td className="py-4 text-white">{activity.deviceName}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full ${activity.statusColor}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
