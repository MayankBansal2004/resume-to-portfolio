import type { ThemeDescriptor } from "@/types/theme";
import { AuroraLayout } from "./Layout";
import { AuroraHero } from "./Hero";
import { AuroraExperience } from "./Experience";
import { AuroraProjects } from "./Projects";
import { AuroraSkills } from "./Skills";
import { AuroraEducation } from "./Education";
import { AuroraContact } from "./Contact";

export const auroraTheme: ThemeDescriptor = {
    id: "aurora",
    name: "Aurora",
    description: "Glassmorphism meets the Northern Lights. Deep navy with flowing teal & violet.",
    badge: "🌌",
    swatchClass: "bg-[#080c18] border-2 border-teal-500/40",
    components: {
        Layout: AuroraLayout,
        Hero: AuroraHero,
        Experience: AuroraExperience,
        Projects: AuroraProjects,
        Skills: AuroraSkills,
        Education: AuroraEducation,
        Contact: AuroraContact,
    },
};
