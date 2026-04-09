import { motion } from 'framer-motion';
import { Droplet, Calendar, MapPin, ArrowRight, HeartPulse, Activity, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MOCK_USER, MOCK_REQUESTS, ASSETS } from '@/lib/mockData';
import { toast } from 'sonner';

interface HomeProps {
  onEmergencyClick?: () => void;
}

export function Home({ onEmergencyClick }: HomeProps) {
  const toggleAvailability = (checked: boolean) => {
    toast.success(`Status Updated`, {
      description: `You are now ${checked ? 'Active' : 'Offline'} for blood donations.`,
    });
  };

  return (
    <div className="space-y-8 pb-24">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-red-500 via-rose-600 to-red-600 p-8 text-white shadow-2xl shadow-red-100"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-100">Available for donation</span>
          </div>
          <h2 className="text-3xl font-black">Hey, {MOCK_USER.name.split(' ')[0]}!</h2>
          <p className="text-red-100 mt-2 max-w-[200px] leading-snug">Your O+ blood can save up to 3 lives today.</p>
          
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10">
              <p className="text-[10px] text-red-100 uppercase tracking-widest font-bold">My Group</p>
              <p className="text-4xl font-black mt-1">{MOCK_USER.bloodGroup}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
              <p className="text-[10px] text-red-100 uppercase tracking-widest font-bold">Status</p>
              <div className="flex items-center justify-between mt-2">
                 <span className="text-sm font-black">Active</span>
                 <Switch 
                  defaultChecked={MOCK_USER.availability} 
                  onCheckedChange={toggleAvailability}
                  className="data-[state=checked]:bg-white data-[state=unchecked]:bg-red-400"
                 />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -right-12 -bottom-12 opacity-10">
          <Droplet size={260} fill="currentColor" />
        </div>
      </motion.section>

      <div className="grid grid-cols-4 gap-4 px-2">
        {[
          { icon: Droplet, label: 'Donors', color: 'bg-red-50 text-red-500' },
          { icon: Activity, label: 'Activity', color: 'bg-blue-50 text-blue-500' },
          { icon: Calendar, label: 'Schedule', color: 'bg-amber-50 text-amber-500' },
          { icon: Share2, label: 'Invite', color: 'bg-slate-50 text-slate-500' },
        ].map((item, idx) => (
          <motion.button
            key={item.label}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-sm`}>
              <item.icon size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-black text-xl text-slate-900 tracking-tight">Emergency Requests</h3>
          <button 
            onClick={onEmergencyClick}
            className="text-red-500 text-sm font-bold flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors"
          >
            Create <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="space-y-4">
          {MOCK_REQUESTS.map((request, idx) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden hover:shadow-2xl hover:shadow-red-100 transition-all cursor-pointer group">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={`w-1.5 ${request.urgency === 'critical' ? 'bg-red-600' : 'bg-orange-500'}`}></div>
                    <div className="flex-1 p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-red-500 border-2 border-slate-100 group-hover:border-red-100 group-hover:bg-red-50 transition-colors">
                          <span className="font-black text-xl">{request.bloodGroup}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-lg">{request.patientName}</h4>
                            {request.urgency === 'critical' && (
                              <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter animate-pulse">
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                            <MapPin size={12} className="text-red-400" />
                            <span className="font-medium">{request.hospitalName}</span>
                          </div>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl font-black shadow-lg h-12 px-6 group-hover:bg-red-500 transition-colors">
                          Help
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="relative rounded-[40px] bg-slate-900 p-8 overflow-hidden group">
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20">
            <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">Hero Community</span>
          </div>
          <h4 className="text-2xl font-black text-white leading-tight">Join 10,000+ donors saving lives today.</h4>
          <p className="text-slate-400 text-sm max-w-[200px]">Become part of the fastest response network.</p>
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black h-12 px-8 mt-2">
            Register Now
          </Button>
        </div>
        <img 
          src={ASSETS.HERO} 
          className="absolute right-[-40px] top-[-20px] w-64 h-64 object-cover opacity-50 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>
    </div>
  );
}