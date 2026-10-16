// src/data/offer.ts
// Copy dan data untuk positioning "MC & Public Speaking" dan "Community Partnership".
// Tanda "CONFIRM:" = isi usulan yang harus disetujui klien sebelum rilis.
// File ini hanya berisi data. Jangan import React atau komponen ke sini.

// ---------------------------------------------------------------------------
// Angka bukti: satu sumber kebenaran untuk Hero, Services, dan Stats.
// ---------------------------------------------------------------------------
export const PROOF_VALUES = {
  years: '7+',
  // CONFIRM: kartu stat Babies Bogor menulis "80+"; deskripsi peran dan Stats global menulis "100+".
  mous: '100+',
  // CONFIRM: deskripsi Babies Bogor menulis "25+"; kartu stat dan Stats global menulis "45+".
  webinars: '45+',
  proposals: '50+',
  activities: '34.5K+',
  campaigners: '1,600+',
} as const

// ---------------------------------------------------------------------------
// Tipe
// ---------------------------------------------------------------------------
export type WhatsAppIntent = 'general' | 'mc' | 'partnership'

export type ProofItem = {
  value: string
  label: string
}

export type ServiceOffer = {
  id: 'mc' | 'partnership'
  number: string
  icon: 'mic' | 'handshake'
  name: string
  tagline: string
  description: string
  bestFor: string
  scope: string[]
  tags: string[]
  proof: ProofItem[]
  cta: { label: string; intent: WhatsAppIntent }
}

export type TopicItem = {
  title: string
  desc: string
}

