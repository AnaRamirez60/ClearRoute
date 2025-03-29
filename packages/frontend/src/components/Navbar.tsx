"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Menu, UserCircle, LogOut, MoonIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type NavLink = {
  href: string;
  label: string;
};

interface NavbarProps {
  additionalLinks?: NavLink[];
  showLogoutButton?: boolean;
  showUserName?: boolean;
}

export default function Navbar({
  additionalLinks = [],
  showLogoutButton = true,
  showUserName = true,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const defaultLinks: NavLink[] = [
    { href: "/ayuda", label: "Ayuda" },
    { href: "/trabajadores/reportes", label: "Reportes" },
  ];

  const navLinks = [...defaultLinks, ...additionalLinks];

  const handleLogout = () => {
    logout();
    router.push("/trabajadores/login");
  };

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/trabajadores/dashboard"
            className="flex z-40 font-semibold"
          >
            <span className="text-xl font-bold text-emerald-600">Clear</span>
            <span className="text-xl font-bold">Route</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Enlaces de navegación en desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-emerald-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Usuario Dropdown para Desktop */}
              {showUserName && user && (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center justify-center rounded-full p-1 hover:bg-gray-100 transition-colors cursor-pointer">
                        <UserCircle className="h-7 w-7 text-zinc-700" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <MoonIcon className="mr-2 h-4 w-4 text-zinc-500" />
                        Modo Oscuro
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar sesión</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Menú móvil */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}

                  {showLogoutButton && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar sesión</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
