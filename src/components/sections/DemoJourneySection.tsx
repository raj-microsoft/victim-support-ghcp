"use client";

import React from "react";
import {
  BarChart3,
  Brain,
  CheckCircle,
  Database,
  FileText,
  Layers,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

interface DemoStep {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  timeEstimate: string;
}

const demoSteps: DemoStep[] = [
  {
    number: 1,
    icon: <Users className="h-8 w-8" />,
    title: "Create/Review Case",
    description: "Create or review a case in Dynamics 365 Customer Service",
    timeEstimate: "~10 min",
  },
  {
    number: 2,
    icon: <Database className="h-8 w-8" />,
    title: "Ingest Case Data",
    description: "Ingest case and contact data into Microsoft Fabric",
    timeEstimate: "~8 min",
  },
  {
    number: 3,
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Analyze Trends",
    description: "Analyze case trends and risk signals in Power BI",
    timeEstimate: "~12 min",
  },
  {
    number: 4,
    icon: <Brain className="h-8 w-8" />,
    title: "Query Data Agent",
    description: "Build or query a Microsoft Fabric data agent for insights",
    timeEstimate: "~10 min",
  },
  {
    number: 5,
    icon: <Zap className="h-8 w-8" />,
    title: "Microsoft Foundry Agent",
    description: "Build a Microsoft Foundry agent grounded in case knowledge",
    timeEstimate: "~15 min",
  },
  {
    number: 6,
    icon: <FileText className="h-8 w-8" />,
    title: "Content Understanding",
    description: "Run Content Understanding on sample documents/transcripts",
    timeEstimate: "~10 min",
  },
  {
    number: 7,
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Safety Checks",
    description: "Run safety checks and responsible AI evaluations",
    timeEstimate: "~12 min",
  },
  {
    number: 8,
    icon: <Layers className="h-8 w-8" />,
    title: "Compare Solutions",
    description: "Compare where Copilot Studio fits in the workflow",
    timeEstimate: "~8 min",
  },
  {
    number: 9,
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Generate Outputs",
    description: "Generate Word/PowerPoint/Excel outputs using insights",
    timeEstimate: "~10 min",
  },
];

export default function DemoJourneySection(): React.ReactElement {
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto lg:overflow-x-visible">
        <div className="grid min-w-full grid-cols-1 gap-6 md:grid-cols-2 lg:min-w-0 lg:grid-cols-3">
          {demoSteps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {step.number}
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {step.timeEstimate}
                </span>
              </div>

              <div className="mb-4 text-blue-600">{step.icon}</div>

              <h3 className="mb-2 text-lg font-semibold text-slate-900">{step.title}</h3>

              <p className="flex-grow text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5 shadow-sm">
        <p className="text-sm text-slate-700">
          <strong>Total Demo Time:</strong> Approximately 95 minutes with discussion and Q&amp;A.
          Each step builds on the previous one, demonstrating how data flows through Microsoft
          technologies to deliver actionable insights.
        </p>
      </div>
    </div>
  );
}
