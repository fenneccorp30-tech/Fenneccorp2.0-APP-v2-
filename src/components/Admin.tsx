import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, Users, MessageSquare, ArrowLeft } from "lucide-react";

interface AdminData {
  messages: any[];
  subscribers: any[];
  stats: {
    totalMessages: number;
    totalSubscribers: number;
  };
}

export const Admin = ({ onBack }: { onBack: () => void }) => {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching admin data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-display font-bold">Admin Dashboard</h1>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Site
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-brand-primary/20 rounded-2xl">
                <MessageSquare className="w-6 h-6 text-brand-primary" />
              </div>
              <h2 className="text-xl font-bold">Total Messages</h2>
            </div>
            <p className="text-5xl font-display font-bold">{data?.stats.totalMessages || 0}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-brand-primary/20 rounded-2xl">
                <Users className="w-6 h-6 text-brand-primary" />
              </div>
              <h2 className="text-xl font-bold">Newsletter Subscribers</h2>
            </div>
            <p className="text-5xl font-display font-bold">{data?.stats.totalSubscribers || 0}</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-brand-primary" /> Recent Messages
            </h3>
            <div className="space-y-4">
              {data?.messages.length === 0 ? (
                <p className="text-white/40 italic">No messages yet.</p>
              ) : (
                data?.messages.map((msg, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{msg.name}</h4>
                      <span className="text-xs text-white/40">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-brand-primary mb-2">{msg.email}</p>
                    <p className="text-white/70">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-brand-primary" /> Subscribers
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-sm font-bold uppercase tracking-widest text-white/40">Email</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-widest text-white/40">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-8 text-center text-white/40 italic">No subscribers yet.</td>
                    </tr>
                  ) : (
                    data?.subscribers.map((sub, idx) => (
                      <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="p-4">{sub.email}</td>
                        <td className="p-4 text-white/40 text-sm">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
