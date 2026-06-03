"use client";

import { ArrowRight, Brain, Database, FileText, Shield, MessageSquare, Sparkles, Eye, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  // The full Microsoft ecosystem represented as layers
  const ecosystemLayers = [
    {
      label: "Business Platform",
      items: [
        { title: "Dynamics 365", subtitle: "Customer Service", icon: Shield, color: "from-blue-600 to-blue-700" },
        { title: "Microsoft 365", subtitle: "Word · Excel · Teams", icon: FileText, color: "from-emerald-500 to-emerald-600" },
      ],
    },
    {
      label: "Data & Analytics",
      items: [
        { title: "Microsoft Fabric", subtitle: "OneLake · Lakehouse · Power BI", icon: Database, color: "from-violet-500 to-violet-600" },
      ],
    },
    {
      label: "AI & Agents",
      items: [
        { title: "Microsoft Foundry", subtitle: "Custom agents · RAG · Evals", icon: Brain, color: "from-pink-500 to-pink-600" },
        { title: "Copilot Studio", subtitle: "Low-code agents · Agent Builder", icon: MessageSquare, color: "from-amber-500 to-amber-600" },
        { title: "M365 Copilot", subtitle: "Declarative agents · Extensions", icon: Sparkles, color: "from-teal-500 to-teal-600" },
      ],
    },
    {
      label: "Trust & Safety",
      items: [
        { title: "Content Understanding", subtitle: "Docs · Audio · Video extraction", icon: Eye, color: "from-indigo-500 to-indigo-600" },
        { title: "Content Safety", subtitle: "Moderation · Responsible AI", icon: ShieldCheck, color: "from-rose-500 to-rose-600" },
      ],
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
      {/* Hero banner */}
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
                From case intake in Dynamics 365 to analytics in Microsoft Fabric, intelligent agents in
                Microsoft Foundry and Copilot Studio, and daily productivity in Microsoft 365 —
                a connected platform that puts victims first.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">Case management</span>
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">Data & analytics</span>
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">AI agents</span>
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">Low-code builders</span>
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm">Safety & governance</span>
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

      {/* Ecosystem map — layered view */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Microsoft ecosystem map</p>
            <h3 className="text-2xl font-semibold text-slate-950">
              How the platform layers connect
            </h3>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            4 layers · 8 capabilities
          </div>
        </div>

        <div className="space-y-4">
          {ecosystemLayers.map((layer, layerIdx) => (
            <div key={layer.label}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{layer.label}</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(layer.items.length, 3)}, 1fr)` }}>
                {layer.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="group relative rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:border-slate-300 hover:shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className={`inline-flex shrink-0 rounded-xl bg-gradient-to-br ${item.color} p-2.5 shadow-sm`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-950">{item.title}</h4>
                          <p className="mt-0.5 text-xs text-slate-500">{item.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {layerIdx < ecosystemLayers.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="h-4 w-4 rotate-90 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* How they connect */}
        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">How they work together</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span><strong>Dynamics 365</strong> captures cases → data flows to <strong>Microsoft Fabric</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              <span><strong>Microsoft Fabric</strong> semantic models power <strong>Power BI</strong> dashboards & data agents</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-400" />
              <span><strong>Foundry</strong> builds pro-code agents grounded in governed data</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span><strong>Copilot Studio</strong> enables low-code agents with connectors & Agent Builder</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              <span><strong>M365 Copilot</strong> surfaces insights in Word, Excel, Teams via extensions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
              <span><strong>Content Safety</strong> + <strong>Responsible AI</strong> guard every AI interaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
