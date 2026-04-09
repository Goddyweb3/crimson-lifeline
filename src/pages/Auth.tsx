import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Droplet, ArrowRight, Heart, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface AuthProps {
  onLogin: () => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(isLogin ? 'Welcome back, Hero!' : 'Account verified!', {
        description: isLogin ? 'Accessing your donor profile.' : 'You are now part of our life-saving network.',
      });
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-6 py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="mx-auto h-24 w-24 rounded-[32px] bg-red-500 flex items-center justify-center shadow-2xl shadow-red-200"
        >
          <Droplet size={48} className="text-white" fill="white" />
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-4xl font-black tracking-tight text-slate-900"
        >
          {isLogin ? 'Sign In' : 'Join the Network'}
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-center text-sm text-slate-500 font-medium"
        >
          {isLogin ? "Welcome back to PulseShare. " : 'Start your journey as a life saver today. '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-black text-red-500 hover:text-red-600 transition-colors"
          >
            {isLogin ? 'Register now' : 'Log in instead'}
          </button>
        </motion.p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', damping: 20 }}
        >
          <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden bg-white">
            <CardContent className="p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest ml-1 text-slate-400">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <Input id="name" placeholder="John Doe" className="pl-12 h-14 rounded-2xl bg-slate-50 border-none shadow-inner font-bold text-slate-700 placeholder:font-medium" required />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest ml-1 text-slate-400">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <Input id="email" type="email" placeholder="alex@example.com" className="pl-12 h-14 rounded-2xl bg-slate-50 border-none shadow-inner font-bold text-slate-700 placeholder:font-medium" required />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest ml-1 text-slate-400">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <Input id="phone" type="tel" placeholder="+1..." className="pl-12 h-14 rounded-2xl bg-slate-50 border-none shadow-inner font-bold text-slate-700 placeholder:font-medium" required />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest ml-1 text-slate-400">Password</Label>
                    {isLogin && (
                      <button type="button" className="text-[10px] font-black text-red-500 hover:underline uppercase tracking-widest">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <Input id="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className="pl-12 h-14 rounded-2xl bg-slate-50 border-none shadow-inner font-bold text-slate-700" required />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-red-500 hover:bg-red-600 rounded-[22px] font-black text-lg shadow-2xl shadow-red-200 transition-all gap-2"
                    disabled={loading}
                  >
                    {loading ? 'Securing Session...' : (isLogin ? 'Sign In' : 'Create Hero Account')}
                    {!loading && <ArrowRight size={20} />}
                  </Button>
                </motion.div>
              </form>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px]">
                    <span className="bg-white px-4 text-slate-400 font-black uppercase tracking-widest">Secure Auth</span>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer transition-colors shadow-sm">
                       <ShieldCheck size={24} />
                    </div>
                    <span className="text-[8px] font-black uppercase text-slate-400">SHA-256</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer transition-colors shadow-sm">
                       <Heart size={24} />
                    </div>
                    <span className="text-[8px] font-black uppercase text-slate-400">Verified</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}