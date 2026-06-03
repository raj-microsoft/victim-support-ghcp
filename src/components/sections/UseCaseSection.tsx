"use client";

import {
  BarChart3,
  Brain,
  Database,
  FileText,
  Phone,
  Share2,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function UseCaseSection() {
  const timelineSteps = [
    {
      number: 1,
      title: "Case Intake",
      description:
        "A victim of online fraud contacts Slachtofferhulp via phone. A case worker creates a new case in Dynamics 365 Customer Service. Contact details, incident type, and initial risk assessment are captured.",
      icon: Phone,
      badge: "Dynamics 365",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      number: 2,
      title: "Data Foundation",
      description:
        "Case and contact data flows securely into Microsoft Fabric's OneLake. A Lakehouse stores structured case records alongside unstructured notes and documents.",
      icon: Database,
      badge: "Microsoft Fabric",
      badgeColor: "bg-purple-100 text-purple-800",
    },
    {
      number: 3,
      title: "Analytics & Insights",
      description:
        "Power BI dashboards reveal: rising trend of online fraud cases in the region, average resolution time, and resource bottlenecks. Semantic models enable natural-language queries.",
      icon: BarChart3,
      badge: "Power BI",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      number: 4,
      title: "AI Agent Assistance",
      description:
        "A Microsoft Foundry agent, grounded in Slachtofferhulp's knowledge base, suggests next-best-actions: connect victim with financial counseling partner, flag case for priority follow-up.",
      icon: Brain,
      badge: "Microsoft Foundry",
      badgeColor: "bg-cyan-100 text-cyan-800",
    },
    {
      number: 5,
      title: "Document Understanding",
      description:
        "Azure AI Content Understanding extracts structured data from a police report PDF and a victim's uploaded screenshots, auto-populating case fields.",
      icon: FileText,
      badge: "AI Content Understanding",
      badgeColor: "bg-teal-100 text-teal-800",
    },
    {
      number: 6,
      title: "Safety & Responsibility",
      description:
        "Content Safety screens incoming communications for harmful content. Responsible AI evaluations verify the AI agent's responses are grounded, safe, and empathetic.",
      icon: Shield,
      badge: "Content Safety & RAI",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      number: 7,
      title: "Productivity Outputs",
      description:
        "Case insights surface in Teams for the supervisor. A Word document summarizes the case for partner referral. A PowerPoint brief is generated for the weekly team review.",
      icon: Share2,
      badge: "Microsoft 365",
      badgeColor: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 md:block" />

        <div className="space-y-12">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center gap-8 md:flex-row"
              >
                <div
                  className={`hidden md:flex md:w-5/12 ${isEven ? "order-1 text-right" : "order-3"}`}
                >
                  {isEven ? (
                    <Card className="w-full border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="mb-2 flex items-center justify-end gap-2">
                            <Badge className={step.badgeColor}>{step.badge}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                          <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : null}
                </div>

                <div className="relative z-10 order-2 flex h-12 w-12 flex-shrink-0 items-center justify-center md:order-2">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-slate-900 bg-white shadow-lg">
                    <div className="text-sm font-bold text-slate-900">{step.number}</div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
                    <Icon className="h-8 w-8 text-slate-400 opacity-20" />
                  </div>
                </div>

                <div
                  className={`w-full md:w-5/12 ${isEven ? "order-3" : "order-1 md:order-3"}`}
                >
                  <Card className="w-full border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2">
                            <Icon className="h-5 w-5 text-slate-700" />
                          </div>
                          <Badge className={step.badgeColor}>{step.badge}</Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5 shadow-sm">
        <p className="text-center text-sm text-slate-700">
          <span className="font-semibold">Privacy &amp; Security:</span> This scenario demonstrates
          Microsoft technology capabilities using fictional, non-identifying data.
          Slachtofferhulp maintains strict privacy and compliance standards throughout all victim
          support workflows.
        </p>
      </div>
    </div>
  );
}
