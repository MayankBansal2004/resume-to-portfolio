/**
 * Central icon barrel — re-exports from lucide-react so the rest of the app
 * imports from a single place and we can swap libraries pain-free.
 */
export {
  Upload as UploadIcon,
  Sparkles as SparklesIcon,
  Zap as ZapIcon,
  Brain as BrainIcon,
  Globe as GlobeIcon,
  Palette as PaletteIcon,
  Share2 as ShareIcon,
  Github as GithubIcon,
  ArrowRight as ArrowRightIcon,
  CheckCircle2 as CheckIcon,
} from "lucide-react";

import { Brain, Palette, Globe, Zap, Share2, Sparkles } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/** Map used by data-driven components (e.g. FeaturesSection) */
export const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  palette: Palette,
  globe: Globe,
  zap: Zap,
  share: Share2,
  sparkles: Sparkles,
};
