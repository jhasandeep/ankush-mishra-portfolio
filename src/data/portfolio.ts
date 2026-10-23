export const profile = {
  name: "Sandeep Kumar Jha",
  role: "Senior Full Stack Developer",
  location: "Delhi, India",
  email: "skjsan11@gmail.com",
  phone: "+91 99101 12863",
  phoneHref: "tel:+919910112863",
  linkedin: "https://linkedin.com/in/sandeep-kumar-jha-fullstackdeveloper",
  github: "https://github.com/jhasandeep",
  resume: "/Sandeep-Kumar-Jha-Resume.pdf",
};

export type Audience = "company" | "freelance";

export const heroCopy: Record<
  Audience,
  {
    eyebrow: string;
    headline: [string, string];
    sub: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  }
> = {
  company: {
    eyebrow: "Open to full-time roles",
    headline: ["I build and modernize", "enterprise-grade platforms."],
    sub: "Senior Full Stack Developer with 4+ years across React, Next.js, NestJS and MySQL. Currently a core developer on a multi-portal healthcare platform: 7 microservices, 3 mobile apps, 48 modules migrated off a legacy PHP monolith.",
    primary: { label: "Download resume", href: profile.resume },
    secondary: { label: "See my experience", href: "#experience" },
  },
  freelance: {
    eyebrow: "Available for freelance projects",
    headline: ["I turn product ideas into", "fast, reliable web & mobile apps."],
    sub: "One developer for the whole stack: frontend, APIs, mobile, payments, deployment and testing. 15+ projects delivered for brands like Wow Momo, Baskin Robbins and Taco Bell.",
    primary: { label: "Start a project", href: "#contact" },
    secondary: { label: "Browse my work", href: "#projects" },
  },
};

export const stats = [
  { value: 4, suffix: "+", label: "Years building production software" },
  { value: 48, suffix: "", label: "Modules migrated from legacy PHP" },
  { value: 7, suffix: "", label: "NestJS microservices in production" },
  { value: 57, suffix: "", label: "Playwright E2E flows automated" },
  { value: 20, suffix: "+", label: "User types under RBAC / ACL" },
  { value: 15, suffix: "+", label: "Projects delivered for clients" },
];

export const about = {
  title: "Product-minded engineer who owns the full stack.",
  paragraphs: [
    "I build and modernize scalable web and mobile applications with React, Next.js, Node.js, NestJS, TypeScript, MySQL and MongoDB. My work spans enterprise healthcare, event management, e-commerce and operations platforms.",
    "I'm comfortable on every layer: component architecture and data tables on the front, authenticated and validated APIs on the back, React Native on mobile, and Docker, Jenkins and Kubernetes underneath. I also build the safety net: E2E suites, API parity checks and RBAC verification.",
    "I use Cursor and Claude daily for codebase analysis, migrations, debugging, refactors, tests and documentation, so I can move through large legacy codebases faster without lowering the bar.",
  ],
  facts: [
    { label: "Based in", value: "Delhi, India" },
    { label: "Experience", value: "4+ years" },
    { label: "Currently", value: "TeamArcs Technologies" },
    { label: "Education", value: "B.Tech, GGSIPU Delhi" },
  ],
};

export const offerings: Record<
  Audience,
  { heading: string; intro: string; items: { title: string; text: string; icon: string }[] }
