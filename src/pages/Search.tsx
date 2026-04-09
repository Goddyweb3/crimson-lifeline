import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, MapPin, Filter, Phone, MessageCircle, Map as MapIcon, Grid, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_DONORS, ASSETS } from '@/lib/mockData';
import { BloodGroup } from '@/types';
import { toast } from 'sonner';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | 'All'>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  const bloodGroups: (BloodGroup | 'All')[] = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = MOCK_DONORS.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleContact = (name: string, type: 'call' | 'msg') => {
    toast.success(`${type === 'call' ? 'Calling' : 'Messaging'} ${name}...`, {
      description: type === 'call' ? 'Connecting to donor...' : 'Opening secure chat channel.',
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 sticky top-[73px] z-30 bg-slate-50/5 backdrop-blur-md py-2 px-1">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
              placeholder="Find by name or location..." 
              className="pl-12 h-14 bg-white border-none rounded-2xl shadow-xl shadow-slate-200/50 font-medium placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-14 w-14 rounded-2xl bg-white border-none shadow-xl shadow-slate-200/50 text-slate-600"
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          >
            {viewMode === 'list' ? <MapIcon size={22} /> : <Grid size={22} />}
          </Button>
        </div>
        
        <div className="flex overflow-x-auto gap-2.5 pb-2 no-scrollbar px-1">
          {bloodGroups.map((group) => (
            <motion.button
              key={group}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGroup(group)}
              className={`px-5 py-2.5 rounded-[18px] text-sm font-black whitespace-nowrap border-2 transition-all ${
                selectedGroup === group 
                  ? 'bg-red-500 border-red-500 text-white shadow-xl shadow-red-200' 
                  : 'bg-white border-transparent text-slate-500 shadow-md hover:border-red-100'
              }`}
            >
              {group}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {viewMode === 'list' ? (
          <motion.div 
            key="list" 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-slate-900 text-lg">
                Available Donors <span className="text-red-500 ml-1">({filteredDonors.length})</span>
              </h3>
              <Button variant="ghost" size="sm" className="text-slate-500 font-bold">
                <Filter size={16} className="mr-2" /> Refine
              </Button>
            </div>

            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor, idx) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/40 border border-slate-50 hover:shadow-2xl hover:shadow-red-50 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-5">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-red-500 font-black text-2xl border-2 border-white shadow-sm">
                          {donor.bloodGroup}
                        </div>
                        {donor.availability && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-sm"></span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-xl tracking-tight group-hover:text-red-500 transition-colors">{donor.name}</h4>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1.5 font-medium">
                          <MapPin size={14} className="text-red-400" />
                          <span>{donor.location}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] px-2.5 py-1 uppercase">
                            2.4 km away
                          </Badge>
                          <Badge className="bg-slate-100 text-slate-500 border-none font-black text-[10px] px-2.5 py-1 uppercase">
                            Last: {donor.lastDonationDate ? '3m ago' : 'Never'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-8">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-red-200 h-12 font-bold transition-all"
                      onClick={() => handleContact(donor.name, 'msg')}
                    >
                      <MessageCircle size={20} className="mr-2 text-red-500" /> Message
                    </Button>
                    <Button 
                      className="flex-1 rounded-2xl bg-slate-900 hover:bg-black text-white h-12 font-bold shadow-lg shadow-slate-200"
                      onClick={() => handleContact(donor.name, 'call')}
                    >
                      <Phone size={20} className="mr-2" /> Call Now
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center mb-6">
                  <X size={40} className="text-slate-200" />
                </div>
                <h4 className="font-black text-slate-900 text-xl">No matches found</h4>
                <p className="text-slate-500 text-sm mt-2 max-w-[240px] font-medium">Try expanding your search radius or changing the blood group.</p>
                <Button 
                  variant="ghost" 
                  className="mt-6 text-red-500 font-black"
                  onClick={() => { setSearchTerm(''); setSelectedGroup('All'); }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="map" 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative h-[60vh] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
          >
            <img 
              src={ASSETS.MAP} 
              alt="Donor Map" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
            
            {/* Map Markers Simulation */}
            {filteredDonors.slice(0, 4).map((donor, idx) => (
              <motion.div
                key={donor.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: idx * 0.2 }}
                className="absolute p-2 bg-white rounded-2xl shadow-xl flex items-center gap-2 border-2 border-red-50"
                style={{ 
                  top: `${20 + idx * 15}%`, 
                  left: `${20 + (idx % 2 === 0 ? 40 : 10)}%` 
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white font-black text-xs">
                  {donor.bloodGroup}
                </div>
                <span className="text-[10px] font-black pr-2">{donor.name.split(' ')[0]}</span>
              </motion.div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
                      <MapPin size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current View</p>
                      <p className="text-sm font-black text-slate-900">Downtown Area</p>
                   </div>
                </div>
                <Badge className="bg-red-500 text-white border-none font-black">{filteredDonors.length} Nearby</Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}