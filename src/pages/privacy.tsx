import React from 'react';
import { Link } from 'wouter';

const sections = [
  { title:'Information We Collect', body:`We collect minimal information to operate BassLab HQ:\n\n• Usage data: Pages visited, features used, time spent on the generator tool (no personally identifiable information is attached to this data).\n• Newsletter subscription: If you subscribe, we store your email address solely to send product updates. You can unsubscribe at any time.\n• Contact form submissions: Name, email, and message content, retained for up to 90 days to handle your inquiry.\n• Local storage: Your generator preferences (lake, species, difficulty defaults) are stored in your browser's localStorage and never transmitted to our servers.` },
  { title:'How We Use Your Information', body:`We use collected data to:\n\n• Improve the generator algorithm based on aggregate usage patterns\n• Send requested newsletter updates (only with your explicit consent)\n• Respond to contact form inquiries\n• Monitor platform stability and uptime\n\nWe do not sell, rent, or share your personal data with third parties for marketing purposes.` },
  { title:'Cookies', body:`BassLab HQ uses strictly necessary cookies to operate the website. We do not use advertising cookies or cross-site tracking cookies. For full details, see our Cookie Policy.\n\nTypes we use:\n• Session cookies: Keep you on the correct page state during a browser session.\n• Analytics cookies (optional): Anonymous, aggregated page view data. You can opt out via our cookie banner.` },
  { title:'Third-Party Services', body:`We use a limited number of third-party services:\n\n• Vercel (hosting): The platform serving this website. Subject to Vercel's privacy policy.\n• Google Fonts: Fonts loaded from Google servers. Google may log font request IPs per their privacy policy.\n\nWe do not use Facebook Pixel, Google Ads, or any behavioral advertising trackers.` },
  { title:'Data Retention', body:`• Contact form data: Deleted after 90 days\n• Newsletter emails: Retained until you unsubscribe\n• Analytics data: Aggregated, anonymized, retained up to 12 months\n• Browser localStorage: Controlled entirely by you — clear it anytime via your browser settings` },
  { title:'Your Rights', body:`You have the right to:\n\n• Access data we hold about you\n• Request deletion of your personal data\n• Withdraw consent at any time\n• Opt out of analytics tracking\n\nTo exercise these rights, contact us at privacy@basslabhq.com.` },
  { title:'Contact', body:`Privacy-related inquiries:\nprivacy@basslabhq.com\n\nBassLab HQ is an independent software project. For general questions, visit our Contact page.` },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#060e1a]">
      {/* Header */}
      <div className="border-b border-white/5 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="text-[10px] font-mono tracking-[0.28em] text-amber-400/70 uppercase block mb-4">LEGAL</span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-none mb-4">PRIVACY POLICY</h1>
          <p className="text-slate-500 font-mono text-sm">Last updated: January 2025 · Effective immediately</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-14 space-y-10">
        <p className="text-slate-400 leading-relaxed border-l-2 border-amber-500/40 pl-4">
          BassLab HQ is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how we handle it. We've written this in plain English — no legal obfuscation.
        </p>

        {sections.map((s, i) => (
          <div key={i} className="border border-white/6 p-6 bg-white/[0.02]">
            <h2 className="font-display text-2xl font-black text-white mb-4">{s.title}</h2>
            <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{s.body}</div>
          </div>
        ))}

        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4">
          <Link href="/terms"><button className="px-5 py-2 border border-white/10 text-sm font-mono text-slate-500 hover:text-white hover:border-white/25 transition-colors">Terms of Service</button></Link>
          <Link href="/cookies"><button className="px-5 py-2 border border-white/10 text-sm font-mono text-slate-500 hover:text-white hover:border-white/25 transition-colors">Cookie Policy</button></Link>
          <Link href="/contact"><button className="px-5 py-2 border border-white/10 text-sm font-mono text-slate-500 hover:text-white hover:border-white/25 transition-colors">Contact Us</button></Link>
        </div>
      </div>
    </div>
  );
}
