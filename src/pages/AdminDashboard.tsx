import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Droplet, 
  AlertCircle, 
  MoreVertical, 
  ShieldCheck, 
  Search, 
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Settings,
  Bell,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MOCK_DONORS, MOCK_REQUESTS } from '@/lib/mockData';
import { toast } from 'sonner';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Donors', value: '2,840', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12%', positive: true },
    { label: 'Active Requests', value: '48', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', change: '+5%', positive: false },
    { label: 'Donations Today', value: '156', icon: Droplet, color: 'text-rose-600', bg: 'bg-rose-50', change: '+18%', positive: true },
    { label: 'Avg Response', value: '18m', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '-2m', positive: true },
  ];

  const handleGenerateReport = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: 'Generating analytics report...',
      success: 'Report generated successfully! Download ready.',
      error: 'Failed to generate report.',
    });
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium mt-1">Monitoring PulseShare global network activity.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="rounded-2xl h-12 px-6 font-bold border-slate-200"
            onClick={() => toast.info('System Settings', { description: 'Opening administrative controls...' })}
          >
            <Settings size={18} className="mr-2" /> Settings
          </Button>
          <Button 
            className="bg-slate-900 hover:bg-black text-white rounded-2xl h-12 px-6 font-black shadow-xl"
            onClick={handleGenerateReport}
          >
            <FileText size={18} className="mr-2" /> Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[32px] overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>
                      <Icon size={24} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-black ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-4xl font-black text-slate-900 mt-2">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/40 rounded-[40px] bg-white">
          <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Recent Donors</CardTitle>
            <div className="relative w-48">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none ring-2 ring-transparent focus:ring-slate-100 transition-all"
              />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-50 hover:bg-transparent">
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Donor</TableHead>
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Group</TableHead>
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Location</TableHead>
                    <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_DONORS.map((donor) => (
                    <TableRow key={donor.id} className="border-slate-50 hover:bg-slate-50 transition-colors group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                              <img src={`https://i.pravatar.cc/150?u=${donor.id}`} alt="" />
                           </div>
                           <span className="font-black text-slate-800 text-sm">{donor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-red-50 text-red-600 border-none font-black px-3 py-1">{donor.bloodGroup}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 font-medium text-sm">{donor.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${donor.availability ? 'bg-green-500' : 'bg-slate-300'} ${donor.availability ? 'animate-pulse' : ''}`}></div>
                          <span className="text-xs font-bold text-slate-600">{donor.availability ? 'Active' : 'Offline'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="rounded-xl group-hover:bg-white shadow-sm transition-all"><MoreVertical size={18} /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[40px] bg-white">
          <CardHeader className="px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Real-time Feed</CardTitle>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-8">
            {MOCK_REQUESTS.map((request, idx) => (
              <div key={request.id} className="flex gap-5 relative">
                {idx !== MOCK_REQUESTS.length - 1 && (
                  <div className="absolute left-[19px] top-12 bottom-[-40px] w-1 bg-slate-50 rounded-full"></div>
                )}
                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center border-4 border-white shadow-xl z-10 transition-transform hover:scale-110 cursor-pointer ${
                  request.urgency === 'critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                }`}>
                  <Droplet size={18} fill="currentColor" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-slate-900">{request.bloodGroup} Requested</span>
                    <Badge variant="outline" className={`text-[10px] h-5 border-2 rounded-lg font-black uppercase ${request.urgency === 'critical' ? 'border-red-100 text-red-500' : 'border-orange-100 text-orange-500'}`}>{request.urgency}</Badge>
                  </div>
                  <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <MapPin size={12} /> {request.hospitalName}
                  </p>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Just Now</p>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-6 bg-slate-50 text-slate-500 hover:bg-slate-100 border-none rounded-[20px] h-14 font-black transition-all"
              onClick={() => toast.info('Notification Center', { description: 'Viewing all historic emergency logs.' })}
            >
              <Bell size={18} className="mr-2" /> View Full History
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-[48px] bg-slate-900 p-10 text-white flex flex-col lg:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
        <div className="flex-1 space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={24} />
            <h3 className="text-2xl font-black tracking-tight">Infrastructure & Security</h3>
          </div>
          <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
            PulseShare uses decentralized node clusters for zero-latency notifications. All biometric and medical data is end-to-end encrypted following global health standards.
          </p>
          <div className="flex gap-6 pt-4">
            <div className="flex flex-col">
               <span className="text-2xl font-black">99.9%</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Uptime</span>
            </div>
            <div className="h-10 w-px bg-slate-800"></div>
            <div className="flex flex-col">
               <span className="text-2xl font-black">AES-256</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Encryption</span>
            </div>
            <div className="h-10 w-px bg-slate-800"></div>
            <div className="flex flex-col">
               <span className="text-2xl font-black">24/7</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Monitoring</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 relative z-10 shrink-0">
           <Button 
            variant="outline" 
            className="border-slate-700 text-white hover:bg-slate-800 rounded-2xl h-14 px-8 font-black transition-all"
           >
             Audit Logs
           </Button>
           <Button 
            className="bg-red-500 hover:bg-red-600 text-white border-none rounded-2xl h-14 px-8 font-black shadow-2xl shadow-red-500/20 transition-all"
           >
             Security Center
           </Button>
        </div>
        {/* Abstract shapes */}
        <div className="absolute right-[-100px] top-[-100px] w-64 h-64 bg-red-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute left-[-100px] bottom-[-100px] w-64 h-64 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}