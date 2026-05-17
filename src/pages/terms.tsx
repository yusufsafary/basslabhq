import React from 'react';
import { Link } from 'wouter';

const sections = [
  { title:'Acceptance of Terms', body:'By accessing or using BassLab HQ ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.' },
  { title:'Description of Service', body:'BassLab HQ is a web-based tool that generates tactical recommendations for use in fishing simulation video games. The Service is provided for entertainment and gaming optimization purposes only.\n\nAll generated coordinates, loadout recommendations, and tactical data are fictional and intended exclusively for use within video game environments. They have no application to real-world fishing.' },
  { title:'Permitted Use', body:'You may use BassLab HQ to:\n\n• Generate fishing simulation parameters for personal gaming use\n• Share generated outputs with other gaming community members\n• Access educational content about fishing simulation tactics\n\nYou may not:\n\n• Scrape, copy, or systematically extract data from the Service\n• Reverse-engineer the generation algorithms\n• Use the Service for any commercial purpose without written permission\n• Attempt to probe, scan, or test the vulnerability of the Service' },
  { title:'Intellectual Property', body:'The BassLab HQ name, logo, interface design, and generation algorithms are proprietary to BassLab HQ. All rights reserved.\n\nGenerated output data (coordinates, loadout reports) that you produce using the tool is yours to use freely within the described permitted uses.' },
  { title:'Disclaimer of Warranties', body:'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. BASSLABIQ HQ MAKES NO WARRANTIES REGARDING ACCURACY, RELIABILITY, OR FITNESS FOR A PARTICULAR PURPOSE.\n\nCatch rates and recommendations are probabilistic estimates based on heuristic models. No specific fishing outcome in any game is guaranteed.' },
  { title:'Limitation of Liability', body:'In no event shall BassLab HQ be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service, even if advised of the possibility of such damages.' },
  { title:'Changes to Terms', body:'We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the revised Terms. Material changes will be announced via our newsletter and website banner.' },
  { title:'Governing Law', body:'These Terms are governed by applicable law. Any disputes arising under these Terms will be resolved through good-faith negotiation before any other proceedings.' },
  { title:'Contact', body:'Questions about these Terms:\nlegal@basslabhq.com\n\nFor general inquiries, visit our Contact page.' },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#060e1a]">
      <div className="border-b border-white/5 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="text-[10px] font-mono tracking-[0.28em] text-amber-400/70 uppercase block mb-4">LEGAL</span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-none mb-4">TERMS OF SERVICE</h1>
          <p className="text-slate-500 font-mono text-sm">Last updated: January 2025 · Effective immediately</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-14 space-y-8">
        {sections.map((s, i) => (
          <div key={i} className="border border-white/6 p-6 bg-white/[0.02]">
            <h2 className="font-display text-2xl font-black text-white mb-3">{s.title}</h2>
            <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{s.body}</p>
          </div>
        ))}
        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4">
          <Link href="/privacy"><button className="px-5 py-2 border border-white/10 text-sm font-mono text-slate-500 hover:text-white hover:border-white/25 transition-colors">Privacy Policy</button></Link>
          <Link href="/cookies"><button className="px-5 py-2 border border-white/10 text-sm font-mono text-slate-500 hover:text-white hover:border-white/25 transition-colors">Cookie Policy</button></Link>
        </div>
      </div>
    </div>
  );
}
