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
  title: "Director of Engineering",
  company: {
    name: "Vishnu Systems, Inc.",
    url: "https://vishnusystems.life",
  },
  summary:
    "Software Engineer Architect with 10+ years experience in Full Stack development, ML/AI engineering, and strong foundations in architectures, OOP, functional languages, systems design, and low-level computing (C/C++). Passionate about tech for good, demystifying the elusive world of tech, and ethical software practices.",
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
