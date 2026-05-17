import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const timeline = [
  { year: '2023', title: 'Awal Mula', desc: 'Frustrasi dengan forum yang penuh tebak-tebakan dan spreadsheet usang. Dua developer memutuskan untuk bikin tool yang benar.' },
  { year: '2024', title: 'Alpha Launch', desc: 'Generator pertama rilis ke komunitas Discord. Respons luar biasa — 500 pengguna dalam 48 jam pertama.' },
  { year: '2025', title: 'V2 — BassLab HQ', desc: 'Rebrand total. Algoritma baru, 12+ lokasi, lebih banyak spesies. Platform terus berkembang.' },
];

const values = [
  {
    num: '01',
    title: 'Data Jujur',
    desc: 'Tidak ada angka yang dibuat-buat. Catch rate yang kami tampilkan adalah hasil kalkulasi nyata, bukan motivasi palsu.',
  },
  {
    num: '02',
    title: 'Gratis Selamanya',
    desc: 'Tools ini gratis. Selalu gratis. Kami percaya informasi tidak seharusnya ada di balik paywall.',
  },
  {
    num: '03',
    title: 'Komunitas Driven',
    desc: 'Setiap fitur baru lahir dari permintaan pengguna nyata. Feedback kamu langsung mempengaruhi roadmap kami.',
  },
];

export default function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.3) 0%, transparent 60%)'
        }} />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-[11px] font-mono tracking-[0.3em] text-amber-400/70 uppercase mb-5">
              SIAPA KAMI
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black text-white leading-none mb-6">
              THE STORY<br /><span className="text-amber-400">OF BASSLAB</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Lahir dari frustasi pemain yang lelah menebak. Dibangun oleh developer yang terlalu serius
              dalam game pancing virtual.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#07111f] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-teal-400/70 uppercase mb-4">MISI KAMI</p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Hapus tebak-tebakan,<br />sisakan <span className="text-amber-400">kemenangan.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Simulasi pancing modern sudah kompleks — cuaca dinamis, AI ikan yang rumit, ribuan kombinasi tackle. Untuk benar-benar menguasainya, pemain butuh lebih dari sekedar intuisi.
              </p>
              <p className="text-slate-400 leading-relaxed">
                BassLab HQ hadir sebagai hub central: masukkan kondisi game kamu, dapatkan rekomendasi berbasis data. Bukan jaminan, tapi keunggulan probabilitas nyata.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Akurasi Koordinat', pct: 94 },
                { label: 'Catch Rate Improvement', pct: 78 },
                { label: 'User Satisfaction', pct: 97 },
                { label: 'Turnamen Win Rate', pct: 62 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-mono text-slate-400">{item.label}</span>
                    <span className="font-mono text-amber-400 font-bold">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 w-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-teal-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <p className="text-[11px] font-mono tracking-[0.25em] text-amber-400/70 uppercase mb-10 text-center">NILAI-NILAI KAMI</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 border border-white/7 bg-white/2 hover:border-amber-500/25 transition-colors group"
              >
                <div className="font-display text-5xl font-black text-white/8 group-hover:text-amber-500/15 transition-colors mb-4">{v.num}</div>
                <h3 className="font-display text-2xl text-white mb-3">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#07111f] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-[11px] font-mono tracking-[0.25em] text-teal-400/70 uppercase mb-10 text-center">PERJALANAN</p>
          <div className="relative">
            <div className="absolute left-14 top-0 bottom-0 w-px bg-white/8" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-8 mb-12 last:mb-0"
              >
                <div className="w-14 flex-shrink-0 text-right">
                  <span className="font-display text-lg text-amber-400">{item.year}</span>
                </div>
                <div className="relative pb-2">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 border-2 border-amber-500 bg-[#07111f]" />
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            IKUT BERKONTRIBUSI<br /><span className="text-teal-400">BERSAMA KAMI</span>
          </h2>
          <p className="text-slate-400 mb-8">Punya data dari sesi tournament? Temuan spesies langka? Kami selalu butuh kontributor yang serius.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono tracking-widest text-sm transition-colors">
                HUBUNGI KAMI
              </button>
            </Link>
            <Link href="/generator">
              <button className="px-8 py-3.5 border border-white/15 hover:border-teal-400/40 text-slate-300 hover:text-teal-400 font-bold font-mono tracking-widest text-sm transition-all">
                COBA GENERATOR
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
