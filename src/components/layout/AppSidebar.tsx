"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Flag,
  GitBranch,
  Home,
  Layers,
  Lightbulb,
  Map,
  Play,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { title: "Overview", href: "/", icon: Home },
  { title: "Decision Framework", href: "/decision-tree", icon: GitBranch },
  { title: "Use Case Journey", href: "/use-case", icon: Users },
  { title: "Capabilities", href: "/capabilities", icon: Layers },
  { title: "Demo Journey", href: "/demo", icon: Play },
  { title: "Innovation", href: "/innovation", icon: Lightbulb },
  { title: "Roadmap", href: "/roadmap", icon: Map },
  { title: "Summary", href: "/closing", icon: Flag },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="gap-4 border-b border-sidebar-border px-3 py-4">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-2 py-1.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            S
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              Slachtofferhulp
            </p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              One Microsoft Ecosystem
            </p>
          </div>
        </Link>

        <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/70 p-3 text-xs leading-5 text-sidebar-foreground/80 group-data-[collapsible=icon]:hidden">
          <p className="font-medium text-sidebar-foreground">Workshop dashboard</p>
          <p className="mt-1">
            Navigate the story as an executive walkthrough instead of a long scrolling microsite.
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-4 text-[11px] uppercase tracking-[0.18em]">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      className="h-10 rounded-xl px-3"
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/70 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-semibold text-white">
            R
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium text-sidebar-foreground">Raj</p>
            <p className="truncate text-xs text-sidebar-foreground/70">Microsoft workshop lead</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
