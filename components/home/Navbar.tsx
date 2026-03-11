import { NAV_LINKS } from "@/lib/data/home";
import { Button } from "@/components/ui/Button";
import { Zap } from "lucide-react";
import { auth } from "@/auth";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { NavLinks } from "./NavLinks";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      {/* Logo */}
      <a href="/" className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Zap size={18} className="fill-white text-white" />
        </div>
        <span
          className="text-lg font-bold tracking-tight text-slate-100"
          style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
        >
          Portfolio<span className="text-gradient">AI</span>
        </span>
      </a>

      {/* Nav links — client component so active state works with pathname */}
      <NavLinks />

      {/* Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <NavbarUserMenu
            name={user.name}
            email={user.email}
            image={user.image}
          />
        ) : (
          <>
            <Button as="a" href="/auth/signin" variant="secondary" size="sm">
              Sign In
            </Button>
            <Button as="a" href="/auth/signin" variant="primary" size="sm">
              Get Started Free
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
