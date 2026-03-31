import { motion } from "motion/react";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

export const Contact = ({ t }: { t: any }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-brand-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 -skew-x-12 translate-x-1/2" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
              {t.contact.title.split(' ').slice(0, -1).join(' ')} <br />
              {t.contact.title.split(' ').slice(-1).join(' ')}
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-md font-light">
              {t.contact.desc}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <span className="block text-sm text-white/40 uppercase tracking-widest font-bold mb-1">{t.contact.call}</span>
                  <a href="tel:+213551759931" className="text-2xl font-display font-medium hover:text-brand-primary transition-colors">+213 551 759 931</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <span className="block text-sm text-white/40 uppercase tracking-widest font-bold mb-1">{t.contact.email}</span>
                  <a href="mailto:fenneccorp3.0@gmail.com" className="text-2xl font-display font-medium hover:text-brand-primary transition-colors">fenneccorp3.0@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[40px] text-brand-dark"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                <p className="text-gray-500">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.contact.nameLabel}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.contact.emailLabel}</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.contact.messageLabel}</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="..." 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary transition-all resize-none" 
                  />
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-brand-primary transition-all shadow-lg hover:shadow-brand-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : (
                    <>
                      {t.contact.send}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
