import React, { useState } from "react";
import { Send } from "lucide-react";

export const Footer = ({ t }: { t: any }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-brand-dark text-white/40 py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-display font-bold">F</div>
              <span className="font-display font-bold text-lg tracking-tight text-white">FENNECCORP<span className="text-brand-primary">3.0</span></span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed mb-8">
              Empowering businesses with cutting-edge IT solutions, data-driven insights, and high-performance digital infrastructure.
            </p>
            <div className="flex gap-6">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="text-sm hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <p className="text-sm mb-6">Subscribe to get the latest IT insights and updates.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button 
                disabled={status === 'loading'}
                className="absolute right-1 top-1 bottom-1 px-4 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/80 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {status === 'success' && <p className="text-green-500 text-xs mt-2">Subscribed successfully!</p>}
            {status === 'error' && <p className="text-red-500 text-xs mt-2">Something went wrong.</p>}
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Fenneccorp 3.0. {t.footer.rights}
          </p>
          <div className="flex gap-8 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