> = {
  company: {
    heading: "What I bring to your team",
    intro: "Senior-level ownership across the stack, plus the quality and delivery habits that keep large codebases healthy.",
    items: [
      {
        icon: "layers",
        title: "Legacy modernization",
        text: "Migrated 48 modules from a PHP monolith to Next.js 15 and NestJS while preserving API contracts, schemas and business rules.",
      },
      {
        icon: "blocks",
        title: "Scalable frontend architecture",
        text: "Reusable data-table patterns, server-side search, filtering, sorting and pagination, built on Redux Toolkit, Tailwind, MUI and Radix.",
      },
      {
        icon: "server",
        title: "Backend and microservices",
        text: "NestJS Controller, Service, Repository and DTO layering with validation, centralized exceptions, Winston logging and Swagger docs.",
      },
      {
        icon: "shield",
        title: "Security and access control",
        text: "JWT, Passport.js, RBAC and ACL across 20+ user types, with parameterized SQL and optimized joins.",
      },
      {
        icon: "flask",
        title: "Quality engineering",
        text: "57-flow Playwright suite, legacy-vs-new API parity testing and RBAC permission-matrix tooling with reviewable reports.",
      },
      {
        icon: "users",
        title: "Mentoring and documentation",
        text: "Led and mentored 4 developers; produced 150+ technical documents covering APIs, migrations and architecture.",
      },
    ],
  },
  freelance: {
    heading: "How I can help your project",
    intro: "From first prototype to production deployment, I can take a product end to end or step in where you need depth.",
    items: [
      {
        icon: "globe",
        title: "Web apps and dashboards",
        text: "Responsive React and Next.js apps, admin panels and portals with clean UX and strong performance.",
      },
      {
        icon: "server",
        title: "APIs and backends",
        text: "REST and GraphQL services on Node.js, NestJS, Express or Django, with auth, rate limiting and third-party integrations.",
      },
      {
        icon: "smartphone",
        title: "Mobile apps",
        text: "React Native apps with API integration, push notifications and offline storage.",
      },
      {
        icon: "credit-card",
        title: "Payments and integrations",
        text: "M-Pesa, Flutterwave, PayU, Zoho Books, Firebase, Google Maps, S3 uploads and insurance or invoicing APIs.",
      },
      {
        icon: "cloud",
        title: "Deployment and DevOps",
        text: "AWS EC2, Docker, Jenkins CI/CD, Nginx, automated SSL, backups and monitoring on VPS or cloud.",
      },
      {
        icon: "flask",
        title: "Testing and modernization",
        text: "E2E automation with Playwright and safe migrations of legacy systems to a modern stack.",
      },
    ],
  },
};

export type Shot = { label: string; url: string; image: string };

