// All static data for the home page lives here — import from components as needed

export const FEATURES = [
  {
    icon: "brain",
    title: "AI Content Extraction",
    description:
      "Our LLM intelligently parses your resume, understanding context, skills, and achievements to craft compelling portfolio content.",
    color: "#3b82f6",
    colorRgb: "59,130,246",
  },
  {
    icon: "palette",
    title: "Beautiful Themes",
    description:
      "Choose from dozens of handcrafted, modern portfolio themes — from minimal to bold. Each template is pixel-perfect and responsive.",
    color: "#8b5cf6",
    colorRgb: "139,92,246",
  },
  {
    icon: "globe",
    title: "Instant Deploy",
    description:
      "Your portfolio goes live in seconds with a shareable link. One-click export to Vercel, Netlify or download as a static site.",
    color: "#06b6d4",
    colorRgb: "6,182,212",
  },
  {
    icon: "zap",
    title: "Lightning Fast",
    description:
      "Built on modern Next.js architecture, your portfolio scores 100/100 on Lighthouse. Speed impresses both visitors and recruiters.",
    color: "#10b981",
    colorRgb: "16,185,129",
  },
  {
    icon: "share",
    title: "Easy Sharing",
    description:
      "Share across LinkedIn, Twitter, or email with a clean, branded URL. Track visits and engagement through your dashboard.",
    color: "#ec4899",
    colorRgb: "236,72,153",
  },
  {
    icon: "sparkles",
    title: "Smart Customization",
    description:
      "Fine-tune every section with our drag-and-drop editor. Add projects, testimonials, and custom sections — no coding required.",
    color: "#f59e0b",
    colorRgb: "245,158,11",
  },
] as const;

export const STEPS = [
  {
    num: "01",
    title: "Upload Resume",
    desc: "Drop your PDF or DOCX resume. We support all formats from any era.",
  },
  {
    num: "02",
    title: "AI Processes",
    desc: "Our AI reads, understands, and structures your experience into the perfect portfolio.",
  },
  {
    num: "03",
    title: "Pick a Theme",
    desc: "Choose from our curated collection of professional portfolio designs.",
  },
  {
    num: "04",
    title: "Go Live",
    desc: "Publish your portfolio with one click and share the link with the world.",
  },
] as const;

export const STATS = [
  { value: "10K+", label: "Portfolios Created", color: "#3b82f6" },
  { value: "98%", label: "Satisfaction Rate", color: "#8b5cf6" },
  { value: "< 30s", label: "Generation Time", color: "#06b6d4" },
  { value: "50+", label: "Portfolio Themes", color: "#10b981" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Senior Engineer @ Google",
    content:
      "I uploaded my resume and had a stunning portfolio live in under a minute. Got 3 interview calls that week.",
    avatar: "PS",
    color: "#3b82f6",
    colorRgb: "59,130,246",
  },
  {
    name: "Marcus Chen",
    role: "UX Designer @ Figma",
    content:
      "Finally, a tool that understands design portfolios. The output is actually beautiful, not just functional.",
    avatar: "MC",
    color: "#8b5cf6",
    colorRgb: "139,92,246",
  },
  {
    name: "Aisha Patel",
    role: "Product Manager @ Stripe",
    content:
      "PortfolioAI saved me 20+ hours of building a portfolio site. The AI even wrote better descriptions than I could!",
    avatar: "AP",
    color: "#06b6d4",
    colorRgb: "6,182,212",
  },
] as const;

export const NAV_LINKS = [
  "Features",
  "How it works",
  "Dashboard",
  "Showcase",
] as const;
