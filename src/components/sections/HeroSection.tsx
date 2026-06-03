"use client";

import { ArrowRight, Brain, Database, FileText, Shield } from "lucide-react";

export default function HeroSection() {
  const ecosystemSteps = [
    {
      title: "Dynamics 365",
      description: "Customer Service",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Fabric",
      description: "Data Integration",
      icon: Database,
      color: "from-violet-500 to-violet-600",
    },
    {
      title: "Microsoft Foundry",
      description: "Intelligent AI",
      icon: Brain,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Microsoft 365",
      description: "Collaboration",
      icon: FileText,
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const valueProps = [
    {
      title: "360° view",
      description:
        "Unified visibility across victim journeys, partners, workflows, and case outcomes.",
      accent: "text-blue-600",
      border: "border-blue-100",
      bg: "bg-blue-50/70",
    },
    {
      title: "AI-powered",
      description:
        "Insights, document intelligence, and guided next-best-actions for frontline teams.",
      accent: "text-violet-600",
      border: "border-violet-100",
      bg: "bg-violet-50/70",
    },
    {
      title: "Secure by design",
      description:
        "Enterprise governance, content safety, and responsible AI guardrails around sensitive data.",
      accent: "text-emerald-600",
      border: "border-emerald-100",
      bg: "bg-emerald-50/70",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 p-8 shadow-sm sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-200/35 blur-3xl" />
        </div>

        <div className="relative z-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 shadow-sm backdrop-blur-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
              Slachtofferhulp Nederland × Microsoft
            </div>

            <div className="space-y-4">
              <h2 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                One Microsoft ecosystem for modern victim support.
              </h2>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Discover how Dynamics 365 Customer Service, Microsoft Fabric, Microsoft Foundry,
                and Microsoft 365 collaborate to deliver compassionate, intelligent, and scalable
                victim support workflows.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">
                Case management
              </span>
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">
                Analytics & AI
              </span>
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">
                Productivity & governance
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {valueProps.map((item) => (
              <div
                key={item.title}
                className={`${item.bg} ${item.border} rounded-2xl border p-5 shadow-sm backdrop-blur-sm`}
              >
                <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${item.accent}`}>
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Connected platform flow</p>
            <h3 className="text-2xl font-semibold text-slate-950">
              How the Microsoft stack works together
            </h3>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            4 complementary layers
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                {index < ecosystemSteps.length - 1 ? (
                  <ArrowRight className="absolute right-4 top-4 hidden h-4 w-4 text-slate-300 xl:block" />
                ) : null}
                <div className={`inline-flex rounded-2xl bg-gradient-to-br ${step.color} p-3 shadow-sm`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4 space-y-1">
                  <h4 className="text-lg font-semibold text-slate-950">{step.title}</h4>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