export type Project = {
  slug: string;
  title: string;
  kind: string;
  featured?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
  metric?: { value: string; label: string };
  url?: string;
  image?: string;
  // Multiple live sites under one project (e.g. several client brands).
  gallery?: Shot[];
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "livia",
    title: "Livia Healthcare Platform (HMIS)",
    kind: "Enterprise healthcare ecosystem",
    featured: true,
    url: "https://newadmin.liviaapp.net/",
    image: "/projects/livia.jpg",
    summary:
      "A multi-portal healthcare platform: admin, doctor and patient web portals plus three React Native apps for patients, doctors and pharmacies, backed by 7 NestJS microservices and MySQL.",
    highlights: [
      "Migrated 48 modules from a legacy PHP monolith to Next.js 15, React 19 and NestJS without changing API contracts or business rules.",
      "50+ admin modules: orders, insurance claims, pre-authorization, pharmacy, prescriptions, drug formulary, subscriptions, payments, RBAC, CMS, eTIMS and analytics.",
      "Doctor portal with scheduling, calendar workflows, TinyMCE clinical notes and Amazon Chime SDK telemedicine.",
      "Scheduler service with 25 jobs and distributed locking for claims, OAuth refresh, payment reconciliation and eTIMS invoicing.",
      "Integrations: M-Pesa, Flutterwave, insurance payer APIs, KRA eTIMS, S3 presigned URLs, Firebase and Google Maps.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "NestJS",
      "TypeORM",
      "MySQL",
      "React Native",
      "Amazon Chime SDK",
      "AWS S3",
      "Playwright",
      "Jenkins",
      "Docker",
      "Kubernetes",
      "Helm",
    ],
    metric: { value: "48", label: "modules migrated" },
    note: "Admin portal is login-protected; the screenshot shows the public sign-in screen.",
  },
  {
    slug: "event-management",
    title: "360 Solutions Event CRM",
    kind: "Enterprise event management platform",
    url: "https://admin.360.ebslonserver3.com/",
    image: "/projects/ebslon360.jpg",
    summary:
      "A CRM that brings sales, operations, finance and HR together to plan, manage and deliver events, from first enquiry to final invoice.",
    highlights: [
      "Lead and enquiry management, venue and hotel sourcing, and event operations.",
      "Billing workflows with Zoho Books API integration.",
      "Automated cron jobs, reports and dashboards, and advanced admin controls.",
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "Zoho Books API", "Cron jobs"],
  },
  {
    slug: "cold-storage",
    title: "Bombay Ammonia Design ERP",
    kind: "Industrial refrigeration & HVAC design tool",
    url: "https://bombayammonia.ebslonserver3.com/",
    image: "/projects/bombay.jpg",
    summary:
      "A design and sizing console for industrial refrigeration and HVAC projects: heat load, equipment selection, and vessel and piping, all worked out on one sheet.",
    highlights: [
      "Heat-load calculations with equipment recommendations.",
      "Vessel and piping sizing for cold-storage projects.",
      "Real-time configuration and administration workflows.",
    ],
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    slug: "gajanan",
    title: "Gajanan Parcel Services",
    kind: "Logistics platform",
    url: "https://www.gajananparcelservices.com/",
    image: "/projects/gajanan.jpg",
    summary:
      "Company website, admin panel and backend that digitized parcel operations, from booking to real-time shipment tracking.",
    highlights: [
      "REST APIs for parcel creation, tracking and status management.",
      "React admin UI tuned with code splitting and lazy loading.",
      "MongoDB schemas and indexes for high-volume retrieval; VPS deployment with SSL, backups and monitoring.",
    ],
    stack: ["React", "Django", "DRF", "Node.js", "Express", "MongoDB"],
  },
  {
    slug: "tilak",
    title: "Tilak Stone Arts",
    kind: "Luxury brand website",
    url: "https://www.tilakstonearts.com/",
    image: "/projects/tilak.jpg",
    summary:
      "Website for a bespoke marble temple and pooja room design studio, showcasing projects, creations and a step-by-step client journey.",
    highlights: [
      "Project portfolio, creations and services catalogue.",
      "How-it-works journey, store locations, blog, testimonials and careers pages.",
      "Video-led hero and rich imagery for a premium brand feel.",
    ],
    stack: ["Next.js", "React", "Material UI"],
  },
  {
    slug: "marriage-registration",
    title: "Marriage Registration Wala",
    kind: "Registration platform",
    url: "https://marriageregistrationwala.com/",
    summary:
      "An end-to-end registration platform with applicant flows, admin workflows, online payment and cached API data for a smooth experience.",
    highlights: [
      "Admin workflows for reviewing and managing registrations.",
      "PayU payment integration for fees.",
      "NextAuth authentication and React Query API caching.",
    ],
    stack: ["Next.js", "NextAuth", "React Query", "PayU"],
  },
  {
    slug: "food-ordering",
    title: "Food-Ordering Platforms for QSR Brands",
    kind: "E-commerce · Badho Technologies / OnoSuite",
    gallery: [
      { label: "Wow! Momo", url: "https://www.wowmomo.com/", image: "/projects/wowmomo.jpg" },
      { label: "Baskin Robbins", url: "https://baskinrobbinsindia.com/", image: "/projects/baskin.jpg" },
      { label: "The Belgian Waffle Co.", url: "https://thebelgianwaffle.co/", image: "/projects/waffle.jpg" },
    ],
    summary:
      "Ordering platforms for enterprise food brands including Wow! Momo, Baskin Robbins and The Belgian Waffle Co.",
    highlights: [
      "Next.js apps on GraphQL and Hasura with third-party API integrations.",
      "REST and GraphQL APIs with rate limiting and authentication.",
      "Approximately 12-20% reduction in processing time.",
    ],
    stack: ["Next.js", "GraphQL", "Hasura", "TypeScript"],
    metric: { value: "12-20%", label: "faster processing" },
  },
];

