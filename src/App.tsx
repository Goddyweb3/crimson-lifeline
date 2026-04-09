import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { MobileNav } from '@/components/layout/MobileNav';
import { Header } from '@/components/layout/Header';
import { Home } from '@/pages/Home';
import { Search } from '@/pages/Search';
import { Emergency } from '@/pages/Emergency';
import { Profile } from '@/pages/Profile';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { Auth } from '@/pages/Auth';
import { MOCK_USER, ASSETS } from '@/lib/mockData';
import { Droplet } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8
          }}
          className="relative"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="w-24 h-24 bg-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-200"
          >
            <Droplet size={48} className="text-white" fill="white" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <h1 className="text-4xl font-black tracking-tighter text-slate-900">PulseShare</h1>
            <p className="text-slate-500 mt-2 font-medium">Connecting Life, One Drop at a Time</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 flex items-center gap-2 text-slate-300 font-bold tracking-widest text-[10px] uppercase"
        >
          <span className="w-8 h-0.5 bg-slate-100"></span>
          Saving Lives Daily
          <span className="w-8 h-0.5 bg-slate-100"></span>
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <Auth onLogin={() => setIsLoggedIn(true)} />
        <Toaster position="top-center" richColors closeButton />
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onEmergencyClick={() => setActiveTab('emergency')} />;
      case 'search': return <Search />;
      case 'emergency': return <Emergency />;
      case 'profile': return <Profile onLogout={() => setIsLoggedIn(false)} />;
      case 'admin': return <AdminDashboard />;
      default: return <Home onEmergencyClick={() => setActiveTab('emergency')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">
      <Header 
        userName={MOCK_USER.name} 
        onMenuClick={() => setIsAdmin(!isAdmin)} 
        onAdminClick={() => setActiveTab('admin')}
        isAdmin={isAdmin}
      />
      
      <main className="max-w-4xl mx-auto px-4 pt-4 md:px-6 md:pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <MobileNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdmin={isAdmin}
      />
      
      <Toaster position="top-center" richColors closeButton />
      
      {/* Dev shortcuts for demo */}
      <div className="fixed bottom-24 right-6 hidden lg:flex flex-col gap-2 z-50">
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className="px-4 py-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-2xl text-xs font-bold text-slate-500 shadow-xl border border-slate-100 transition-all hover:scale-105"
        >
          Toggle Admin: {isAdmin ? 'ON' : 'OFF'}
        </button>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="px-4 py-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-2xl text-xs font-bold text-red-500 shadow-xl border border-slate-100 transition-all hover:scale-105"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default App;