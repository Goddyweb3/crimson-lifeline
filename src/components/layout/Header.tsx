import { Bell, Menu, LayoutDashboard, Search, Heart, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { MOCK_NOTIFICATIONS } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  userName: string;
  onMenuClick?: () => void;
  onAdminClick?: () => void;
  isAdmin?: boolean;
}

export function Header({ userName, onMenuClick, onAdminClick, isAdmin }: HeaderProps) {
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 md:px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          className="bg-red-500 p-2 rounded-[14px] shadow-lg shadow-red-100"
        >
          <Heart size={20} className="text-white fill-white" />
        </motion.div>
        <div className="flex flex-col">
          <h1 className="font-black text-xl tracking-tight text-slate-900 leading-none">PulseShare</h1>
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-0.5">Live Save Network</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {isAdmin && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onAdminClick}
            className="hidden md:flex text-slate-600 hover:bg-slate-50 rounded-full"
          >
            <LayoutDashboard size={20} />
          </Button>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-3xl border-none shadow-2xl mr-4">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Notifications</h3>
              <Badge variant="secondary" className="bg-red-50 text-red-500 border-none">{unreadCount} New</Badge>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-none ${!notif.isRead ? 'bg-red-50/30' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    notif.type === 'emergency' ? 'bg-red-100 text-red-500' : 
                    notif.type === 'reminder' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-500'
                  }`}>
                    {notif.type === 'emergency' ? <Bell size={18} /> : 
                     notif.type === 'reminder' ? <Heart size={18} /> : <Search size={18} />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800">{notif.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{notif.message}</p>
                    <p className="text-[10px] font-medium text-slate-400">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-slate-50">
              <button className="text-xs font-bold text-red-500 hover:underline">Mark all as read</button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="h-8 w-px bg-slate-100 mx-1 hidden md:block"></div>
        
        <div className="hidden md:flex items-center gap-3 ml-2">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900">{userName}</p>
            <p className="text-[10px] font-medium text-slate-400">Verified Donor</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
          </div>
        </div>
        
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2.5 text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}