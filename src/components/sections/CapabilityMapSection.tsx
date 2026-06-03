"use client";

import {
  Brain,
  CheckCircle2,
  Database,
  FileText,
  Headphones,
  Shield,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Capability {
  id: string;
  title: string;
  icon: React.ReactNode;
  bullets: string[];
  accent: string;
  borderColor: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
}

export default function CapabilityMapSection() {
  const capabilities: Capability[] = [
    {
      id: "dynamics-service",
      title: "Dynamics 365 Customer Service",
      icon: <Headphones className="h-8 w-8" />,
      bullets: [
        "Case management & tracking",
        "Contact records & service workflows",
        "SLA tracking & omnichannel engagement",
      ],
      accent: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-t-4 border-purple-500",
      badgeVariant: "default",
    },
    {
      id: "Microsoft Fabric",
      title: "Microsoft Fabric",
      icon: <Database className="h-8 w-8" />,
      bullets: [
        "Lakehouse & OneLake data storage",
        "Data pipelines & notebooks",
        "Real-time analytics & semantic models",
      ],
      accent: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-t-4 border-green-500",
      badgeVariant: "secondary",
    },
    {
      id: "powerbi",
      title: "Power BI",
      icon: <TrendingUp className="h-8 w-8" />,
      bullets: [
        "Interactive dashboards & reports",
        "Natural-language Q&A",
        "Embedded analytics",
      ],
      accent: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      borderColor: "border-t-4 border-yellow-500",
      badgeVariant: "default",
    },
    {
      id: "Microsoft Fabric-agents",
      title: "Microsoft Fabric Data Agents",
      icon: <Zap className="h-8 w-8" />,
      bullets: [
        "Natural-language queries over governed data",
        "Contextual analytics at scale",
        "Self-service insights",
      ],
      accent: "bg-gradient-to-br from-cyan-50 to-cyan-100",
      borderColor: "border-t-4 border-cyan-500",
      badgeVariant: "secondary",
    },
    {
      id: "ai-foundry",
      title: "Microsoft Foundry Agents",
      icon: <Brain className="h-8 w-8" />,
      bullets: [
        "Custom AI agents with tool-use",
        "Retrieval-Augmented Generation (RAG)",
        "Grounded in enterprise knowledge",
      ],
      accent: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-t-4 border-blue-500",
      badgeVariant: "default",
    },
    {
      id: "content-understanding",
      title: "Azure AI Content Understanding",
      icon: <FileText className="h-8 w-8" />,
      bullets: [
        "Document extraction & form recognition",
        "Audio & video analysis",
        "Multimodal AI capabilities",
      ],
      accent: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      borderColor: "border-t-4 border-indigo-500",
      badgeVariant: "default",
    },
    {
      id: "content-safety",
      title: "Azure AI Content Safety",
      icon: <Shield className="h-8 w-8" />,
      bullets: [
        "Content moderation & filtering",
        "Harmful content detection",
        "Prompt injection shields",
      ],
      accent: "bg-gradient-to-br from-red-50 to-red-100",
      borderColor: "border-t-4 border-red-500",
      badgeVariant: "destructive",
    },
    {
      id: "responsible-ai",
      title: "Responsible AI Evaluations",
      icon: <CheckCircle2 className="h-8 w-8" />,
      bullets: [
        "Groundedness, relevance & coherence metrics",
        "Safety & fluency evaluation",
        "Latency & performance monitoring",
      ],
      accent: "bg-gradient-to-br from-teal-50 to-teal-100",
      borderColor: "border-t-4 border-teal-500",
      badgeVariant: "secondary",
    },
    {
      id: "copilot-studio",
      title: "Copilot Studio",
      icon: <Wand2 className="h-8 w-8" />,
      bullets: [
        "Low-code conversational agents",
        "Business process automation",
        "Enterprise connector ecosystem",
      ],
      accent: "bg-gradient-to-br from-pink-50 to-pink-100",
      borderColor: "border-t-4 border-pink-500",
      badgeVariant: "default",
    },
    {
      id: "m365-copilot",
      title: "Microsoft 365 Copilot",
      icon: <Sparkles className="h-8 w-8" />,
      bullets: [
        "Word, PowerPoint & Excel integration",
        "Teams conversational assistance",
        "Work IQ-style contextual intelligence",
      ],
      accent: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-t-4 border-orange-500",
      badgeVariant: "default",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {capabilities.map((capability) => (
          <Card
            key={capability.id}
            className={`${capability.borderColor} ${capability.accent} overflow-hidden border-x border-b border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-lg bg-white/70 p-2 backdrop-blur-sm">
                  <div className="text-slate-700">{capability.icon}</div>
                </div>
              </div>
              <CardTitle className="mt-4 text-xl text-slate-900">{capability.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {capability.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/40 pt-2">
                <Badge className="text-xs font-medium" variant={capability.badgeVariant}>
                  Enterprise Ready
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 shadow-sm md:px-8">
        <p className="mx-auto max-w-3xl text-center text-sm text-slate-700 md:text-base">
          These capabilities work together to create a unified platform for customer service
          excellence, data intelligence, and AI-powered automation—enabling organizations to
          deliver superior customer experiences while maintaining security, compliance, and
          responsible AI practices.
        </p>
      </div>
    </div>
  );
}
