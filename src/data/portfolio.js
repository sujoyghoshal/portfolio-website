export const portfolioData = {
  name: "Sujoy Ghoshal",
  title: "Software Engineer",
  tagline: "Full Stack Developer | React • Java • Spring Boot",
  resumePath: "/resume.pdf",
  resumeFileName: "Sujoy_Ghoshal_Resume.pdf",
  email: "sujoyghoshal.s@gmail.com",
  phone: "+91 8927673775",
  location: "Gurgaon",
  github: "https://github.com/sujoyghoshal",
  linkedin: "https://linkedin.com/in/sujoyghoshal",
  upiId: "8927673775-14@ybl",

  about: `I'm a passionate Software Engineer at Capgemini with hands-on experience in building scalable full-stack applications using React, Java, and Spring Boot. I love crafting clean, high-performance code and turning complex problems into simple, elegant solutions. From optimizing APIs to building pixel-perfect UIs, I bring both technical depth and a product mindset to everything I build.`,

  services: [
    { name: "Portfolio Website", price: 10000, description: "Clean, responsive portfolio site tailored to your brand", icon: "🌐" },
    { name: "Full Stack Application", price: 25000, description: "End-to-end web app with React frontend & Java/Node backend", icon: "⚡" },
    { name: "Bug Fixing / Consulting", price: 1000, description: "Per hour — diagnosis, fixes, and code review", icon: "🔧", perHour: true },
  ],

  skills: {
    "Frontend": ["React", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Bootstrap"],
    "Backend": ["Java", "Spring Boot", "Node.js", "REST APIs", "Microservices"],
    "Databases & Tools": ["MySQL", "MongoDB", "Firebase", "Git", "Jenkins", "Postman", "Linux"],
    "Concepts": ["System Design", "OOP", "CI/CD", "Agile", "Web Content Management"],
  },

  experience: [
    {
      company: "Capgemini",
      role: "Software Engineer",
      period: "June 2025 – Present",
      location: "Gurgaon, India",
      points: [
        "Diagnosed and resolved 12+ critical bugs in production systems via structured log analysis, improving application stability for customer-facing workflows.",
        "Optimized React front-end components, reducing average page load time by ~20% and improving user engagement metrics.",
        "Applied HTML5, CSS, and JavaScript standards across 5+ frontend modules for WCAG-compliant, cross-browser-compatible content.",
        "Developed and maintained 8+ REST APIs using Java and Spring Boot, cutting average API response latency by 15%.",
        "Authored a library of 10+ reusable React components, reducing UI development effort by 30% across 3 consecutive sprint cycles.",
        "Completed 100% of assigned sprint tasks on time over 6 Agile sprints with a defect rate below 5% per release.",
      ],
    },
    {
      company: "Freelancing – US Clients",
      role: "Frontend Web Developer",
      period: "Aug 2024 – Feb 2025",
      location: "Remote",
      points: [
        "Delivered 4 client web applications — portfolio sites and a hotel booking platform — using React, Node.js, HTML5, and CSS.",
        "Integrated real-time booking and authentication features via Firebase, cutting booking workflow steps by 3.",
        "Achieved full cross-browser compatibility across Chrome, Firefox, Safari, and Edge with zero post-launch layout defects.",
      ],
    },
  ],

  projects: [
    {
      name: "LG 5G NR Development – PDCP Layer MBS Features",
      period: "Oct 2025 – Present",
      tech: ["C", "C++", "Linux", "Telecom Protocols", "Jira"],
      company: "Capgemini",
      points: [
        "Engineered 5+ PDCP features for 5G NR including message parsing, API handlers, and memory optimizations, reducing memory overhead by 18%.",
        "Resolved 10+ GQA and customer-reported defects through root-cause debugging, improving production release stability.",
        "Coordinated with 3 client-side teams delivering production-ready fixes with 95%+ on-time delivery rate.",
      ],
    },
    {
      name: "Banking System – Enterprise Financial Application",
      period: "June 2025 – Sep 2025",
      tech: ["Java", "Spring Boot", "React", "MySQL", "REST API"],
      company: "Capgemini",
      points: [
        "Architected secure account management and transaction REST APIs using Spring Boot and MySQL, supporting 10,000+ daily transactions.",
        "Crafted 15+ modular React UI components wired to backend services, cutting front-end build redundancy by 25%.",
        "Streamlined 6 high-frequency SQL queries, achieving a 40% reduction in average query execution time.",
      ],
    },
  ],

  education: [
    {
      institution: "Chitkara University, Himachal Pradesh",
      degree: "B.Tech in Computer Science Engineering",
      period: "Sep 2021 – May 2025",
      score: "CGPA: 8.27 / 10",
    },
    {
      institution: "Chhotakhelna Surendra Smriti Vidyamandir, West Bengal",
      degree: "Higher Secondary (Class XII)",
      period: "Apr 2019 – Jun 2021",
      score: "72.6%",
    },
  ],
};
