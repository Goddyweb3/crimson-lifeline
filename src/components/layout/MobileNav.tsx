import { motion } from 'framer-motion';
import { Home, Search, AlertCircle, User, LayoutDashboard } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin?: boolean;
}

export function MobileNav({ activeTab, setActiveTab, isAdmin }: MobileNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Find Donors' },
    { id: 'emergency', icon: AlertCircle, label: 'Request' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  if (isAdmin) {
    tabs.splice(1, 0, { id: 'admin', icon: LayoutDashboard, label: 'Admin' });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-between items-center z-50 md:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center gap-1 group"
          >
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
                color: isActive ? '#ef4444' : '#94a3b8'
              }}
              className="p-1"
            >
              <Icon size={24} />
            </motion.div>
            <span className={`text-[10px] font-medium ${isActive ? 'text-red-500' : 'text-slate-400'}`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-1 w-1 h-1 bg-red-500 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}