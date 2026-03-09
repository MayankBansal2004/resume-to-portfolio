import type { ThemeDescriptor } from "@/types/theme";
import { NebulaLayout } from "./Layout";
import { NebulaHero } from "./Hero";
import { NebulaExperience } from "./Experience";
import { NebulaProjects } from "./Projects";
import { NebulaSkills } from "./Skills";
import { NebulaEducation } from "./Education";
import { NebulaContact } from "./Contact";

export const nebulaTheme: ThemeDescriptor = {
    id: "nebula",
    name: "Nebula",
    description: "Dark, futuristic, and glowing. Makes your portfolio unforgettable.",
    badge: "✦",
    swatchClass: "bg-[#030711] border-2 border-indigo-500/50",
    components: {
        Layout: NebulaLayout,
        Hero: NebulaHero,
        Experience: NebulaExperience,
        Projects: NebulaProjects,
        Skills: NebulaSkills,
        Education: NebulaEducation,
        Contact: NebulaContact,
    },
};
