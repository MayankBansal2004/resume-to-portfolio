import type { ThemeDescriptor } from "@/types/theme";
import { MinimalistLayout } from "./Layout";
import { MinimalistHero } from "./Hero";
import { MinimalistExperience } from "./Experience";
import { MinimalistProjects } from "./Projects";
import { MinimalistSkills } from "./Skills";
import { MinimalistEducation } from "./Education";
import { MinimalistContact } from "./Contact";

export const minimalistTheme: ThemeDescriptor = {
    id: "minimalist",
    name: "Minimal",
    description: "Clean, type-first design. Résumé-inspired. All content, no distraction.",
    badge: "◻",
    swatchClass: "bg-white border-2 border-zinc-300",
    components: {
        Layout: MinimalistLayout,
        Hero: MinimalistHero,
        Experience: MinimalistExperience,
        Projects: MinimalistProjects,
        Skills: MinimalistSkills,
        Education: MinimalistEducation,
        Contact: MinimalistContact,
    },
};
