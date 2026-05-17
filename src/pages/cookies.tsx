import React, { useState } from 'react';
import { Link } from 'wouter';

const cookieTypes = [
  {
    type:'Strictly Necessary',
    badge:'Always Active',
    badgeColor:'text-green-400 border-green-500/30',
    canToggle: false,
    desc:'These cookies are required for the website to function. They enable core functionality such as security, session management, and accessibility features.',
    examples:['session_id — Maintains your browser session state','csrf_token — Protects against cross-site request forgery','prefs — Stores your generator default settings (localStorage, not a cookie)'],
  },
  {
    type:'Analytics Cookies',
    badge:'Optional',
    badgeColor:'text-amber-400 border-amber-500/30',
    canToggle: true,
    desc:'Anonymous, aggregated analytics help us understand how the site is used so we can improve the generator and user experience. No personally identifiable information is collected.',
    examples:['_bl_session — Anonymous session identifier','_bl_pages — Pages visited (no user ID attached)','_bl_ref — Referral source (e.g., "from Google search")'],
  },
  {
    type:'Preference Cookies',
    badge:'Optional',
    badgeColor:'text-teal-400 border-teal-500/30',
    canToggle: true,
    desc:'These remember your choices to improve your experience on return visits — such as your default lake selection or preferred species.',
    examples:['generator_defaults — Last used generator parameters','theme — Light/dark mode preference (always dark for us)'],
  },
];

export default function Cookies() {
  const [consents, setConsents] = useState({ analytics: true, preference: true });

  return (
    <div className="min-h-screen bg-[#060e1a]">
      <div className="border-b border-white/5 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="text-[10px] font-mono tracking-[0.28em] text-amber-400/70 uppercase block mb-4">LEGAL</span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-none mb-4">COOKIE POLICY</h1>
          <p className="text-slate-500 font-mono text-sm">Last updated: January 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-14">
        <div className="border border-amber-500/20 bg-amber-500/5 p-5 mb-10">
          <p className="text-sm text-amber-300/80 leading-relaxed">
            <strong className="text-amber-400">TL;DR —</strong> We use cookies to keep the site working and (optionally) to understand usage in aggregate. We do not use advertising cookies, cross-site trackers, or sell your data. You can manage preferences below.
          </p>
        </div>

        <div className="space-y-5 mb-12">
          {cookieTypes.map((ct, i) => (
            <div key={i} className="border border-white/7 bg-white/[0.02]">
              <div className="px-5 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white text-sm">{ct.type}</h3>
                  <span className={`text-[9px] font-mono px-2 py-0.5 border ${ct.badgeColor}`}>{ct.badge}</span>
                </div>
                {ct.canToggle ? (
                  <button
                    onClick={() => setConsents(c => ({ ...c, [i===1?'analytics':'preference']: !c[i===1?'analytics':'preference'] }))}
                    className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
                      (i===1?consents.analytics:consents.preference) ? 'bg-amber-500' : 'bg-white/10'
                    }`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${
                      (i===1?consents.analytics:consents.preference) ? 'left-5' : 'left-0.5'
                    }`}/>
                  </button>
                ) : (
                  <span className="text-[9px] font-mono text-green-400/60 border border-green-500/20 px-2 py-1">REQUIRED</span>
                )}
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{ct.desc}</p>
                <div className="space-y-1.5">
                  {ct.examples.map((ex, j) => (
                    <div key={j} className="flex gap-2 items-start">
                      <span className="text-amber-500/50 font-mono text-xs flex-shrink-0 mt-0.5">•</span>
                      <code className="text-xs font-mono text-slate-500">{ex}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-white/6 p-6 mb-10 bg-white/[0.015]">
          <h2 className="font-display text-2xl font-black text-white mb-3">Managing Cookies</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            You can manage or delete cookies at any time through your browser settings. Note that disabling strictly necessary cookies may affect core functionality.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            To clear localStorage preferences: open your browser's developer tools, go to Application → Local Storage → basslabhq.com, and clear the entries.
          </p>
        </div>

        <div className="border border-white/6 p-6 bg-white/[0.015]">
          <h2 className="font-display text-2xl font-black text-white mb-3">Third-Party Cookies</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            BassLab HQ does not use third-party advertising cookies. Google Fonts may set a cookie when loading typefaces — see Google's Cookie Policy for details. Our hosting provider (Vercel) may set technical cookies for routing and security.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-4">
          <Link href="/privacy"><button className="px-5 py-2 border border-white/10 text-sm font-mono text-slate-500 hover:text-white hover:border-white/25 transition-colors">Privacy Policy</button></Link>
          <Link href="/terms"><button className="px-5 py-2 border border-white/10 text-sm font-mono text-slate-500 hover:text-white hover:border-white/25 transition-colors">Terms of Service</button></Link>
          <Link href="/contact"><button className="px-5 py-2 border border-amber-500/20 text-sm font-mono text-amber-500/70 hover:text-amber-400 hover:border-amber-500/40 transition-colors">Contact Us</button></Link>
        </div>
      </div>
    </div>
  );
}
