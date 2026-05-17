import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FishingScene from '@/components/FishingScene';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    label: 'KOORDINAT',
    title: 'Titik Panas Presisi',
    description: 'Koordinat X/Y yang dioptimasi berdasarkan spesies ikan, cuaca, dan waktu dalam game. Tidak ada lagi tebak-tebakan.',
    accent: 'amber',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><path d="M12 18v-6M9 15l3 3 3-3"/>
      </svg>
    ),
    label: 'LOADOUT',
    title: 'Rig Probabilitas Tinggi',
    description: 'Kombinasi umpan, tali, dan kail yang sudah diuji untuk kondisi spesifik. Dari jig hingga topwater plug.',
    accent: 'teal',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
      </svg>
    ),
    label: 'ANALITIK',
    title: 'Catch Rate Real-time',
    description: 'Perkiraan probabilitas tangkapan dihitung berdasarkan semua variabel kondisi. Angka jujur, bukan estimasi.',
    accent: 'amber',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    label: 'TOURNEY',
    title: 'Grade Tournament',
    description: 'Dirancang untuk pemain yang ingin menang, bukan sekedar bermain. Heuristik lanjutan untuk misi besar.',
    accent: 'teal',
  },
];

const stats = [
  { value: '12+', label: 'Lokasi Danau' },
  { value: '500+', label: 'Kombinasi Loadout' },
  { value: '97%', label: 'Akurasi Prediksi' },
  { value: '24/7', label: 'Selalu Online' },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO - Full screen fishing scene */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Text content */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-0 lg:w-[52%] xl:w-[48%]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/40 bg-amber-500/8 text-amber-400 text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Fishing Sim Tools — v2.1
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl md:text-7xl xl:text-8xl font-black leading-none tracking-tight mb-6 text-white"
          >
            BASS<span className="text-amber-400">LAB</span>
            <br />
            <span className="text-teal-400">HQ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-lg mb-4 leading-relaxed"
          >
            Tools presisi untuk pemain simulasi pancing. Generate koordinat, loadout, dan strategi optimal berdasarkan kondisi game kamu.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm font-mono text-slate-500 mb-10"
          >
            — Bukan untuk pancing sungguhan. Untuk yang serius di game.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/generator">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-base px-8 py-6 rounded-none tracking-wide transition-all duration-200 shadow-lg shadow-amber-500/20">
                BUKA GENERATOR
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-slate-600 hover:border-teal-400 hover:text-teal-400 text-slate-300 font-bold text-base px-8 py-6 rounded-none tracking-wide transition-all duration-200 bg-transparent">
                TENTANG BASSLAB
              </Button>
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-display font-black text-amber-400">{stat.value}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Fishing scene animation */}
        <div className="lg:w-[48%] xl:w-[52%] relative min-h-[55vh] lg:min-h-screen">
          <div className="absolute inset-0">
            <FishingScene />
          </div>
          {/* Fade edge on left for large screens */}
          <div className="absolute inset-y-0 left-0 w-16 hidden lg:block"
            style={{ background: 'linear-gradient(to right, #060e1a, transparent)' }}
          />
        </div>
      </section>

      {/* Features strip */}
      <section className="py-24 bg-[#07111f] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-[0.25em] text-amber-400/70 uppercase mb-3">APA YANG KITA SEDIAKAN</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
              Semua yang kamu butuhkan<br />
              <span className="text-teal-400">untuk menang</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative p-6 bg-white/3 border border-white/7 hover:border-amber-500/30 transition-all duration-300"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${f.accent === 'amber' ? 'bg-amber-500/50' : 'bg-teal-500/50'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`mb-5 ${f.accent === 'amber' ? 'text-amber-400' : 'text-teal-400'}`}>
                  {f.icon}
                </div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase mb-2">{f.label}</p>
                <h3 className="font-display text-xl font-black text-white mb-3 leading-tight">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-[#060e1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(20,184,166,0.06) 0%, transparent 60%)'
        }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-mono tracking-[0.25em] text-teal-400/70 uppercase mb-4">MULAI SEKARANG</p>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-6 leading-none">
            SIAP CETAK<br /><span className="text-amber-400">REKOR?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            Ribuan pemain sudah pakai BassLab HQ untuk meningkatkan performa mereka. Gratis selamanya.
          </p>
          <Link href="/generator">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg px-12 py-7 rounded-none tracking-widest shadow-2xl shadow-amber-500/20 transition-all duration-200">
              LAUNCH GENERATOR →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