export const engineering = [
  {
    icon: "flask",
    title: "57-flow Playwright E2E suite",
    text: "Page-object architecture, reusable authentication setup and regression coverage across the major healthcare modules.",
    cmd: "npx playwright test --project=regression",
    out: [
      "loading 57 end-to-end flows (page-object model)",
      "reusing authenticated storage state across roles",
      "covering orders, claims, pharmacy, prescriptions, RBAC",
      "regression suite ready for every release",
    ],
  },
  {
    icon: "git-compare",
    title: "Legacy-vs-new API parity framework",
    text: "Automated comparison of API responses across environments to prove migration consistency before cut-over.",
    cmd: "npm run parity -- --legacy=php --next=nestjs",
    out: [
      "calling legacy and new endpoints with identical payloads",
      "diffing status codes, schemas and values",
      "flagging mismatches per module for review",
      "migration consistency validated before cut-over",
    ],
  },
  {
    icon: "shield-check",
    title: "RBAC and ACL verification tooling",
    text: "Multi-role JWT generation, a permission-matrix validator and guest-access tests, with reviewable Excel reports.",
    cmd: "npm run rbac:verify",
    out: [
      "minting JWTs for 20+ user types",
      "checking every route against the permission matrix",
      "probing guest and cross-role access",
      "exporting a reviewable Excel report",
    ],
  },
  {
    icon: "clock",
    title: "Timezone and date-parity fixes",
    text: "Diagnosed platform-wide Africa/Nairobi vs UTC issues across frontends, backend APIs, receipts and mobile clients.",
    cmd: "trace-dates --tz=Africa/Nairobi --compare=UTC",
    out: [
      "auditing date handling in web, API, receipts and mobile",
      "normalising storage to UTC",
      "rendering in Africa/Nairobi at the edges",
      "dates now match across every client",
    ],
  },
  {
    icon: "file-spreadsheet",
    title: "Large-dataset exports",
    text: "Excel and CSV exports with ExcelJS and XLSX, optimized for large insurance datasets.",
    cmd: "export claims --format=xlsx,csv",
    out: [
      "streaming rows with ExcelJS instead of buffering",
      "chunking large insurance datasets",
      "generating XLSX and CSV from the same pipeline",
    ],
  },
  {
    icon: "book-open",
    title: "150+ technical documents",
    text: "API docs, migration blueprints, architecture notes and stakeholder guides, plus QA cases for 40+ modules.",
    cmd: "ls docs/ | wc -l",
    out: [
      "150+ documents: API, migration, architecture, guides",
      "QA test cases written for 40+ modules",
    ],
  },
];

