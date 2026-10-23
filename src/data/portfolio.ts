export const profile = {
  name: "Ankush Mishra",
  role: "Senior DevOps Engineer",
  location: "Noida, India",
  email: "ankushmishra5007@gmail.com",
  phone: "+91 81305 06629",
  phoneHref: "tel:+918130506629",
  linkedin: "https://www.linkedin.com/in/mishraankush/",
  github: "",
  resume: "/Ankush-Mishra-Resume.pdf",
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
    eyebrow: "Open to senior DevOps roles",
    headline: ["I build and automate", "scalable cloud infrastructure."],
    sub: "Senior DevOps Engineer with 5.5 years across AWS and Azure. Terraform, Kubernetes on EKS Fargate, GitOps with ArgoCD and full observability, built to keep production highly available. AWS- and Azure-certified.",
    primary: { label: "Download resume", href: profile.resume },
    secondary: { label: "See my experience", href: "#experience" },
  },
  freelance: {
    eyebrow: "Available for DevOps consulting",
    headline: ["I make your releases fast,", "safe and boringly reliable."],
    sub: "CI/CD pipelines, Infrastructure as Code, Kubernetes, monitoring and AWS cost optimization from one engineer. I have cut monthly cloud spend by 20-30% and deployment time by about 40%.",
    primary: { label: "Start a project", href: "#contact" },
    secondary: { label: "See what I do", href: "#services" },
  },
};

export const stats = [
  { value: 5.5, suffix: "+", label: "Years in DevOps and cloud" },
  { value: 30, suffix: "%", label: "Max cloud spend reduction (20-30%)" },
  { value: 40, suffix: "%", label: "Faster deployments via CI/CD" },
  { value: 50, suffix: "%", label: "Higher release frequency" },
  { value: 3, suffix: "", label: "Clouds worked on: AWS, Azure, GCP" },
  { value: 4, suffix: "", label: "AWS and Azure certifications" },
];

export const about = {
  title: "DevOps engineer who owns infrastructure end to end.",
  paragraphs: [
    "I architect and automate scalable cloud infrastructure and CI/CD pipelines on AWS and Azure. My toolkit is Terraform and Helm for Infrastructure as Code, Kubernetes on AWS EKS Fargate, GitOps with ArgoCD, GitHub Actions and Jenkins, and Prometheus, Grafana and Loki for observability.",
    "I own the whole loop: provisioning, networking, security, monitoring, deployments and incident response. That includes running production infrastructure for Livia Health's Kenya operations, where uptime matters to real patients and government programmes.",
    "Everything I run is reproducible. Infrastructure lives in Terraform, packaging in Helm, delivery in ArgoCD and pipelines, and visibility in dashboards and alerts, so production stays available and changes stay boring.",
  ],
  facts: [
    { label: "Based in", value: "Noida, India" },
    { label: "Experience", value: "5.5 years" },
    { label: "Currently", value: "Teamarcs · Livia Health" },
    { label: "Education", value: "MCA, Kurukshetra Univ." },
  ],
};

export const offerings: Record<
  Audience,
  { heading: string; intro: string; items: { title: string; text: string; icon: string }[] }
