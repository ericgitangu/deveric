export interface Technology {
  name: string;
  icon: string;
  iconLib: "di" | "si" | "lucide";
}

export interface SkillArea {
  id: string;
  title: string;
  shortTitle: string;
  headerIcon: string;
  technologies: Technology[];
  description: string;
  highlights: string[];
}

export const skillAreas: SkillArea[] = [
  {
    id: "jamstack",
    title: "JAMstack App Development",
    shortTitle: "JAMstack",
    headerIcon: "Layers",
    technologies: [
      { name: "Next.js", icon: "SiNextdotjs", iconLib: "si" },
      { name: "React", icon: "DiReact", iconLib: "di" },
      { name: "Node.js", icon: "DiNodejsSmall", iconLib: "di" },
      { name: "React Native", icon: "DiReact", iconLib: "di" },
    ],
    description:
      "Building modern, performant web and mobile applications using cutting-edge JavaScript frameworks and static site generation.",
    highlights: [
      "Server-side rendering & static generation",
      "Mobile-first responsive design",
      "Native mobile apps with React Native",
    ],
  },
  {
    id: "web3-cloud",
    title: "Decentralized Web & Cloud",
    shortTitle: "Web3 & Cloud",
    headerIcon: "Cloud",
    technologies: [
      { name: "AWS", icon: "DiAws", iconLib: "di" },
      { name: "GCP", icon: "SiGooglecloud", iconLib: "si" },
      { name: "Azure", icon: "SiMicrosoftazure", iconLib: "si" },
      { name: "Ethereum", icon: "SiEthereum", iconLib: "si" },
    ],
    description:
      "Developing blockchain applications and deploying scalable cloud solutions across major platforms.",
    highlights: [
      "Smart contracts & DApp development",
      "Public, hybrid, and private cloud",
      "Serverless architecture patterns",
    ],
  },
  {
    id: "distributed",
    title: "Distributed & Concurrent Systems",
    shortTitle: "Distributed",
    headerIcon: "Server",
    technologies: [
      { name: "Docker", icon: "DiDocker", iconLib: "di" },
      { name: "Kubernetes", icon: "SiKubernetes", iconLib: "si" },
      { name: "Rust", icon: "DiRust", iconLib: "di" },
      { name: "Go", icon: "SiGo", iconLib: "si" },
    ],
    description:
      "Architecting fault-tolerant distributed systems with containerization and orchestration.",
    highlights: [
      "Container orchestration at scale",
      "Bare metal & virtualized deployments",
      "High-availability architectures",
    ],
  },
  {
    id: "bigdata",
    title: "Big Data & Analytics",
    shortTitle: "Big Data",
    headerIcon: "BarChart3",
    technologies: [
      { name: "Python", icon: "DiPython", iconLib: "di" },
      { name: "R", icon: "SiR", iconLib: "si" },
      { name: "Tableau", icon: "SiTableau", iconLib: "si" },
      { name: "Spark", icon: "SiApachespark", iconLib: "si" },
    ],
    description:
      "Processing and visualizing large-scale data with modern analytics pipelines and tools.",
    highlights: [
      "Data pipelines & ETL workflows",
      "Statistical analysis & visualization",
      "Real-time data processing",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    shortTitle: "AI/ML",
    headerIcon: "BrainCircuit",
    technologies: [
      { name: "TensorFlow", icon: "SiTensorflow", iconLib: "si" },
      { name: "PyTorch", icon: "SiPytorch", iconLib: "si" },
      { name: "Python", icon: "DiPython", iconLib: "di" },
      { name: "OpenAI", icon: "SiOpenai", iconLib: "si" },
    ],
    description:
      "Developing intelligent systems using neural networks, deep learning, and modern AI frameworks.",
    highlights: [
      "CNN, RAGs, and LLM implementations",
      "ML model training & deployment",
      "IaaS ML offerings integration",
    ],
  },
  {
    id: "microservices",
    title: "Microservices Architecture",
    shortTitle: "Microservices",
    headerIcon: "Boxes",
    technologies: [
      { name: "GraphQL", icon: "SiGraphql", iconLib: "si" },
      { name: "Swagger", icon: "SiSwagger", iconLib: "si" },
      { name: "Redis", icon: "DiRedis", iconLib: "di" },
      { name: "RabbitMQ", icon: "SiRabbitmq", iconLib: "si" },
    ],
    description:
      "Designing resilient, scalable service architectures with modern API patterns.",
    highlights: [
      "GraphQL & HATEOAS API design",
      "Event-driven architectures",
      "Dockerized & resilient services",
    ],
  },
  {
    id: "automation",
    title: "Automation & Pipelines",
    shortTitle: "Automation",
    headerIcon: "GitBranch",
    technologies: [
      { name: "GitHub Actions", icon: "SiGithubactions", iconLib: "si" },
      { name: "Jenkins", icon: "SiJenkins", iconLib: "si" },
      { name: "Terraform", icon: "SiTerraform", iconLib: "si" },
      { name: "Git", icon: "DiGit", iconLib: "di" },
    ],
    description:
      "Building robust CI/CD pipelines and infrastructure automation for efficient software delivery.",
    highlights: [
      "CI/CD pipeline development",
      "Infrastructure as Code (IaC)",
      "MLOps & ETL automation",
    ],
  },
];

export const bioData = {
  name: "Eric Gitangu",
  alias: "Deveric",
  title: "Senior Software Engineer, Architecture & Security",
  company: {
    name: "Moovn Technologies",
  },
  summary:
    "Senior software engineer with 11 years in production systems across fintech, healthcare, energy access, logistics and application security. I design distributed, event-driven platforms and own them end to end: architecture, security, delivery and the teams that build them. Polyglot across TypeScript, Java, PHP, Python, Rust, Go and C#.",
  background: [
    "Full Stack + ML/AI",
    "DevOps & QA",
    "Ethical Hacker",
    "App-Sec Focus",
    "Open Source",
  ],
  passions: [
    "Tech for good",
    "Developer communities",
    "Building from scratch",
  ],
};

// Career history, server-rendered on /about so crawlers see the full text
// (the skills carousel only renders one card at a time). Source of truth:
// github.com/ericgitangu/resume-app src/data/experience.json — keep in sync.
export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export const experience: Role[] = [
  {
    company: "Moovn Technologies (Mastercard partner)",
    title: "Senior Full Stack Engineer, Architecture and Security",
    period: "Feb 2026 – present",
    location: "Nairobi · remote",
    summary:
      "Own delivery, security and architecture for a multi-surface fintech mobility platform: consumer, partner and admin web apps, a mobile API and the service backend, covering money movement, identity and regulated payments compliance.",
    highlights: [
      "Removed a critical authentication bypass and migrated stored credentials to modern hashing.",
      "Built the card top-up rail on Mastercard Payment Gateway Services hosted sessions, so card data never reaches our servers, plus M-Pesa, MTN and Tigo mobile money rails with per-country routing; mapped controls to PCI DSS SAQ-A.",
      "Designed a cross-product trust score engine with signed partner event ingestion, a tamper-evident ledger and a nightly recompute.",
      "Introduced immutable releases with automatic rollback on a failed post-deploy smoke test.",
    ],
  },
  {
    company: "ENGIE Energy Access (now Ignite Energy Access)",
    title: "Team Lead, Platform and Quality Engineering",
    period: "May 2025 – Jan 2026",
    location: "Nairobi · hybrid",
    summary:
      "Led platform and quality engineering for a pay-as-you-go solar platform serving seven African markets with millions of daily transactions.",
    highlights: [
      "Moved payments to an event-driven architecture with RabbitMQ bounded contexts for payment, token and subscription, removing peak-load timeouts across all seven markets.",
      "Built 900 critical-path Playwright and Cypress scenarios: regression fell from three days to 45 minutes and releases rose from 2 to 12 a week.",
      "Cut anomaly detection from hours to under five minutes and led the Rails 5 to 7.2 upgrade.",
      "Line-managed four engineers across Kenya, Uganda and Tanzania; two were promoted to senior.",
    ],
  },
  {
    company: "Vishnu Systems, Inc.",
    title: "Founder & Director of Engineering",
    period: "Jan 2024 – Aug 2025",
    location: "Atlanta · remote",
    summary:
      "Founded and shipped an ML security and robustness platform for software in medical devices (SiMD and SaMD).",
    highlights: [
      "FastAPI services with a Rust/PyO3 evaluation core and Go middleware, running GPU workers on AWS.",
      "CNN, RAG and graph neural network pipelines (Airflow, MLflow) to detect adversarial attacks on medical ML models.",
      "Compliance tooling mapping evaluation results to FDA, HIPAA and IEC 62304.",
    ],
  },
  {
    company: "Baw Bab Technologies, Inc.",
    title: "Project Lead Developer",
    period: "Apr 2023 – Aug 2025",
    location: "Seattle / Nairobi · remote",
    summary: "Digital addressing for last-mile delivery.",
    highlights: [
      "Led a five-engineer team and shipped the Nairobi County Government pilot serving 2.3 million residents, the second digital addressing programme in Africa, integrated with the county land registry.",
      "Built a computer-vision and GIS pipeline converting structures to Google Plus Codes.",
    ],
  },
  {
    company: "Reinsurance Group of America",
    title: "Senior Software Engineer, Full Stack (contract)",
    period: "Jan 2022 – Jul 2022",
    location: "Remote",
    summary:
      "Full stack delivery on MERN/MEAN alongside legacy Grails/Groovy, with Jest, Cucumber, Puppeteer and Cypress test suites.",
    highlights: [],
  },
  {
    company: "Wagelyft",
    title: "Lead Software Engineer (contract)",
    period: "Jan 2019 – Feb 2022",
    location: "Nairobi · remote",
    summary:
      "Fintech and e-commerce SaaS for small businesses in Kenya: Reactive Spring and Angular, MERN/MEAN, AWS, M-Pesa and multi-currency payments.",
    highlights: [
      "Mentored 15 developers, six of whom moved to mid or senior roles.",
    ],
  },
  {
    company: "Vecima Networks",
    title: "Software Engineer",
    period: "Jan 2018 – Jan 2019",
    location: "Peachtree City, GA",
    summary:
      "C and embedded assembly for petabyte-scale video streaming pipelines.",
    highlights: [],
  },
  {
    company: "Veracode",
    title: "Software Engineer",
    period: "Dec 2015 – Feb 2018",
    location: "Burlington, MA",
    summary:
      "Application security platform: Jira and Visual Studio plugins, Jenkins and GitLab CI integrations in Java/Spring, C#/.NET and Python, and the TLS 1.2 enforcement upgrade.",
    highlights: [],
  },
  {
    company: "IBM",
    title: "Software Engineer Intern",
    period: "Sep 2013 – May 2014",
    location: "Littleton, MA",
    summary: "Selenium test automation for IBM Web Experience Factory.",
    highlights: [],
  },
];

export const education = {
  school: "University of Massachusetts Lowell",
  degree: "B.S. Computer Science, minor in Mathematics",
  period: "2011 – 2015",
  // href = public record of the honor (cited source; also strengthens E-E-A-T).
  honors: [
    { label: "Microsoft Scholarship (2012–2013)" },
    {
      label: "Google UNCF Scholarship (2011–2012)",
      href: "https://students.googleblog.com/2011/08/hats-off-to-2011-google-uncf.html",
    },
    { label: "Dean's List, nine semesters" },
    { label: "Omicron Delta Kappa" },
  ] as { label: string; href?: string }[],
};
