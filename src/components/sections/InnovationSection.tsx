"use client";

import React from "react";
import {
  AlertTriangle,
  Briefcase,
  Globe,
  Heart,
  Lock,
  Repeat2,
  Shield,
  TrendingUp,
  Users2,
  Wifi,
} from "lucide-react";

interface InnovationPattern {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const innovationPatterns: InnovationPattern[] = [
  {
    icon: <AlertTriangle className="h-8 w-8" />,
    title: "Early-Warning Risk Systems",
    description:
      "AI-powered pattern detection to identify victims at highest risk, enabling proactive support intervention through Fabric analytics and Microsoft Foundry agents.",
  },
  {
    icon: <Repeat2 className="h-8 w-8" />,
    title: "Repeat-Contact Detection",
    description:
      "Identify when the same victim contacts multiple channels or services, connecting fragmented data using Dynamics 365 and Fabric for unified case history.",
  },
  {
    icon: <Wifi className="h-8 w-8" />,
    title: "Multi-Channel Victim Intake",
    description:
      "Seamless intake across phone, chat, web, and in-person touchpoints with data unified in Dynamics 365 and analyzed with Copilot Studio.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Multilingual Support",
    description:
      "Scale service delivery across language barriers using AI translation and culturally-aware communication with responsible AI safeguards.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Trauma-Informed Communication",
    description:
      "AI assistance to recommend evidence-based, trauma-informed language patterns and de-escalation techniques for frontline workers.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Scam & Fraud Victim Analytics",
    description:
      "Detect scam patterns, financial exploitation trends, and cross-victim connections to help warn communities and improve prevention strategies.",
  },
  {
    icon: <Users2 className="h-8 w-8" />,
    title: "Partner & Referral Coordination",
    description:
      "AI-powered matching of victims to specialized services and tracking of referral outcomes across partner networks using secure data sharing.",
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Case Backlog & Capacity Planning",
    description:
      "Predictive analytics for workload forecasting and resource allocation, helping teams prioritize cases based on risk and need.",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Outcome Measurement",
    description:
      "Track victim recovery indicators, service effectiveness, and impact metrics using Power BI dashboards grounded in real case data.",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Safe AI for Frontline Workers",
    description:
      "Responsible AI guardrails ensure suggestions are safe, ethical, and human-verified before any victim-facing communication.",
  },
];

export default function InnovationSection(): React.ReactElement {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {innovationPatterns.map((pattern) => (
          <div
            key={pattern.title}
            className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
          >
            <div className="absolute left-0 top-0 h-14 w-1 rounded-tr-lg bg-gradient-to-b from-blue-500 to-transparent" />

            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
              {pattern.icon}
            </div>

            <h3 className="mb-2 text-lg font-semibold text-slate-900">{pattern.title}</h3>

            <p className="text-sm leading-relaxed text-slate-600">{pattern.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 shadow-sm">
        <p className="text-sm text-slate-700">
          <strong>Approach:</strong> These patterns are developed with careful attention to victim
          privacy, safety, and ethical data handling. All implementations should include
          comprehensive responsible AI evaluations, human-in-the-loop verification, and clear
          communication about AI involvement in victim-facing processes.
        </p>
      </div>
    </div>
  );
}
