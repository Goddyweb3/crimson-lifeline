import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Droplet, Phone, Plus, Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { BloodGroup } from '@/types';

export function Emergency() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success('Broadcast Success!', {
        description: 'Emergency request sent to 15 nearby donors.',
        duration: 5000,
      });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center space-y-8"
      >
        <div className="w-32 h-32 bg-green-50 rounded-[48px] flex items-center justify-center text-green-500 shadow-xl shadow-green-100/50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle2 size={64} strokeWidth={2.5} />
          </motion.div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Request Broadcasted!</h2>
          <p className="text-slate-500 max-w-xs mx-auto font-medium">
            We've alerted all matching donors within 10km. You will receive a notification as soon as someone responds.
          </p>
        </div>
        <div className="w-full max-w-sm bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-50">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold">
                O-
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ref Number</p>
                <p className="text-sm font-black text-slate-900">#REQ-82910</p>
              </div>
           </div>
           <div className="space-y-3">
             <Button className="w-full h-12 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold">View Status</Button>
             <Button variant="ghost" className="w-full h-12 text-slate-500 font-bold" onClick={() => setIsSuccess(false)}>Create New Request</Button>
           </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500 rounded-[40px] p-8 flex flex-col items-start gap-4 shadow-2xl shadow-red-200 relative overflow-hidden"
      >
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
          <AlertTriangle size={28} />
        </div>
        <div className="relative z-10">
          <h3 className="font-black text-white text-3xl tracking-tight leading-none">Emergency Request</h3>
          <p className="text-red-100 text-sm mt-3 max-w-[280px] font-medium leading-relaxed">
            Our network will notify active donors within your area instantly.
          </p>
        </div>
        <Droplet className="absolute -right-12 -bottom-12 w-48 h-48 text-white/10" fill="currentColor" />
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[40px] overflow-hidden bg-white">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="blood-group" className="text-slate-900 font-black text-sm ml-1 uppercase tracking-widest">Required Blood Group</Label>
              <Select required>
                <SelectTrigger id="blood-group" className="h-14 rounded-[22px] border-none bg-slate-50 shadow-inner px-6 font-bold text-slate-700">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {bloodGroups.map(group => (
                    <SelectItem key={group} value={group} className="font-bold">{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="hospital" className="text-slate-900 font-black text-sm ml-1 uppercase tracking-widest">Hospital / Location</Label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                <Input 
                  id="hospital" 
                  placeholder="Enter hospital name and city" 
                  className="pl-12 h-14 rounded-[22px] border-none bg-slate-50 shadow-inner font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="urgency" className="text-slate-900 font-black text-sm ml-1 uppercase tracking-widest">Urgency Level</Label>
                <Select defaultValue="high">
                  <SelectTrigger id="urgency" className="h-14 rounded-[22px] border-none bg-slate-50 shadow-inner px-6 font-bold text-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="low" className="font-bold">Low</SelectItem>
                    <SelectItem value="medium" className="font-bold text-orange-500">Medium</SelectItem>
                    <SelectItem value="high" className="font-bold text-red-500">High</SelectItem>
                    <SelectItem value="critical" className="font-black text-red-700 animate-pulse">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="contact" className="text-slate-900 font-black text-sm ml-1 uppercase tracking-widest">Contact Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <Input 
                    id="contact" 
                    type="tel"
                    placeholder="+1..." 
                    className="pl-12 h-14 rounded-[22px] border-none bg-slate-50 shadow-inner font-bold text-slate-700"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="details" className="text-slate-900 font-black text-sm ml-1 uppercase tracking-widest">Patient Details</Label>
              <Textarea 
                id="details" 
                placeholder="e.g. Patient name, ward number, or specific time constraints..." 
                className="rounded-[22px] border-none bg-slate-50 shadow-inner min-h-[120px] p-6 font-medium text-slate-700 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="px-2"
        >
          <Button 
            type="submit" 
            className="w-full h-16 bg-red-500 hover:bg-red-600 text-white font-black text-xl rounded-[24px] shadow-2xl shadow-red-200 gap-3 border-b-4 border-red-700 active:border-b-0 active:mt-1 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={28} className="animate-spin" />
                Broadcasting Request...
              </>
            ) : (
              <>
                <Plus size={28} strokeWidth={4} />
                Post Emergency Alert
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}