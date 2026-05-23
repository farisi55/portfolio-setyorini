export type Responsibility = {
  area: string
  desc: string
}

export type Role = {
  period: string
  title: string
  responsibilities: Responsibility[]
}

export type Experience = {
  org: string
  logo: string
  roles: Role[]
  stats?: {
    value: string
    label: string
  }[]
}

export const PERSONAL = {
  name: 'Setyorini Safitri',
  title: 'Community Project & Partnership Lead',
  tagline:
    'Project Officer / Project Manager with 7+ years of experience managing community-based and partnership-driven programs in nonprofit, education, and FMCG sectors.',
  description:
    'Proven in end-to-end project coordination including planning, budgeting support, stakeholder management, implementation, monitoring, evaluation, and reporting. Experienced in managing donor-funded and impact-oriented projects aligned with SDGs.',
  location: 'Bogor, Jawa Barat, Indonesia',
  email: 'setyorini.safitri@gmail.com',
  phone: '0838 1999 2723',
  linkedin: 'https://linkedin.com/in/setyorinisafitri',
  instagram: '@setyorinisafitri',
  photo: '/assets/hero-photo.jpg',
}

export const PERSONALITY = [
  {
    label: 'DISC Profile',
    value: 'Influencer (Id)',
    desc: 'Memiliki visi, senang merintis jalan baru (Pioneering), dan komunikator yang berani (Sociable & Adventurous).',
  },
  {
    label: 'MBTI',
    value: 'ENFJ-A (Protagonist)',
    desc: 'Berorientasi pada tindakan, melayani, dan melihat potensi maksimal dalam diri klien.',
  },
  {
    label: 'Core Strength',
    value: 'Action-Oriented Empathy',
    desc: 'Kemampuan unik untuk merasakan kebutuhan (pain points) klien dan menerjemahkannya langsung ke dalam action plan bisnis yang terstruktur.',
  },
]

export const CORE_SKILLS = [
  'Project & Program Management',
  'Project Planning, Timeline & Coordination',
  'Stakeholder & Partner Management',
  'Monitoring, Evaluation & Learning (MEL)',
  'Reporting & Documentation',
  'Budget Coordination & Resource Planning',
  'Community-Based Program Implementation',
  'Workshop, Training & Event Coordination',
  'Risk Identification & Problem Solving',
]

export const CERTIFICATIONS = [
  'Certified Public Speaking (C.PS)',
  'Certified Impactful Writing (C.IW)',
  'Zoom Security Operational - Zoom Learning Center (USA)',
  'Content Creator - KOMINFO Digital Talent Scholarship',
  'Top 1 Virtual Assistant - Teman Kreativ Master Class #3',
  'Halal Supervisor (BNSP)',
]

export const SOFTWARE_TOOLS = ['Canva', 'Google Workspace', 'Filmora', 'Zoom', 'StreamYard', 'CapCut']

