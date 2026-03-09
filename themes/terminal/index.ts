import type { ThemeDescriptor } from "@/types/theme";
import { TerminalLayout } from "./Layout";
import { TerminalHero } from "./Hero";
import { TerminalExperience } from "./Experience";
import { TerminalProjects } from "./Projects";
import { TerminalSkills } from "./Skills";
import { TerminalEducation } from "./Education";
import { TerminalContact } from "./Contact";

export const terminalTheme: ThemeDescriptor = {
    id: "terminal",
    name: "Terminal",
    description: "Hacker aesthetic. Matrix green on black, monospace throughout, CRT scanlines.",
    badge: ">_",
    swatchClass: "bg-[#0a0a0a] border-2 border-[#00ff41]/40",
    components: {
        Layout: TerminalLayout,
        Hero: TerminalHero,
        Experience: TerminalExperience,
        Projects: TerminalProjects,
        Skills: TerminalSkills,
        Education: TerminalEducation,
        Contact: TerminalContact,
    },
};
