"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import AppSidebar from "./AppSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function formatBreadcrumb(pathname: string): string {
  if (pathname === "/") {
    return "Overview";
  }

  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    )
    .join(" / ");
}

export default function DashboardLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();
  const breadcrumbLabel = title ?? formatBreadcrumb(pathname);

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-slate-50/70">
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <SidebarTrigger className="h-9 w-9 rounded-lg border border-border bg-background shadow-sm hover:bg-accent" />
              <div className="hidden h-6 w-px bg-border md:block" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
                    <Home className="h-3.5 w-3.5" />
                    Dashboard
                  </Link>
                  {pathname !== "/" && (
                    <>
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="truncate">{breadcrumbLabel}</span>
                    </>
                  )}
                </div>
                {title ? (
                  <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
                    {title}
                  </h1>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                className="hidden border-emerald-200 bg-emerald-50 text-emerald-700 sm:inline-flex"
                variant="outline"
              >
                Workshop ready
              </Badge>
              <Button variant="outline" className="h-10 rounded-full border-border bg-background px-3 shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-semibold text-white">
                  R
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold leading-none">Raj</p>
                  <p className="text-[11px] text-muted-foreground">Microsoft</p>
                </div>
              </Button>
            </div>
          </div>

          {description ? (
            <div className="border-t border-border/60 bg-background/80 px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">
              {description}
            </div>
          ) : null}
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