export const skills = [
  { group: "Frontend", items: ["React.js", "Next.js 15", "React 19", "Redux Toolkit", "Tailwind CSS", "Material UI", "Radix UI", "React Hook Form", "TanStack Query"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express.js", "Django", "Django REST Framework", "REST APIs", "GraphQL", "Hasura", "TypeORM", "Microservices"] },
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"] },
  { group: "Databases", items: ["MySQL", "MongoDB", "Query Optimization", "Indexing", "Schema Design"] },
  { group: "Mobile", items: ["React Native", "API Integration", "Push Notifications", "Offline Storage"] },
  { group: "Auth and Security", items: ["JWT", "Passport.js", "RBAC", "ACL", "DTO Validation"] },
  { group: "Cloud and DevOps", items: ["AWS EC2", "AWS S3", "Docker", "Jenkins", "Kubernetes", "Helm", "Nginx", "CI/CD", "Linux", "SSL Automation"] },
  { group: "Testing", items: ["Playwright", "E2E Testing", "API Testing", "Regression Testing", "API Parity Testing", "RBAC Testing", "Postman"] },
  { group: "Integrations", items: ["Amazon Chime SDK", "M-Pesa", "Flutterwave", "PayU", "Firebase", "Google Maps", "eTIMS", "Insurance APIs"] },
  { group: "AI-assisted dev", items: ["Cursor", "Claude AI", "Codebase Analysis", "Refactoring", "Test Generation", "Documentation"] },
];

export const experience = [
  {
    role: "Senior Full Stack Developer",
    company: "TeamArcs Technologies India",
    period: "Oct 2025 - Present",
    location: "Delhi, India",
    current: true,
    summary:
      "Core developer on the Livia Healthcare Platform (HMIS), delivering frontend, backend, mobile, QA automation and DevOps work.",
    points: [
      "Contributed to migrating 48 modules from a legacy PHP monolith to Next.js 15, React 19 and NestJS.",
      "Built and maintained 50+ admin modules plus the doctor and patient web portals.",
      "Developed NestJS services with ValidationPipe, centralized exception handling, Winston logging and Swagger.",
      "Implemented JWT, Passport.js, RBAC and ACL across 20+ user types.",
      "Built a scheduler service with 25 jobs and distributed locking.",
      "Created a 57-flow Playwright suite, an API parity framework and RBAC verification tooling.",
      "Maintained Jenkins pipelines, Docker, Kubernetes/Helm deployments and Nginx.",
    ],
  },
  {
    role: "Full Stack Developer & DevOps Engineer",
    company: "Ebslon Infotech",
    period: "Dec 2024 - Oct 2025",
    location: "Delhi, India",
    summary: "Full stack delivery plus ownership of cloud infrastructure and CI/CD.",
    points: [
      "Built scalable React, Next.js, Node.js and TypeScript apps, improving performance by approximately 25%.",
      "Designed Jenkins CI/CD pipelines, cutting deployment time by approximately 50%.",
      "Managed AWS EC2, load balancers and auto-scaling for approximately 99.9% uptime.",
      "Automated Let's Encrypt SSL issuance and streamlined DNS and deployment workflows.",
      "Mentored junior developers and promoted coding standards and code review practices.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Badho Technologies / OnoSuite",
    period: "Feb 2024 - Sep 2024",
    location: "Delhi, India",
    summary: "Food-ordering platforms for enterprise brands.",
    points: [
      "Built Next.js apps with GraphQL, Hasura and TypeScript.",
      "Delivered REST and GraphQL APIs with rate limiting, authentication and integrations.",
      "Improved platforms for Wow Momo and Baskin Robbins, cutting processing time by approximately 12-20%.",
      "Managed VPS hosting, automated backups and deployments.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Gajanan Parcel Services",
    period: "Jan 2022 - Feb 2024",
    location: "Delhi, India",
    summary: "Digitized parcel operations end to end.",
    points: [
      "Built the website, admin panel and backend with React, Django, DRF, Node.js and Express.",
      "Created REST APIs for parcel creation, shipment tracking and status management.",
      "Designed MongoDB schemas and indexes for high-volume retrieval.",
      "Deployed on VPS with SSL automation, monitoring, backups and high-availability setups.",
    ],
  },
];

export const achievements = [
  { value: "15+", text: "projects delivered for enterprise clients including Wow Momo, Baskin Robbins and Taco Bell" },
  { value: "~50%", text: "faster deployments through CI/CD automation, with approximately 99.9% uptime" },
  { value: "~30%", text: "API performance improvement through query optimization and caching" },
  { value: "4", text: "developers led and mentored while keeping delivery and standards consistent" },
];

export const education = [
  { title: "Bachelor of Technology", place: "Guru Gobind Singh Indraprastha University, Delhi", date: "May 2019" },
  { title: "Industry Ready Certification in Full Stack Development", place: "NxtWave Disruptive Technologies, Delhi", date: "May 2022" },
];

export const certifications = [
  "AWS Solutions Architect Associate (in progress)",
  "Jenkins Certified Engineer",
  "MongoDB Certified Developer",
  "Full Stack Development Certification, NxtWave Technologies",
];

export const aiWorkflow = [
  "Large-codebase and legacy migration analysis",
  "Implementation and refactoring",
  "Debugging and root-cause analysis",
  "Test generation",
  "Technical documentation",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
