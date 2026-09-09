export type ProjectData = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tech: string[];
  type: 'Frontend' | 'Backend' | 'Fullstack' | 'System' | 'IoT';
  link?: string;
  github?: string;
  x: number;
  y: number;
};

export type SkillData = {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'Language' | 'Framework' | 'Tool' | 'Concept' | 'Domain';
  x: number;
  y: number;
};

export const portfolioData = {
  profile: {
    name: "Manav Gupta",
    role: "Backend Engineer & Security Analyst",
    title: "Computer Science Engineer | Backend & Cybersecurity Enthusiast",
    bio: "CS undergrad obsessed with how systems work under the hood. I build backends, break into things (legally), and explore the blurry edge between software engineering and security.",
    description: "I'm a Computer Science undergraduate focused on software engineering, backend development, cybersecurity, and problem solving. I enjoy understanding how systems work internally, building practical applications, and exploring areas such as application security and vulnerability analysis. I care about building things that are technically sound rather than simply making them work, and I'm continuously expanding my knowledge across software engineering, systems, and security.",
    email: "manavgupta0808@gmail.com",
    github: "https://github.com/Manav-Gupta08",
    linkedin: "https://linkedin.com/in/manav-gupta-6602b9299",
    leetcode: "https://leetcode.com/u/manav_gupta08/",
    x: "https://x.com/Manav_Gupta08",
    resumeLink: "/Manav_Gupta_resume.pdf",
  },

  hackerQuotes: [
    "The quieter you become, the more you are able to hear. — Kali Linux motto",
    "Security is not a product, but a process. — Bruce Schneier",
    "To learn who rules over you, simply find out who you are not allowed to criticize. — Voltaire",
    "The best way to predict the future is to invent it. — Alan Kay",
    "There is no patch for human stupidity. — Kevin Mitnick",
    "In God we trust. All others we monitor. — NSA",
    "If you think technology can solve your security problems, then you don't understand the problems. — Bruce Schneier",
    "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead room. — Gene Spafford",
  ],

  projects: [
    {
      id: "project-1",
      title: "EduVerse",
      shortDescription: "Interactive e-learning platform for structured online courses.",
      fullDescription: "EduVerse is a responsive e-learning platform built around course discovery, learning progress, and user profiles. The application provides a structured interface for accessing educational content while tracking progress through courses. The project focused on building a responsive frontend and organizing the application around reusable web interfaces and user-focused flows.",
      tech: ["HTML", "CSS", "JavaScript"],
      type: 'Frontend',
      x: 400,
      y: -250
    },
    {
      id: "project-2",
      title: "TalkTrek",
      shortDescription: "Language-learning application with quizzes, lessons, and simulated conversations.",
      fullDescription: "TalkTrek is a language-learning platform designed to make language practice more interactive. It incorporates vocabulary exercises, quizzes, structured lessons, progress tracking, and conversation simulations. The project involved designing the learning flow and creating responsive interfaces that allow users to move through different forms of language practice.",
      tech: ["HTML", "CSS", "JavaScript"],
      type: 'Frontend',
      x: 650,
      y: -50
    },
    {
      id: "project-3",
      title: "Java Inventory System",
      shortDescription: "Java application supporting CRUD operations and persistent data storage.",
      fullDescription: "The Inventory Management System is a Java application designed to manage inventory records and simplify common inventory operations. It implements CRUD functionality, product searching, quantity validation, and persistent saving of inventory data. The project uses Java collections such as HashMap and ArrayList and includes a GUI/CLI interface, providing practical experience with object-oriented programming, data structures, validation, and application logic.",
      tech: ["Java", "Swing", "HashMap", "ArrayList", "OOP"],
      type: 'System',
      x: 350,
      y: 350
    },
    {
      id: "project-4",
      title: "Arduino IoT Home Auto",
      shortDescription: "Arduino-based home automation and security system.",
      fullDescription: "The project combines home automation with basic security functionality using an Arduino Uno, sensors, relays, and a laser-based anti-theft alarm. The system can monitor environmental/input conditions and control connected appliances while triggering an alarm when the security mechanism is activated. The project involved working with physical hardware, sensor inputs, relay-based control, and event-driven system behavior.",
      tech: ["Arduino Uno", "Sensors", "Relays", "Embedded C/C++"],
      type: 'IoT',
      x: 600,
      y: 200
    }
  ] as ProjectData[],

  skills: [
    { id: "s-python", name: "Python", level: 80, category: 'Language', x: -350, y: -250 },
    { id: "s-java", name: "Java", level: 80, category: 'Language', x: -500, y: -100 },
    { id: "s-cpp", name: "C/C++", level: 70, category: 'Language', x: 0, y: 0 },
    { id: "s-kotlin", name: "Kotlin", level: 60, category: 'Language', x: 0, y: 0 },
    { id: "s-web", name: "HTML/CSS/JS", level: 78, category: 'Language', x: -200, y: 150 },
    { id: "s-dsa", name: "DSA", level: 78, category: 'Concept', x: -250, y: -80 },
    { id: "s-oop", name: "OOP", level: 82, category: 'Concept', x: -400, y: 100 },
    { id: "s-os", name: "OS", level: 75, category: 'Concept', x: 0, y: 0 },
    { id: "s-networking", name: "Networking", level: 75, category: 'Concept', x: 0, y: 0 },
    { id: "s-crypto", name: "Cryptography", level: 70, category: 'Concept', x: 0, y: 0 },
    { id: "s-backend", name: "Backend Dev", level: 70, category: 'Domain', x: -300, y: 300 },
    { id: "s-cyber", name: "Cybersecurity", level: 70, category: 'Domain', x: -500, y: 250 },
    { id: "s-pentesting", name: "Penetration Testing", level: 65, category: 'Domain', x: 0, y: 0 },
    { id: "s-forensics", name: "Digital Forensics", level: 65, category: 'Domain', x: 0, y: 0 },
    { id: "s-quantum", name: "Quantum Computing", level: 50, category: 'Domain', x: 0, y: 0 },
    { id: "s-linux", name: "Linux", level: 70, category: 'Tool', x: -150, y: -220 },
    { id: "s-git", name: "Git", level: 80, category: 'Tool', x: 0, y: 0 },
    { id: "s-github", name: "GitHub", level: 80, category: 'Tool', x: 0, y: 0 },
    { id: "s-docker", name: "Docker", level: 65, category: 'Tool', x: 0, y: 0 },
    { id: "s-nmap", name: "Nmap", level: 70, category: 'Tool', x: 0, y: 0 },
    { id: "s-wireshark", name: "Wireshark", level: 70, category: 'Tool', x: 0, y: 0 },
  ] as SkillData[]
};