export type ProcessStep = {
  title: string
  desc: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type ValueItem = {
  name: string
  text: string
  icon: 'shield' | 'eye' | 'target'
}

export type TraitItem = {
  label: string
  title: string
  text: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  organization: string
  photo?: string
}

// ---------------------------------------------------------------------------
// Pesan WhatsApp yang terisi otomatis
// ---------------------------------------------------------------------------
export const WHATSAPP_MESSAGES: Record<WhatsAppIntent, string> = {
  general:
    'Halo Kak Setyorini, saya menemukan website Kakak dan ingin bertanya tentang layanan MC/pembicara atau kolaborasi komunitas.',
  mc: [
    'Halo Kak Setyorini, saya tertarik mengundang Kakak sebagai MC/pembicara.',
    '',
    'Nama / instansi:',
    'Jenis acara:',
    'Tanggal & waktu:',
    'Online / tatap muka (lokasi):',
    'Estimasi durasi:',
    '',
    'Terima kasih.',
  ].join('\n'),
  partnership: [
    'Halo Kak Setyorini, saya ingin berdiskusi tentang kolaborasi/partnership.',
    '',
    'Nama / organisasi:',
    'Bentuk kolaborasi (sponsorship, program, komunitas, dll):',
    'Tujuan & target peserta/mitra:',
    'Perkiraan waktu pelaksanaan:',
    '',
    'Terima kasih.',
  ].join('\n'),
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const HERO = {
  headline: {
    primary: 'MC & Public Speaker',
    secondary: 'Community Partnership',
  },
  brandLine: 'Hangat di panggung. Terstruktur di balik layar.',
  paragraph: `Memandu webinar, talkshow, dan acara komunitas, sekaligus membangun kemitraan, sponsorship, dan program komunitas yang berdampak. ${PROOF_VALUES.years} tahun pengalaman di nonprofit, pendidikan, dan FMCG.`,
  primaryCta: { label: 'Booking MC & Pembicara', intent: 'mc' as WhatsAppIntent },
  secondaryCta: { label: 'Diskusi Kolaborasi', intent: 'partnership' as WhatsAppIntent },
  tertiaryCta: { label: 'Lihat layanan', href: '#services' },
  badges: ['Certified Public Speaking (C.PS)', 'Certified Impactful Writing (C.IW)', 'Host live Zoom & YouTube'],
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
export const SERVICES_SECTION = {
  label: 'Services',
  title: 'Dua layanan untuk acara yang hidup dan komunitas yang tumbuh.',
  intro: 'Pilih sesuai kebutuhan: pemandu acara dan pembicara di depan layar, atau mitra strategis di balik layar.',
  helper: {
    text: 'Belum yakin mana yang sesuai? Ceritakan rencana Anda, formatnya kita cari bersama.',
    cta: { label: 'Tanya via WhatsApp', intent: 'general' as WhatsAppIntent },
  },
}

export const SERVICES: ServiceOffer[] = [
  {
    id: 'mc',
    number: '01',
    icon: 'mic',
    name: 'MC & Public Speaking',
    tagline: 'Acara yang mengalir, peserta yang terlibat.',
    description:
      'Dari webinar dan talkshow hingga sesi training dan gathering komunitas, Setyorini memandu acara dengan hangat, jernih, dan tepat waktu, menjaga alur dan energi peserta dari pembukaan sampai penutup.',
    bestFor: 'Penyelenggara webinar, komunitas, lembaga pendidikan, brand, dan perusahaan.',
    scope: [
      'Briefing dan penyelarasan rundown bersama panitia',
      'Koordinasi dengan pembicara dan tim teknis',
      'Pemanduan sesi tanya jawab dan interaksi peserta',
      'Terbiasa dengan live di Zoom, YouTube, dan StreamYard',
    ],
    tags: ['Webinar & live streaming', 'Talkshow & panel', 'Training & workshop', 'Gathering komunitas'],
    proof: [
      { value: PROOF_VALUES.webinars, label: 'Webinar di-host' },
      { value: 'Hingga 3x', label: 'Live per bulan' },
      { value: 'C.PS', label: 'Certified Public Speaking' },
    ],
    cta: { label: 'Cek ketersediaan tanggal', intent: 'mc' },
  },
  {
    id: 'partnership',
    number: '02',
    icon: 'handshake',
    name: 'Community Partnership',
    tagline: 'Kolaborasi yang jelas peran dan hasilnya.',
    description:
      'Menghubungkan brand, komunitas, dan lembaga dalam kemitraan yang terstruktur, dari pendekatan sponsor, proposal, dan MoU hingga pengelolaan program serta pelaporan dampak.',
    bestFor: 'Komunitas, NGO, brand yang mencari mitra komunitas, dan penyelenggara program yang membutuhkan sponsor.',
    scope: [
      'Strategi pendekatan sponsor, co-branding, dan kolaborasi media',
      'Penyusunan proposal, penyelarasan anggaran, dan MoU',
      'Perancangan dan pengelolaan program komunitas online/hybrid',
      'Monitoring, evaluasi, dan pelaporan (MEL)',
      'Penguatan komunitas: onboarding, engagement flow, dan alur pengingat peserta',
    ],
    tags: ['Sponsorship & MoU', 'Program komunitas', 'Kolaborasi NGO & brand', 'MEL & pelaporan'],
    proof: [
      { value: PROOF_VALUES.mous, label: 'MoU & kesepakatan sponsorship' },
      { value: PROOF_VALUES.proposals, label: 'Proposal program' },
      { value: PROOF_VALUES.activities, label: 'Aktivitas terdokumentasi' },
    ],
    cta: { label: 'Diskusikan kolaborasi', intent: 'partnership' },
  },
]

// CONFIRM: daftar topik adalah usulan yang diturunkan dari pengalaman di portofolio,
// bukan klaim bahwa semua topik pernah dibawakan. Klien boleh menambah atau menghapus.
export const TOPICS = {
  title: 'Topik sharing & training',
  intro: 'Materi disesuaikan dengan profil peserta dan durasi acara. Daftar ini adalah titik awal diskusi.',
  items: [
    {
      title: 'Community building & engagement',
      desc: 'Membangun dan merawat komunitas: onboarding anggota, keterlibatan, dan retensi jangka panjang.',
    },
    {
      title: 'Kolaborasi & sponsorship',
      desc: 'Menyusun proposal, mendekati sponsor, dan merawat kemitraan agar berkelanjutan.',
    },
    {
      // CONFIRM: parafrase dari sesi "Menjadi Representatif Profesional" untuk pengurus Nutri Health Care.
      title: 'Representatif profesional',
      desc: 'Kehadiran, komunikasi, dan etika sebagai wajah organisasi.',
    },
    {
      title: 'Public speaking & komunikasi persuasif',
      desc: 'Menyampaikan ide dengan jernih dan meyakinkan di depan audiens.',
    },
    {
      title: 'Produksi webinar & live streaming',
      desc: 'Dari konsep dan rundown sampai eksekusi live di Zoom dan YouTube.',
    },
    {
      title: 'Operasional komunitas yang efisien',
      desc: 'Memanfaatkan Google Workspace, WA Blast, dan otomasi sederhana untuk menjaga interaksi harian.',
    },
  ] as TopicItem[],
}

// ---------------------------------------------------------------------------
// Values (bersumber dari dokumen profil karier klien; hanya bagian yang aman dipublikasikan)
// ---------------------------------------------------------------------------
export const VALUES_SECTION = {
  label: 'Values',
  title: 'Nilai yang membawa setiap acara dan kolaborasi.',
  motto: {
    first: 'Structure for Scale.',
    second: 'Purpose for People.',
    gloss: 'Struktur yang membuat sesuatu bisa berkembang. Tujuan yang berpihak pada manusia.',
  },
  dna: {
    label: 'Jati diri profesional',
    title: 'The Empathetic Strategist',
    text: 'Perpaduan ketelitian dan struktur yang disampaikan dengan hati yang tulus dan karisma: pemandu yang membawa acara, komunitas, dan kolaborasi menuju pertumbuhan yang berkelanjutan.',
  },
  values: [
    {
      name: 'Integrity',
      text: 'Menjunjung etika, transparansi, dan komitmen di setiap acara dan kolaborasi.',
      icon: 'shield',
    },
    {
      name: 'Clarity',
      text: 'Menyederhanakan proses yang rumit menjadi langkah yang jelas dan terstruktur, dari rundown acara sampai skema kemitraan.',
      icon: 'eye',
    },
    {
      name: 'Impact',
      text: 'Berfokus pada hasil nyata: peserta yang terlibat, mitra yang bertahan, dan program yang terukur.',
      icon: 'target',
    },
  ] as ValueItem[],
  traits: [
    {
      label: 'Professional archetype',
      title: 'The Synergistic Architect',
      // CONFIRM: penyebutan latar belakang QA dan regulasi.
      text: 'Menyatukan komunikasi, kepemimpinan, dan manajemen program, dengan ketelitian dari latar belakang QA dan regulasi, menjadi solusi yang berdampak.',
    },
    {
      label: 'Leadership style',
      title: 'The Transformational Guide',
      text: 'Memimpin lewat inspirasi dan standar etika yang tinggi, agar tim dan mitra tumbuh menjadi versi terbaik mereka.',
    },
    {
      label: 'Communication style',
      title: 'Diplomatis, hangat, penuh pertimbangan',
      text: 'Menjembatani sudut pandang yang berbeda: mendengarkan lebih dulu, lalu menawarkan solusi yang netral namun empatik.',
    },
  ] as TraitItem[],
}

// ---------------------------------------------------------------------------
// Testimonials: JANGAN diisi dengan kutipan karangan. Komponen menyembunyikan diri saat kosong.
// ---------------------------------------------------------------------------
export const TESTIMONIALS_SECTION = {
  label: 'Testimonials',
  title: 'Kata mereka yang pernah bekerja sama.',
}

export const TESTIMONIALS: Testimonial[] = []

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------
// CONFIRM: alur kerja adalah usulan; klien menyesuaikan dengan cara kerjanya.
export const PROCESS_SECTION = {
  label: 'Process',
  title: 'Alur kerja sama yang sederhana.',
  steps: [
    {
      title: 'Kirim brief singkat',
      desc: 'Ceritakan acara atau rencana kolaborasi lewat WhatsApp: tujuan, audiens, tanggal, dan format.',
    },
    {
      title: 'Konfirmasi dan penawaran',
      desc: 'Ketersediaan dan ruang lingkup dikonfirmasi, lalu penawaran dikirim sesuai kebutuhan.',
    },
    {
      title: 'Briefing dan persiapan',
      desc: 'Penyelarasan rundown, alur sesi, dan koordinasi dengan pembicara atau mitra terkait.',
    },
    {
      title: 'Pelaksanaan dan tindak lanjut',
      desc: 'Acara atau program berjalan, dilanjutkan evaluasi dan laporan bila dibutuhkan.',
    },
  ] as ProcessStep[],
  cta: { label: 'Mulai dengan brief singkat', intent: 'general' as WhatsAppIntent },
}

// ---------------------------------------------------------------------------
// FAQ (tarif sengaja tidak mencantumkan angka)
// ---------------------------------------------------------------------------
export const FAQ_SECTION = {
  label: 'FAQ',
  title: 'Pertanyaan yang sering diajukan.',
  intro: 'Tidak menemukan jawabannya? Kirim pertanyaan langsung lewat WhatsApp.',
  cta: { label: 'Tanya via WhatsApp', intent: 'general' as WhatsAppIntent },
  items: [
    {
      question: 'Acara seperti apa yang bisa dipandu?',
      // CONFIRM: format tatap muka.
      answer:
        'Webinar dan live streaming, talkshow dan panel, sesi training atau workshop, serta gathering komunitas. Format online, hybrid, maupun tatap muka dapat didiskusikan.',
    },
    {
      question: 'Bagaimana cara booking MC atau pembicara?',
      answer:
        'Kirim brief singkat lewat WhatsApp berisi jenis acara, tanggal, format, dan estimasi durasi. Ketersediaan akan dikonfirmasi, lalu penawaran dikirim sesuai kebutuhan.',
    },
    {
      question: 'Bagaimana dengan tarif?',
      answer:
        'Tarif menyesuaikan format, durasi, dan kebutuhan persiapan acara. Hubungi lewat WhatsApp untuk mendapatkan penawaran.',
    },
    {
      question: 'Apakah materi sharing bisa disesuaikan dengan audiens?',
      answer:
        'Bisa. Topik dan durasi disesuaikan dengan profil peserta dan tujuan acara. Daftar topik di atas adalah titik awal diskusi.',
    },
    {
      question: 'Apakah bisa bekerja sama untuk program jangka panjang?',
      answer:
        'Bisa. Selain acara tunggal, kerja sama dapat berupa penyusunan kemitraan dan sponsorship, perancangan program komunitas, hingga pelaporan dampak.',
    },
    {
      question: 'Di mana area layanannya?',
      // CONFIRM: area layanan dan ketersediaan acara tatap muka di luar Bogor.
      answer:
        'Berbasis di Bogor, Jawa Barat. Acara online dapat diikuti dari mana saja. Untuk acara tatap muka di luar Bogor, silakan diskusikan lebih dulu.',
    },
  ] as FaqItem[],
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export type InquiryNeed = 'mc' | 'partnership' | 'other'

export const CONTACT_COPY = {
  label: "Let's Connect",
  title: 'Ceritakan kebutuhan acara atau kolaborasi Anda.',
  intro: 'Pilih jenis kebutuhan, isi brief singkat, lalu kirim lewat WhatsApp atau email.',
  fields: {
    name: 'Nama',
    email: 'Email (opsional)',
    need: 'Jenis kebutuhan',
    date: 'Perkiraan tanggal / waktu (opsional)',
    message: 'Pesan',
  },
  needs: [
    { value: 'mc', label: 'MC / Pembicara' },
    { value: 'partnership', label: 'Community Partnership / Sponsorship' },
    { value: 'other', label: 'Lainnya' },
  ] as { value: InquiryNeed; label: string }[],
  whatsappButton: 'Kirim via WhatsApp',
  emailButton: 'Kirim via Email',
  note: 'Pesan dibuka di WhatsApp atau aplikasi email Anda. Website ini tidak menyimpan data formulir.',
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
export const FOOTER_TAGLINE = 'MC & Public Speaker · Community Partnership · Bogor, Indonesia'
