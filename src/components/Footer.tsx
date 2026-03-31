export const Footer = ({ t }: { t: any }) => {
  return (
    <footer className="bg-brand-dark text-white/40 py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-display font-bold">F</div>
          <span className="font-display font-bold text-lg tracking-tight text-white">FENNECCORP<span className="text-brand-primary">3.0</span></span>
        </div>
        
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Fenneccorp 3.0. {t.footer.rights}
        </p>

        <div className="flex gap-6">
          {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
            <a key={social} href="#" className="text-sm hover:text-white transition-colors">{social}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};
