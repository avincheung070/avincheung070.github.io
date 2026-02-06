"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/45">
          © {new Date().getFullYear()} Avin. Built with Next.js & Tailwind CSS.
        </p>
        <p className="text-xs text-white/35">
          Designed & developed by Avin
        </p>
      </div>
    </footer>
  );
}