export const EXPERIENCES: Experience[] = [
  {
    org: 'Teman Kreativ',
    logo: '/assets/logo-teman-kreativ.png',
    roles: [
      {
        period: 'Jan 2026 - Present',
        title: 'Head of Partnership and Operational Support',
        responsibilities: [
          {
            area: 'Partnership & Sponsorship',
            desc: 'Responsible for leading partnership initiatives, developing sponsorship opportunities, and building strategic collaborations with brands, communities, media partners, and speakers.',
          },
          {
            area: 'Program & Event Development',
            desc: 'Managing program concepts, event workflows, operational needs, and developing effective participant reminder systems and engagement flows.',
          },
          {
            area: 'Community Building',
            desc: 'Strengthening community engagement by maintaining positive relationships with participants, partners, and mentors.',
          },
        ],
      },
      {
        period: 'Jan 2023 - Present',
        title: 'Teman Kreativ Talent by VAMC Batch 3',
        responsibilities: [],
      },
    ],
  },
  {
    org: 'Gerakan Binar',
    logo: '/assets/logo-gerakan-binar.png',
    roles: [
      {
        period: 'Jan 2025 - Present',
        title: 'Growth & Partnership Coordinator',
        responsibilities: [
          {
            area: 'Strategic Partnerships',
            desc: 'Orchestrate high-level collaboration end-to-end: customized sponsor outreach, co-branding, proposal development, budget alignments, and comprehensive reporting for NGOs and brands.',
          },
          {
            area: 'Program & Project Delivery',
            desc: 'Plan and run online/hybrid bootcamps. Coordinate stakeholders, speakers, and materials while monitoring real-world impact using rigorous MEL frameworks.',
          },
          {
            area: 'Community Infrastructure',
            desc: 'Designed scalable onboarding pipelines. Streamline national engagement using automated workflows and digital tools (WA Blast, Google Workspace, and Autocrat).',
          },
        ],
      },
      {
        period: 'Jan 2024 - Dec 2024',
        title: 'Project Manager (Learning Program)',
        responsibilities: [],
      },
      {
        period: 'Jan 2019 - Dec 2022',
        title: 'Membership & Community Manager',
        responsibilities: [],
      },
    ],
    stats: [
      { value: '34.5K+', label: 'Documented Activities' },
      { value: '1,600+', label: 'National Campaigners' },
      { value: 'Top 15', label: 'Indika Foundation Impact Grantee' },
    ],
  },
  {
    org: 'Ibu Profesional / Lumbung Ilmu',
    logo: '/assets/logo-ibu-profesional.png',
    roles: [
      {
        period: 'Sep 2024 - Jan 2025',
        title: 'People Development Specialist',
        responsibilities: [
          {
            area: 'People Capacity Building',
            desc: 'Curate tailored workshops and mentoring modules to elevate member skills, support internal leadership transition, and systematically maximize long-term member retention.',
          },
        ],
      },
      {
        period: 'Dec 2022 - Sep 2024',
        title: 'Media & Communication Manager',
        responsibilities: [
          {
            area: 'Media & Communication',
            desc: 'Deliver up to 3 interactive Zoom & YouTube live events monthly. Formulate 30-day social media engagement frameworks to maximize event visibility.',
          },
          {
            area: 'Operations & Reporting',
            desc: 'Direct speakers, moderators, and cross-functional teams. Manage media archiving, event documentation, and key engagement reports.',
          },
        ],
      },
    ],
    stats: [
      { value: '+1,000', label: 'IG Followers (3 Months)' },
      { value: '3x/Mo', label: 'Webinars & Livestreams' },
    ],
  },
  {
    org: 'Babies Bogor',
    logo: '/assets/logo-babies-bogor.png',
    roles: [
      {
        period: '2019 - 2023',
        title: 'Secretary',
        responsibilities: [
          {
            area: "Sponsorship & MoU's",
            desc: 'Authored and finalized 100+ formal Community and Sponsorship MoUs. Compiled 50+ program proposals.',
          },
          {
            area: 'Data & Administration',
            desc: 'Maintained administrative control over 100+ active members. Authored meeting minutes and official regional reports.',
          },
          {
            area: 'Webinar Hosting & Delivery',
            desc: 'Designed, moderated, and hosted 25+ high-engagement community webinar events, delivering 50+ post-activity execution reports.',
          },
        ],
      },
    ],
    stats: [
      { value: '80+', label: 'MoUs & Sponsorship Agreements' },
      { value: '45+', label: 'Hosted Webinar Events' },
    ],
  },
  {
    org: 'Productive Mamas',
    logo: '/assets/logo-productive-mamas.png',
    roles: [
      {
        period: 'Jan 2023',
        title: 'Education Content Support',
        responsibilities: [],
      },
      {
        period: 'Jan 2024 - Dec 2024',
        title: 'Community Program Support',
        responsibilities: [
          {
            area: 'Program & Project Delivery',
            desc: 'Plan and run online/hybrid bootcamps. Coordinate stakeholders, speakers, and materials while monitoring real-world impact using MEL frameworks.',
          },
          {
            area: 'Community Infrastructure',
            desc: 'Designed scalable onboarding pipelines. Streamline national engagement using automated workflows and digital tools.',
          },
        ],
      },
    ],
  },
  {
    org: 'Class Mate',
    logo: '/assets/logo-classmate.png',
    roles: [
      {
        period: 'Jan 2023 - Present',
        title: 'Administrative & Client Relations',
        responsibilities: [
          {
            area: 'Administrative & Lead Management',
            desc: 'Managing and organizing participant lead data, maintaining accurate databases, monitoring registrations.',
          },
          {
            area: 'Documentation & Operational Support',
            desc: 'Organizing and archiving operational documents such as event rundowns, attendance records, and feedback forms.',
          },
          {
            area: 'Teaching & Training Support',
            desc: 'Serving as an instructor or facilitator in training and educational programs by delivering learning materials.',
          },
        ],
      },
    ],
  },
]
