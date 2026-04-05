export default function Footer() {
  return (
    <footer className="site-footer px-4 sm:px-6 border-t border-white/5">
      <div className="footer-inner max-w-6xl mx-auto px-4 md:px-6 text-center">
        <div className="footer-copy flex items-center justify-center text-slate-500 text-sm text-center">
          <center>
            <span>© {new Date().getFullYear()} Sujoy Ghoshal. All rights reserved.</span>
          </center>
        </div>
      </div>
    </footer>
  );
}
