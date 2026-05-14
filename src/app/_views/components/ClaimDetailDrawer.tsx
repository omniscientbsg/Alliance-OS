import React, { useState } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { Card } from '@/components/ui/card';
import { Bot, Mail, MessageSquare, Phone, FileText, CheckCircle2, AlertTriangle, ArrowRight, Camera, User, Download, Plus } from 'lucide-react';

interface ClaimDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  claimId: string | null;
}

export function ClaimDetailDrawer({ isOpen, onClose, claimId }: ClaimDetailDrawerProps) {
  const [replyText, setReplyText] = useState('');

  if (!claimId) return null;

  const timelineEvents = [
    {
      id: 1,
      type: 'ai_insight',
      time: 'Just now',
      title: 'Alliance AI Assessment Complete',
      content: 'Based on uploaded photos and telematics data, this claim is eligible for Fast-Track STP. Estimated repair cost (TZS 1.2M) is within the policy deductible (TZS 5M). Liability is clear. Recommend instant approval.',
      icon: <Bot className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      bg: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800'
    },
    {
      id: 2,
      type: 'whatsapp',
      time: '10:45 AM',
      title: 'Customer via WhatsApp',
      content: 'Here are the photos of the bumper damage as requested.',
      attachments: ['bumper_front.jpg', 'bumper_side.jpg'],
      icon: <MessageSquare className="w-5 h-5 text-green-500 dark:text-green-400" />,
      bg: 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800'
    },
    {
      id: 3,
      type: 'system',
      time: '10:40 AM',
      title: 'Automated Request Sent',
      content: 'Alliance AI sent automated WhatsApp message requesting damage photos.',
      icon: <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400" />,
      bg: 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'
    },
    {
      id: 4,
      type: 'call',
      time: '10:30 AM',
      title: 'Voice Call (FNOL Logged)',
      content: 'Customer reported a minor collision in a parking lot. No injuries. Third party was at fault but drove away. Transcript automatically logged.',
      icon: <Phone className="w-5 h-5 text-aos-coral dark:text-orange-400" />,
      bg: 'bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:border-orange-800'
    }
  ];

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="font-bold text-xl text-slate-900 dark:text-slate-100">Case {claimId}</span>
          <span className="px-2.5 py-1 bg-aos-emerald/10 dark:bg-aos-emerald/20 text-aos-emerald dark:text-emerald-400 text-xs font-bold rounded-md flex items-center gap-1 w-fit border border-aos-emerald/20">
            <CheckCircle2 className="w-3 h-3" /> FAST-TRACK ELIGIBLE
          </span>
        </div>
      }
      subtitle="Omnichannel Case Timeline"
      size="xl"
    >
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Left Column: Context & AI */}
        <div className="w-full md:w-[350px] shrink-0 space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-12">
          
          {/* AI Briefing */}
          <Card className="border-indigo-200 dark:border-indigo-900/50 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-500 bg-white dark:bg-[#0f172a]">
            <div className="bg-indigo-600 dark:bg-indigo-900/80 p-3 flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <h3 className="font-semibold text-white text-sm">Alliance AI Briefing</h3>
            </div>
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-aos-coral shrink-0 mt-0.5" />
                <p className="text-slate-700 dark:text-slate-300"><strong>Fraud Risk: Low (12%)</strong>. Phone location matches accident site.</p>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-aos-blue dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-slate-700 dark:text-slate-300"><strong>Policy Status: Active</strong>. 2 previous claims in 5 years.</p>
              </div>
              <div className="pt-3 border-t border-indigo-100 dark:border-indigo-900/50 mt-3">
                <p className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">Suggested Action:</p>
                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Approve TZS 1.2M Settlement
                </button>
              </div>
            </div>
          </Card>

          {/* Quick Facts */}
          <Card className="border-slate-200 dark:border-slate-800 p-4 space-y-4 bg-white dark:bg-[#0f172a]">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Case Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Customer</p>
                <p className="font-medium text-slate-900 dark:text-slate-200 flex items-center gap-2 mt-0.5">
                  <User className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Sarah Jenkins
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Policy</p>
                <p className="font-medium text-aos-blue dark:text-blue-400 mt-0.5 cursor-pointer hover:underline">P11/2026/Motor/1042</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Loss Date</p>
                <p className="font-medium text-slate-900 dark:text-slate-200 mt-0.5">14 May 2026, 10:15 AM</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Initial Reserve</p>
                <p className="font-medium text-slate-900 dark:text-slate-200 mt-0.5">TZS 1,500,000</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: The Timeline */}
        <div className="flex-1 flex flex-col h-[calc(100vh-140px)] min-w-0 bg-slate-50 dark:bg-[#0a0e1a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          
          {/* Timeline Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {timelineEvents.map((event) => (
              <div key={event.id} className="flex gap-4 animate-in slide-in-from-bottom-4 duration-500" style={{ animationFillMode: 'both', animationDelay: `${event.id * 100}ms` }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${event.bg} border`}>
                  {event.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">{event.title}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{event.time}</span>
                  </div>
                  <Card className={`p-4 border shadow-sm ${event.bg}`}>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{event.content}</p>
                    
                    {event.attachments && (
                      <div className="mt-3 flex gap-2">
                        {event.attachments.map((att, i) => (
                          <div key={i} className="flex items-center gap-2 bg-white/60 dark:bg-black/20 px-3 py-1.5 rounded-md border border-black/5 dark:border-white/5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-black/40 cursor-pointer transition-colors">
                            <Camera className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                            {att}
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Omnichannel Reply Box */}
          <div className="p-4 bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Reply via:</span>
              <button className="px-3 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800/50 flex items-center gap-1 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                <MessageSquare className="w-3 h-3" /> WhatsApp
              </button>
              <button className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <Mail className="w-3 h-3" /> Email
              </button>
              <button className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <FileText className="w-3 h-3" /> Internal Note
              </button>
            </div>
            
            <div className="relative">
              <textarea 
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/50 focus:border-aos-blue resize-none h-24 custom-scrollbar text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="Type a message or internal note. Use '/' to trigger Alliance AI commands..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 shadow-sm transition-colors flex items-center gap-2">
                  Send <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
