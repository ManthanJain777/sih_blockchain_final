import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

export function LogsScreen() {
  const logs = [
    {
      deviceId: 'DEV-001',
      deviceName: 'Device-A1B2C3',
      wipeMethod: 'NIST SP 800-88',
      status: 'Completed',
      timestamp: '2025-11-06 14:30:45',
      statusColor: 'text-green-500 bg-green-500/10',
    },
    {
      deviceId: 'DEV-002',
      deviceName: 'Device-D4E5F6',
      wipeMethod: 'DoD 5220.22-M',
      status: 'Completed',
      timestamp: '2025-11-06 13:15:22',
      statusColor: 'text-green-500 bg-green-500/10',
    },
    {
      deviceId: 'DEV-003',
      deviceName: 'Device-G7H8I9',
      wipeMethod: 'Gutmann Method',
      status: 'Failed',
      timestamp: '2025-11-06 12:45:10',
      statusColor: 'text-red-500 bg-red-500/10',
    },
    {
      deviceId: 'DEV-004',
      deviceName: 'Device-J0K1L2',
      wipeMethod: 'NIST SP 800-88',
      status: 'Completed',
      timestamp: '2025-11-06 11:20:33',
      statusColor: 'text-green-500 bg-green-500/10',
    },
    {
      deviceId: 'DEV-005',
      deviceName: 'Device-M3N4O5',
      wipeMethod: 'DoD 5220.22-M',
      status: 'Completed',
      timestamp: '2025-11-06 10:05:18',
      statusColor: 'text-green-500 bg-green-500/10',
    },
    {
      deviceId: 'DEV-006',
      deviceName: 'Device-P6Q7R8',
      wipeMethod: 'NIST SP 800-88',
      status: 'Failed',
      timestamp: '2025-11-06 09:30:55',
      statusColor: 'text-red-500 bg-red-500/10',
    },
    {
      deviceId: 'DEV-007',
      deviceName: 'Device-S9T0U1',
      wipeMethod: 'Gutmann Method',
      status: 'Completed',
      timestamp: '2025-11-06 08:15:42',
      statusColor: 'text-green-500 bg-green-500/10',
    },
    {
      deviceId: 'DEV-008',
      deviceName: 'Device-V2W3X4',
      wipeMethod: 'DoD 5220.22-M',
      status: 'Completed',
      timestamp: '2025-11-05 16:45:27',
      statusColor: 'text-green-500 bg-green-500/10',
    },
  ];

  return (
    <div className="p-8">
      <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-6">
        <h2 className="text-white mb-6">Wipe Logs</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="text-left text-gray-400 pb-4">Device ID</th>
                <th className="text-left text-gray-400 pb-4">Device Name</th>
                <th className="text-left text-gray-400 pb-4">Wipe Method</th>
                <th className="text-left text-gray-400 pb-4">Status</th>
                <th className="text-left text-gray-400 pb-4">Timestamp</th>
                <th className="text-left text-gray-400 pb-4">Report</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-b border-[#2a2a2a] last:border-0">
                  <td className="py-4 text-gray-300">{log.deviceId}</td>
                  <td className="py-4 text-white">{log.deviceName}</td>
                  <td className="py-4 text-gray-300">{log.wipeMethod}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full ${log.statusColor}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">{log.timestamp}</td>
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
