import { motion } from 'framer-motion';
import { User, Phone, Mail, MapPin, Droplet, History, Settings, LogOut, ChevronRight, Award, QrCode, CreditCard, ShieldCheck } from 'lucide-react';
import { MOCK_USER, MOCK_DONATIONS } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProfileProps {
  onLogout?: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const menuItems = [
    { icon: History, label: 'Donation History', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Award, label: 'Achievements', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: CreditCard, label: 'Donor ID Card', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: ShieldCheck, label: 'Privacy & Security', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col items-center pt-6 px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-[48px] bg-white p-1.5 shadow-2xl overflow-hidden border-4 border-white rotate-3">
             <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover rounded-[44px]" />
          </div>
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 -right-2 bg-red-500 p-3 rounded-2xl shadow-xl shadow-red-200 border-4 border-white"
          >
            <span className="text-white font-black text-sm">{MOCK_USER.bloodGroup}</span>
          </motion.div>
        </motion.div>
        
        <div className="text-center mt-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{MOCK_USER.name}</h2>
          <div className="flex items-center justify-center gap-1.5 text-slate-500 font-bold text-sm mt-1.5">
            <MapPin size={16} className="text-red-500" />
            <span>{MOCK_USER.location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 px-2">
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-[32px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mb-3">
               <Droplet size={20} fill="currentColor" />
            </div>
            <span className="text-3xl font-black text-slate-900">{MOCK_USER.donationsCount}</span>
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Donations</span>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-[32px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
               <Award size={20} />
            </div>
            <span className="text-3xl font-black text-slate-900">{MOCK_USER.livesSaved}</span>
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Lives Saved</span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 px-2">
        <h3 className="font-black text-slate-900 text-lg ml-2">Contact Info</h3>
        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-3">
            <div className="space-y-1">
              <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Phone Number</p>
                  <p className="font-black text-slate-900">{MOCK_USER.phone}</p>
                </div>
              </div>
              <div className="h-px bg-slate-50 mx-4"></div>
              <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Email Address</p>
                  <p className="font-black text-slate-900">{MOCK_USER.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3 px-2">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-5 bg-white rounded-[28px] shadow-lg shadow-slate-200/40 border border-white hover:bg-slate-50 transition-all"
              onClick={() => toast(`Feature Coming Soon`, { description: `We are working on the ${item.label} module.` })}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm`}>
                  <Icon size={24} />
                </div>
                <span className="font-black text-slate-800">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </motion.button>
          );
        })}
      </div>

      <div className="px-2">
        <div className="bg-gradient-to-br from-slate-900 to-black rounded-[40px] p-8 text-white flex items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h4 className="text-xl font-black">Donor QR Code</h4>
            <p className="text-slate-400 text-xs font-medium max-w-[160px]">Scan at hospitals to instantly pull up your medical profile.</p>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-black h-11 px-6 mt-4">
              Show Code
            </Button>
          </div>
          <div className="p-4 bg-white rounded-3xl relative z-10">
            <QrCode size={80} className="text-slate-900" />
          </div>
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full"></div>
        </div>
      </div>

      <div className="px-6">
        <Button 
          variant="ghost" 
          className="w-full h-16 rounded-[28px] text-red-500 font-black hover:bg-red-50 gap-3 border-2 border-transparent hover:border-red-100 transition-all"
          onClick={onLogout}
        >
          <LogOut size={22} />
          Sign Out Account
        </Button>
      </div>
    </div>
  );
}