> = {
  company: {
    heading: "What I bring to your team",
    intro: "Hands-on ownership of cloud infrastructure and delivery, with the habits that keep production calm.",
    items: [
      {
        icon: "layers",
        title: "Infrastructure as Code",
        text: "Reusable Terraform modules for VPCs, subnets, security groups, EC2 and load balancers, giving consistent dev and production environments.",
      },
      {
        icon: "container",
        title: "Kubernetes and GitOps",
        text: "Serverless containers on AWS EKS Fargate, production-grade Helm charts and ArgoCD-driven deployments.",
      },
      {
        icon: "workflow",
        title: "CI/CD automation",
        text: "Jenkins and GitHub Actions pipelines that cut deployment time by about 40% and raise release frequency.",
      },
      {
        icon: "activity",
        title: "Observability and incident response",
        text: "Prometheus, Grafana and Loki stacks for proactive alerting, plus ownership of production incident resolution.",
      },
      {
        icon: "gauge",
        title: "Cost and performance optimization",
        text: "Right-sizing, spot and reserved instances and idle-resource cleanup that reduced monthly cloud spend by 20-30%.",
      },
      {
        icon: "shield-check",
        title: "Security and reliability",
        text: "Cloud security, vulnerability remediation, SIEM log integrations and backup strategies for regulated healthcare workloads.",
      },
    ],
  },
  freelance: {
    heading: "How I can help your project",
    intro: "From a first pipeline to a full cloud platform, I can set things up end to end or step in where you need depth.",
    items: [
      {
        icon: "workflow",
        title: "CI/CD pipelines",
        text: "Automated build, test, scan and deploy with Jenkins or GitHub Actions, including SonarQube, OWASP and Trivy checks.",
      },
      {
        icon: "cloud",
        title: "AWS and Azure setup",
        text: "Production-ready cloud environments with networking, load balancing, auto scaling, IAM and backups.",
      },
      {
        icon: "layers",
        title: "Terraform and Ansible",
        text: "Your infrastructure as reviewable, repeatable code instead of console clicks.",
      },
      {
        icon: "container",
        title: "Docker and Kubernetes",
        text: "Containerize your apps and run them on EKS, with Helm charts and GitOps deployments via ArgoCD.",
      },
      {
        icon: "activity",
        title: "Monitoring and logging",
        text: "Prometheus, Grafana, Loki and ELK dashboards and alerts so problems surface before users notice.",
      },
      {
        icon: "gauge",
        title: "Cloud cost audits",
        text: "Find idle and oversized resources and move to spot and reserved capacity without hurting reliability.",
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
    slug: "livia-pomsf",
    title: "Livia Health Kenya: POMSF and healthcare platforms",
    kind: "Production AWS infrastructure for Kenya Government",
    featured: true,
    summary:
      "Primary DevOps Engineer for the end-to-end cloud infrastructure behind Livia Health's Kenya operations, including POMSF, the Livia benefit management system, and other healthcare platforms serving the Kenya Government.",
    highlights: [
      "Own production deployments, infrastructure monitoring, incident resolution and operational stability across the Kenya platforms.",
      "Administer and optimize AWS: EKS, EC2, VPC, Load Balancers, Auto Scaling, EBS, S3, CloudWatch, Lambda, IAM, SES and Route 53.",
      "Troubleshoot infrastructure, networking, performance and availability issues to keep production available, scalable and reliable.",
      "Handle AWS and DevOps operations across Teamarcs projects: cloud security, monitoring, cost and performance optimization, vulnerability remediation, log and SIEM integrations, and backup strategies.",
      "Resolve critical production issues as the primary point of ownership.",
    ],
    stack: ["AWS", "EKS", "EC2", "VPC", "Load Balancers", "Auto Scaling", "S3", "CloudWatch", "Lambda", "IAM", "SES", "Route 53"],
  },
  {
    slug: "gitops-cicd",
    title: "GitOps CI/CD with GitHub Actions and ArgoCD",
    kind: "Kubernetes delivery pipeline",
    summary:
      "A GitOps workflow that automates testing, building and pushing Docker images to AWS ECR through GitHub Actions, then deploys Helm charts to AWS EKS using ArgoCD.",
    highlights: [
      "GitHub Actions runs tests, builds Docker images and pushes them to AWS ECR.",
      "ArgoCD syncs Helm chart releases to AWS EKS straight from Git.",
      "Git becomes the single source of truth for what runs in the cluster.",
    ],
    stack: ["GitHub Actions", "ArgoCD", "Helm", "Docker", "AWS ECR", "AWS EKS"],
  },
  {
    slug: "jenkins-pipeline",
    title: "Automated CI/CD Pipeline for Web Apps",
    kind: "Python/Django, Node.js and React",
    summary:
      "A Jenkins pipeline triggered by GitHub webhooks, with security scanning built in and ArgoCD GitOps deployment.",
    highlights: [
      "Boosted deployment velocity by 40% and release frequency by 50%.",
      "Integrated SonarQube, OWASP and Trivy scanning into every build.",
      "ArgoCD GitOps deployment delivered a 35% improvement in security and speed.",
    ],
    stack: ["Jenkins", "SonarQube", "OWASP", "Trivy", "ArgoCD", "Docker"],
    metric: { value: "40%", label: "faster deployments" },
  },
  {
    slug: "terraform-aws",
    title: "AWS Infrastructure Provisioning with Terraform",
    kind: "Infrastructure as Code",
    summary:
      "An end-to-end AWS stack defined as code, built from reusable Terraform modules for networking, compute and load balancing.",
    highlights: [
      "Reusable modules for VPC, subnets, security groups, EC2 and load balancers.",
      "Repeatable environments for dev and production from the same code.",
      "30% improvement in deployment efficiency.",
    ],
    stack: ["Terraform", "AWS", "VPC", "EC2", "Load Balancers"],
    metric: { value: "30%", label: "better deployment efficiency" },
  },
];

export const featuredStats: [string, string][] = [
  ["12", "AWS services administered"],
  ["Prod", "deployments, monitoring and incidents owned"],
  ["SIEM", "log integrations for security visibility"],
  ["Backups", "strategies designed and maintained"],
];

export const engineering = [
  {
    icon: "git-branch",
    title: "GitOps delivery with ArgoCD",
    text: "Helm charts and ArgoCD keep clusters in sync with Git, so every release is reviewable and every rollback is a revert.",
    cmd: "argocd app sync web-app --prune",
    out: [
      "GitHub Actions builds and pushes the image to AWS ECR",
      "Helm chart values updated in Git",
      "ArgoCD detects the change and syncs it to AWS EKS",
      "cluster state matches Git",
    ],
  },
  {
    icon: "layers",
    title: "Terraform-provisioned AWS",
    text: "Reusable modules for networking, compute and load balancing give consistent environments and a 30% deployment-efficiency gain.",
    cmd: "terraform apply -var-file=prod.tfvars",
    out: [
      "loading reusable modules: VPC, subnets, security groups",
      "planning EC2 and load balancer changes",
      "applying the same code to dev and production",
      "environments provisioned consistently",
    ],
  },
  {
    icon: "cloud",
    title: "Serverless containers on EKS Fargate",
    text: "Scalable workloads on AWS EKS Fargate that optimize resource allocation and cut operational overhead.",
    cmd: "kubectl get pods -n production",
    out: [
      "scheduling pods onto EKS Fargate, no nodes to manage",
      "right-sizing resource requests per workload",
      "routing traffic through Traefik ingress and Cloudflare DNS",
      "workloads running with less operational overhead",
    ],
  },
  {
    icon: "activity",
    title: "Observability stack",
    text: "Prometheus, Grafana and Loki on Kubernetes, including Azure Kubernetes workloads, for proactive monitoring and alerting.",
    cmd: "helm upgrade --install monitoring ./charts/observability",
    out: [
      "Prometheus scraping cluster and application metrics",
      "Loki collecting logs alongside Grafana dashboards",
      "alert rules wired to on-call channels",
      "issues surface before users notice",
    ],
  },
  {
    icon: "shield-check",
    title: "Secure pipelines",
    text: "SonarQube, OWASP and Trivy scanning inside Jenkins, with ArgoCD GitOps deployment for a 35% security and speed improvement.",
    cmd: "jenkins build web-app --scan=sonarqube,owasp,trivy",
    out: [
      "webhook triggers the Jenkins pipeline",
      "SonarQube analyses code quality",
      "OWASP checks dependencies, Trivy scans images",
      "only clean builds are deployed through ArgoCD",
    ],
  },
  {
    icon: "gauge",
    title: "AWS cost optimization",
    text: "Right-sizing, spot and reserved capacity and idle-resource cleanup reduced monthly cloud spend by 20-30%.",
    cmd: "aws ce get-cost-and-usage --granularity MONTHLY",
    out: [
      "right-sizing compute to real usage",
      "moving suitable workloads to spot and reserved instances",
      "eliminating idle resources",
      "monthly cloud spend down 20-30%",
    ],
  },
];

export const skills = [
  { group: "Cloud", items: ["AWS", "Azure", "GCP"] },
  { group: "AWS Services", items: ["AWS EKS", "AWS EC2", "VPC", "Load Balancers", "Auto Scaling", "AWS EBS", "AWS S3", "CloudWatch", "AWS Lambda", "IAM", "AWS SES", "Route 53"] },
  { group: "IaC and Config", items: ["Terraform", "Helm", "Ansible"] },
  { group: "Containers", items: ["Kubernetes", "AWS EKS Fargate", "Docker"] },
  { group: "CI/CD and GitOps", items: ["Jenkins", "GitHub Actions", "ArgoCD", "Git", "SonarQube", "Trivy", "OWASP"] },
  { group: "Observability", items: ["Prometheus", "Grafana", "Loki", "ELK Stack", "CloudWatch"] },
  { group: "Languages and Data", items: ["Python", "Bash", "SQL", "Redis", "Memcached"] },
  { group: "Networking", items: ["Traefik", "Cloudflare DNS", "VPC", "Load Balancers"] },
  { group: "Security and Ops", items: ["Cloud Security", "Vulnerability Remediation", "SIEM Integrations", "Backup Strategies", "Incident Response", "Cost Optimization"] },
];

export const experience = [
  {
    role: "Primary DevOps Engineer, Livia Health Kenya",
    company: "Teamarcs Technologies",
    period: "Present",
    location: "Kenya operations",
    current: true,
    summary:
      "Lead DevOps owner for the cloud infrastructure behind Livia Health's Kenya operations, including POMSF and other healthcare platforms serving the Kenya Government.",
    points: [
      "Manage and maintain end-to-end cloud infrastructure, ensuring availability, scalability, performance and reliability of production environments.",
      "Support POMSF (Livia POMSF benefit management system) with production deployments, infrastructure monitoring, incident resolution and operational stability.",
      "Administer and optimize AWS: EKS, EC2, VPC, Load Balancers, Auto Scaling, EBS, S3, CloudWatch, Lambda, IAM, SES and Route 53.",
      "Troubleshoot infrastructure, networking, performance and availability issues.",
      "Own AWS and DevOps operations across Teamarcs projects: cloud security, monitoring, cost and performance optimization, vulnerability remediation, log and SIEM integrations, backup strategies and critical production issues.",
    ],
  },
  {
    role: "Senior DevOps Engineer",
    company: "Astro Arun Pandit Pvt. Ltd.",
    period: "Dec 2025 - Present",
    location: "Noida, India",
    current: false,
    summary: "End-to-end DevOps ownership for the Horocosmo application on AWS.",
    points: [
      "Lead end-to-end DevOps operations independently for the Horocosmo application on AWS, owning compute, networking, security, monitoring and cost optimization.",
      "Designed and maintained CI/CD pipelines for smooth, reliable, fully automated deployments and faster release cycles.",
      "Implemented AWS cost optimization (right-sizing, spot and reserved instances, idle-resource cleanup), reducing monthly cloud spend by 20-30%.",
      "Streamlined CI/CD deployment workflows, cutting deployment time by about 40% and increasing release frequency.",
      "Drove an initiative to internalize DevOps processes and infrastructure control, reducing dependency on external vendors.",
      "Partnered with development teams to ensure high availability, scalability and performance of production systems.",
    ],
  },
  {
    role: "DevOps Engineer",
    company: "Talentelgia Pvt. Ltd.",
    period: "Oct 2025 - Dec 2025",
    location: "Mohali, India",
    summary: "End-to-end DevOps across dev and production, including on-premises infrastructure.",
    points: [
      "Managed end-to-end DevOps activities including CI/CD pipeline setup, deployment automation and environment configuration across dev and production.",
      "Handled on-premises infrastructure deployments, keeping internally hosted applications highly available.",
      "Implemented monitoring and logging for better visibility and faster issue resolution.",
      "Managed access controls, server maintenance and patching for security and compliance.",
    ],
  },
  {
    role: "DevOps Engineer",
    company: "HCL Technologies",
    period: "Dec 2021 - Sep 2025",
    location: "Noida, India",
    summary: "Kubernetes, Terraform, GitOps and observability on AWS and Azure.",
    points: [
      "Engineered scalable, serverless container architectures on AWS EKS Fargate, optimizing resource allocation and reducing operational overhead.",
      "Provisioned full production and dev infrastructure on AWS using Terraform for environment consistency and compliance.",
      "Designed and maintained production-grade Helm charts following best practices.",
      "Implemented GitOps workflows integrating ArgoCD and Helm to automate CI/CD and improve deployment reliability.",
      "Developed multiple Jenkins pipelines (Jenkinsfiles) and Bash scripts to automate routine tasks and boost developer productivity.",
      "Configured Kubernetes networking with Traefik Ingress and Cloudflare DNS routing.",
      "Deployed observability stacks (Prometheus, Grafana, Loki) for proactive monitoring and alerting, including Azure Kubernetes workloads.",
    ],
  },
  {
    role: "Software Engineer",
    company: "HCL Technologies",
    period: "Nov 2020 - Nov 2021",
    location: "Noida, India",
    summary: "Application support and validation for Stanley Black & Decker (SBD).",
    points: [
      "Managed user operations on JDA WMS, RedPrairie and JDA Demand and Supply systems for Stanley Black & Decker.",
      "Supported COTS applications and ensured SOX compliance through detailed test case creation and validation.",
      "Performed back-end database testing with complex SQL queries to validate data integrity across multiple tables.",
    ],
  },
];

export const achievements = [
  { value: "20-30%", text: "lower monthly cloud spend through right-sizing, spot and reserved instances and idle-resource cleanup" },
  { value: "~40%", text: "faster deployments from streamlined, automated CI/CD workflows" },
  { value: "50%", text: "higher release frequency with webhook-triggered Jenkins pipelines" },
  { value: "SBD", text: "client Appreciation Certificate from Stanley Black & Decker for outstanding contribution" },
];

export const education = [
  { title: "Master of Computer Applications (MCA)", place: "Kurukshetra University, Haryana", date: "2025 - 2027" },
  { title: "Bachelor of Computer Applications (BCA), CGPA 8.55 / 10", place: "SASTRA University, Tamil Nadu", date: "2021 - 2024" },
];

export const certifications = [
  "AWS Certified Solutions Architect - Associate",
  "AWS Certified SysOps Administrator - Associate",
  "AWS Certified Cloud Practitioner",
  "Microsoft Certified: Azure Fundamentals",
];

export const practices = [
  "Infrastructure as Code",
  "GitOps delivery",
  "Observability first",
  "Cost and performance tuning",
  "Security and compliance",
  "Incident response",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
