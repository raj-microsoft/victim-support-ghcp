"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Trophy,
  ArrowUpDown,
  Star,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Initiative {
  id: string;
  milestone: string;
  date: string;
  slachtofferhulpNeeds: string;
  microsoftNeeds: string;
  howMicrosoftHelps: string;
  impact: number;
  effort: number;
  confidence: number;
  status: "planned" | "in-progress" | "completed" | "blocked";
  owner: string;
}

type InitiativeForm = Omit<Initiative, "id">;
type ViewMode = "all" | "priority" | "timeline";

const STORAGE_KEY = "victim-support-roadmap";
const STATUS_OPTIONS: Initiative["status"][] = [
  "planned",
  "in-progress",
  "completed",
  "blocked",
];

const emptyInitiative: InitiativeForm = {
  milestone: "",
  date: "",
  slachtofferhulpNeeds: "",
  microsoftNeeds: "",
  howMicrosoftHelps: "",
  impact: 3,
  effort: 3,
  confidence: 3,
  status: "planned",
  owner: "",
};

const exampleInitiatives: Initiative[] = [
  {
    id: "initiative-d365-cs-pilot",
    milestone: "Dynamics 365 CS Pilot",
    date: "Q3 2026",
    slachtofferhulpNeeds:
      "Create a safer, unified frontline experience for managing victim interactions across channels.",
    microsoftNeeds:
      "Prove fast business value with a visible service transformation pilot and measurable case outcomes.",
    howMicrosoftHelps:
      "Stand up a Dynamics 365 Customer Service pilot with secure workflows, case views, and reporting foundations.",
    impact: 5,
    effort: 3,
    confidence: 4,
    status: "planned",
    owner: "Workshop Core Team",
  },
  {
    id: "initiative-fabric-data-lake-setup",
    milestone: "Fabric Data Lake Setup",
    date: "Q3 2026",
    slachtofferhulpNeeds:
      "Bring fragmented operational and outcomes data together for cross-team insight and trend detection.",
    microsoftNeeds:
      "Create a trusted data foundation that unlocks analytics, AI readiness, and future platform expansion.",
    howMicrosoftHelps:
      "Deploy Microsoft Fabric with governed ingestion, lakehouse architecture, and starter semantic models.",
    impact: 4,
    effort: 4,
    confidence: 4,
    status: "planned",
    owner: "Data & Platform Lead",
  },
  {
    id: "initiative-ai-agent-poc",
    milestone: "AI Agent PoC",
    date: "Q4 2026",
    slachtofferhulpNeeds:
      "Reduce frontline admin burden while preserving empathy and human oversight in complex cases.",
    microsoftNeeds:
      "Demonstrate differentiated AI value in a contained proof of concept with clear guardrails.",
    howMicrosoftHelps:
      "Use Microsoft Foundry and Copilot patterns to prototype a guided assistant for staff knowledge retrieval.",
    impact: 5,
    effort: 3,
    confidence: 3,
    status: "planned",
    owner: "Innovation Squad",
  },
  {
    id: "initiative-content-safety-integration",
    milestone: "Content Safety Integration",
    date: "Q4 2026",
    slachtofferhulpNeeds:
      "Ensure victim-facing and staff-assistive AI interactions remain safe, trauma-informed, and policy aligned.",
    microsoftNeeds:
      "Embed responsible AI controls early so pilots can scale with confidence across the organization.",
    howMicrosoftHelps:
      "Integrate Azure AI Content Safety and governance workflows into prompts, review loops, and monitoring.",
    impact: 4,
    effort: 2,
    confidence: 5,
    status: "planned",
    owner: "Responsible AI Lead",
  },
  {
    id: "initiative-m365-copilot-rollout",
    milestone: "M365 Copilot Rollout",
    date: "Q1 2027",
    slachtofferhulpNeeds:
      "Improve cross-functional productivity, meeting follow-up, and knowledge sharing for support teams.",
    microsoftNeeds:
      "Extend value from platform investments into everyday work habits and executive-visible productivity wins.",
    howMicrosoftHelps:
      "Roll out Microsoft 365 Copilot with role-based adoption journeys, champions, and secure knowledge grounding.",
    impact: 5,
    effort: 4,
    confidence: 3,
    status: "planned",
    owner: "Change & Adoption Team",
  },
];

function clampScore(value: number): number {
  if (Number.isNaN(value)) {
    return 1;
  }

  return Math.min(5, Math.max(1, Math.round(value)));
}

function getPriorityScore(initiative: Initiative): number {
  return (initiative.impact * initiative.confidence) / Math.max(initiative.effort, 1);
}

function formatPriorityScore(initiative: Initiative): string {
  return getPriorityScore(initiative).toFixed(1);
}

function getDateOrder(date: string): number {
  const quarterMatch = date.match(/^Q([1-4])\s+(\d{4})$/i);

  if (quarterMatch) {
    const [, quarter, year] = quarterMatch;
    return Number(year) * 4 + (Number(quarter) - 1);
  }

  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

function statusBadgeClasses(status: Initiative["status"]): string {
  switch (status) {
    case "completed":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "in-progress":
      return "border-sky-200 bg-sky-50 text-sky-700";
    case "blocked":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-slate-200 bg-slate-100 text-slate-700";
  }
}

function rankBadgeClasses(rank: number): string {
  switch (rank) {
    case 0:
      return "border-amber-300 bg-amber-100 text-amber-800";
    case 1:
      return "border-slate-300 bg-slate-100 text-slate-700";
    case 2:
      return "border-orange-300 bg-orange-100 text-orange-700";
    default:
      return "border-violet-200 bg-violet-50 text-violet-700";
  }
}

function normalizeInitiative(input: Partial<Initiative>, index: number): Initiative {
  const status = STATUS_OPTIONS.includes(input.status as Initiative["status"])
    ? (input.status as Initiative["status"])
    : "planned";

  return {
    id: typeof input.id === "string" && input.id ? input.id : `initiative-${Date.now()}-${index}`,
    milestone: typeof input.milestone === "string" ? input.milestone : `Initiative ${index + 1}`,
    date: typeof input.date === "string" ? input.date : "TBD",
    slachtofferhulpNeeds:
      typeof input.slachtofferhulpNeeds === "string" ? input.slachtofferhulpNeeds : "",
    microsoftNeeds: typeof input.microsoftNeeds === "string" ? input.microsoftNeeds : "",
    howMicrosoftHelps:
      typeof input.howMicrosoftHelps === "string" ? input.howMicrosoftHelps : "",
    impact: clampScore(Number(input.impact ?? 3)),
    effort: clampScore(Number(input.effort ?? 3)),
    confidence: clampScore(Number(input.confidence ?? 3)),
    status,
    owner: typeof input.owner === "string" ? input.owner : "Unassigned",
  };
}

function scoreLabel(score: number): string {
  if (score >= 7) {
    return "High momentum";
  }

  if (score >= 5) {
    return "Strong candidate";
  }

  return "Build confidence";
}

function readStoredInitiatives(): Initiative[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [...exampleInitiatives];
    }

    const parsed = JSON.parse(stored);
    const importedInitiatives = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.initiatives)
        ? parsed.initiatives
        : null;

    return importedInitiatives
      ? importedInitiatives.map(normalizeInitiative)
      : [...exampleInitiatives];
  } catch {
    return [...exampleInitiatives];
  }
}

function ScorePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}): React.ReactElement {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-800">{label}</label>
        <Badge className="bg-white text-slate-700 shadow-sm" variant="outline">
          {value}/5
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((option) => {
          const isActive = option === value;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-all",
                isActive
                  ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700"
              )}
            >
              <Star className={cn("h-4 w-4", isActive && "fill-current")} />
              <span className="sr-only">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InitiativeCard({
  initiative,
  onEdit,
  onDelete,
  highlight = false,
}: {
  initiative: Initiative;
  onEdit: (initiative: Initiative) => void;
  onDelete: (initiative: Initiative) => void;
  highlight?: boolean;
}): React.ReactElement {
  const priorityScore = getPriorityScore(initiative);

  return (
    <Card
      className={cn(
        "h-full border-0 bg-white/90 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/70 backdrop-blur-sm",
        highlight && "bg-gradient-to-br from-violet-50 via-white to-amber-50 ring-violet-200"
      )}
    >
      <CardHeader className="gap-4 px-6 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={statusBadgeClasses(initiative.status)} variant="outline">
                {initiative.status}
              </Badge>
              <Badge className="border-violet-200 bg-violet-50 text-violet-700" variant="outline">
                {initiative.date}
              </Badge>
            </div>
            <div>
              <CardTitle className="text-2xl text-slate-900">{initiative.milestone}</CardTitle>
              <CardDescription className="mt-2 text-base leading-7 text-slate-600">
                {initiative.howMicrosoftHelps}
              </CardDescription>
            </div>
          </div>

          <div className="min-w-32 rounded-3xl bg-slate-950 px-5 py-4 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-violet-200">Priority score</p>
            <p className="mt-2 text-4xl font-semibold leading-none">{priorityScore.toFixed(1)}</p>
            <p className="mt-2 text-sm text-slate-300">{scoreLabel(priorityScore)}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6 pb-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Slachtofferhulp needs
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{initiative.slachtofferhulpNeeds}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Microsoft needs
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{initiative.microsoftNeeds}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Score mix
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-slate-500">Impact</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{initiative.impact}</p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-slate-500">Effort</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{initiative.effort}</p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-slate-500">Confidence</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{initiative.confidence}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Owner</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{initiative.owner}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(initiative)}>
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(initiative)}>
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RoadmapSection(): React.ReactElement {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [activeView, setActiveView] = useState<ViewMode>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InitiativeForm>(emptyInitiative);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasLoadedFromStorage = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      hasLoadedFromStorage.current = true;
      setInitiatives(readStoredInitiatives());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initiatives));
  }, [initiatives]);

  const sortedByPriority = useMemo(
    () => [...initiatives].sort((left, right) => getPriorityScore(right) - getPriorityScore(left)),
    [initiatives]
  );

  const recommendedNext = useMemo(
    () => sortedByPriority.find((initiative) => initiative.status === "planned") ?? null,
    [sortedByPriority]
  );

  const timelineGroups = useMemo(() => {
    const groups = initiatives.reduce<Record<string, Initiative[]>>((accumulator, initiative) => {
      accumulator[initiative.date] ??= [];
      accumulator[initiative.date].push(initiative);
      return accumulator;
    }, {});

    return Object.entries(groups)
      .sort((left, right) => getDateOrder(left[0]) - getDateOrder(right[0]))
      .map(([date, items]) => ({
        date,
        items: items.sort((left, right) => getPriorityScore(right) - getPriorityScore(left)),
      }));
  }, [initiatives]);

  function resetForm(): void {
    setEditingId(null);
    setFormData(emptyInitiative);
  }

  function updateForm<K extends keyof InitiativeForm>(key: K, value: InitiativeForm[K]): void {
    setFormData((current) => ({ ...current, [key]: value }));
  }

  function openCreateDialog(): void {
    resetForm();
    setIsDialogOpen(true);
  }

  function openEditDialog(initiative: Initiative): void {
    setEditingId(initiative.id);
    setFormData({
      milestone: initiative.milestone,
      date: initiative.date,
      slachtofferhulpNeeds: initiative.slachtofferhulpNeeds,
      microsoftNeeds: initiative.microsoftNeeds,
      howMicrosoftHelps: initiative.howMicrosoftHelps,
      impact: initiative.impact,
      effort: initiative.effort,
      confidence: initiative.confidence,
      status: initiative.status,
      owner: initiative.owner,
    });
    setIsDialogOpen(true);
  }

  function handleDelete(initiative: Initiative): void {
    const confirmed = window.confirm(`Delete "${initiative.milestone}" from the roadmap?`);

    if (!confirmed) {
      return;
    }

    setInitiatives((current) => current.filter((item) => item.id !== initiative.id));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const nextInitiative: Initiative = {
      id: editingId ?? crypto.randomUUID(),
      ...formData,
      impact: clampScore(formData.impact),
      effort: clampScore(formData.effort),
      confidence: clampScore(formData.confidence),
    };

    setInitiatives((current) => {
      if (!editingId) {
        return [...current, nextInitiative];
      }

      return current.map((initiative) =>
        initiative.id === editingId ? nextInitiative : initiative
      );
    });

    setIsDialogOpen(false);
    resetForm();
  }

  function handleExport(): void {
    const payload = JSON.stringify(initiatives, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "prioritization-roadmap.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const parsed = JSON.parse(content);
      const incoming = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.initiatives)
          ? parsed.initiatives
          : null;

      if (!incoming) {
        throw new Error("Invalid roadmap file");
      }

      setInitiatives(incoming.map(normalizeInitiative));
    } catch {
      window.alert("Unable to import roadmap JSON. Please check the file format.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="border-violet-200 bg-violet-50 px-3 py-1 text-violet-700" variant="outline">
            Interactive workshop canvas
          </Badge>
          <p className="text-sm text-slate-500">Persistent browser-based prioritization board for the live workshop.</p>
        </div>

        <div className="flex flex-wrap gap-3">
            <Button className="bg-violet-600 text-white hover:bg-violet-700" onClick={openCreateDialog}>
              <Plus className="mr-1 h-4 w-4" />
              Add initiative
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-1 h-4 w-4" />
              Export JSON
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-1 h-4 w-4" />
              Import JSON
            </Button>
            <input
              ref={fileInputRef}
              accept="application/json"
              className="hidden"
              type="file"
              onChange={handleImport}
            />
          </div>
        </div>

        {recommendedNext ? (
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-950 via-violet-950 to-slate-900 text-white shadow-[0_30px_80px_-40px_rgba(76,29,149,0.85)]">
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-white/15 bg-white/10 text-white" variant="outline">
                      <Trophy className="mr-1 h-3 w-3" />
                      Recommended Next
                    </Badge>
                    <Badge className="border-amber-300/30 bg-amber-400/10 text-amber-200" variant="outline">
                      Priority {formatPriorityScore(recommendedNext)}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{recommendedNext.milestone}</h3>
                    <p className="mt-2 max-w-3xl text-base leading-7 text-slate-200">
                      {recommendedNext.howMicrosoftHelps}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-4 text-center ring-1 ring-white/10">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Impact</p>
                    <p className="mt-2 text-3xl font-semibold">{recommendedNext.impact}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 text-center ring-1 ring-white/10">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Effort</p>
                    <p className="mt-2 text-3xl font-semibold">{recommendedNext.effort}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 text-center ring-1 ring-white/10">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Confidence</p>
                    <p className="mt-2 text-3xl font-semibold">{recommendedNext.confidence}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <Tabs
          value={activeView}
          onValueChange={(value) => setActiveView(value as ViewMode)}
          className="space-y-6"
        >
          <TabsList className="h-auto rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
            <TabsTrigger className="px-4 py-2" value="all">
              All Initiatives
            </TabsTrigger>
            <TabsTrigger className="px-4 py-2" value="priority">
              <ArrowUpDown className="mr-1 h-4 w-4" />
              Priority Board
            </TabsTrigger>
            <TabsTrigger className="px-4 py-2" value="timeline">
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6 xl:grid-cols-2">
              {sortedByPriority.map((initiative) => (
                <InitiativeCard
                  key={initiative.id}
                  initiative={initiative}
                  onDelete={handleDelete}
                  onEdit={openEditDialog}
                  highlight={recommendedNext?.id === initiative.id}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="priority">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="border-0 bg-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/70">
                <CardHeader className="px-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-slate-950">Priority Leaderboard</CardTitle>
                      <CardDescription className="mt-1 text-base text-slate-600">
                        Ranked by (Impact × Confidence) / Effort.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  {sortedByPriority.map((initiative, index) => (
                    <div
                      key={initiative.id}
                      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <Badge className={rankBadgeClasses(index)} variant="outline">
                          #{index + 1}
                        </Badge>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-lg font-semibold text-slate-900">{initiative.milestone}</p>
                            <Badge className={statusBadgeClasses(initiative.status)} variant="outline">
                              {initiative.status}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {initiative.date} • Owner: {initiative.owner}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                            Priority score
                          </p>
                          <p className="text-3xl font-semibold text-slate-950">
                            {formatPriorityScore(initiative)}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(initiative)}>
                          <Edit className="mr-1 h-4 w-4" />
                          Refine
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-b from-violet-50 via-white to-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-violet-200/70">
                <CardHeader className="px-6 pt-6">
                  <CardTitle className="text-2xl text-slate-950">Decision cues</CardTitle>
                  <CardDescription className="mt-1 text-base text-slate-600">
                    Use the score with judgment, dependencies, and team readiness.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <div className="rounded-3xl bg-white p-5 ring-1 ring-violet-100">
                    <p className="text-sm font-semibold text-slate-900">Top opportunity</p>
                    <p className="mt-2 text-xl font-semibold text-violet-700">
                      {sortedByPriority[0]?.milestone ?? "No initiatives yet"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Highest composite priority based on workshop scoring.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 ring-1 ring-violet-100">
                    <p className="text-sm font-semibold text-slate-900">Fastest confidence builder</p>
                    <p className="mt-2 text-xl font-semibold text-violet-700">
                      {
                        [...sortedByPriority].sort((left, right) => left.effort - right.effort)[0]
                          ?.milestone ?? "No initiatives yet"
                      }
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Lowest effort option for generating momentum and stakeholder proof points.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 ring-1 ring-violet-100">
                    <p className="text-sm font-semibold text-slate-900">Average priority</p>
                    <p className="mt-2 text-4xl font-semibold text-slate-950">
                      {initiatives.length
                        ? (
                            initiatives.reduce((sum, initiative) => sum + getPriorityScore(initiative), 0) /
                            initiatives.length
                          ).toFixed(1)
                        : "0.0"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="border-0 bg-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/70">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-2xl text-slate-950">Roadmap Timeline</CardTitle>
                <CardDescription className="mt-1 text-base text-slate-600">
                  Cluster initiatives by milestone window to shape the workshop conversation.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-8">
                  {timelineGroups.map((group) => (
                    <div key={group.date} className="grid gap-4 lg:grid-cols-[180px_1fr] lg:gap-8">
                      <div className="flex items-start gap-3 lg:flex-col lg:gap-2">
                        <Badge className="border-violet-200 bg-violet-50 text-violet-700" variant="outline">
                          {group.date}
                        </Badge>
                        <p className="text-sm leading-6 text-slate-500">
                          {group.items.length} initiative{group.items.length === 1 ? "" : "s"}
                        </p>
                      </div>

                      <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-300 before:to-slate-200">
                        {group.items.map((initiative) => (
                          <div key={initiative.id} className="relative">
                            <span className="absolute left-[-1.65rem] top-6 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-violet-100" />
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="text-lg font-semibold text-slate-900">
                                    {initiative.milestone}
                                  </p>
                                  <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {initiative.howMicrosoftHelps}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                                    Score
                                  </p>
                                  <p className="text-3xl font-semibold text-slate-950">
                                    {formatPriorityScore(initiative)}
                                  </p>
                                </div>
                              </div>
                              <Separator className="my-4" />
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-2">
                                  <Badge className={statusBadgeClasses(initiative.status)} variant="outline">
                                    {initiative.status}
                                  </Badge>
                                  <Badge className="border-slate-200 bg-white text-slate-700" variant="outline">
                                    Owner: {initiative.owner}
                                  </Badge>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => openEditDialog(initiative)}>
                                  <Edit className="mr-1 h-4 w-4" />
                                  Update
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto p-0 sm:max-w-4xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="space-y-3 px-8 pt-8">
              <DialogTitle className="text-2xl text-slate-950">
                {editingId ? "Edit initiative" : "Add initiative"}
              </DialogTitle>
              <DialogDescription className="text-base leading-7 text-slate-600">
                Capture the shared roadmap story: what matters to Slachtofferhulp, what matters
                to Microsoft, and how the initiative earns its priority.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8 px-8 py-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-800">Milestone</label>
                  <Input
                    className="h-11 rounded-xl"
                    placeholder="e.g. Dynamics 365 CS Pilot"
                    value={formData.milestone}
                    onChange={(event) => updateForm("milestone", event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-800">Date</label>
                  <Input
                    className="h-11 rounded-xl"
                    placeholder="e.g. Q3 2026"
                    value={formData.date}
                    onChange={(event) => updateForm("date", event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-800">Slachtofferhulp needs</label>
                  <Textarea
                    className="min-h-36 rounded-2xl"
                    placeholder="Describe the desired victim-support outcome."
                    value={formData.slachtofferhulpNeeds}
                    onChange={(event) => updateForm("slachtofferhulpNeeds", event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-800">Microsoft needs</label>
                  <Textarea
                    className="min-h-36 rounded-2xl"
                    placeholder="Describe the Microsoft business or platform need."
                    value={formData.microsoftNeeds}
                    onChange={(event) => updateForm("microsoftNeeds", event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-800">How Microsoft helps</label>
                  <Textarea
                    className="min-h-36 rounded-2xl"
                    placeholder="Capture the solution path, pilot shape, or enabling motion."
                    value={formData.howMicrosoftHelps}
                    onChange={(event) => updateForm("howMicrosoftHelps", event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <ScorePicker
                  label="Impact"
                  value={formData.impact}
                  onChange={(value) => updateForm("impact", value)}
                />
                <ScorePicker
                  label="Effort"
                  value={formData.effort}
                  onChange={(value) => updateForm("effort", value)}
                />
                <ScorePicker
                  label="Confidence"
                  value={formData.confidence}
                  onChange={(value) => updateForm("confidence", value)}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-800">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => updateForm("status", value as Initiative["status"])}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl bg-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-800">Owner</label>
                  <Input
                    className="h-11 rounded-xl"
                    placeholder="Who owns or sponsors this initiative?"
                    value={formData.owner}
                    onChange={(event) => updateForm("owner", event.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="rounded-b-[1.75rem] px-8 py-5 sm:justify-between">
              <p className="text-sm text-slate-500">
                Current score preview: {((formData.impact * formData.confidence) / formData.effort).toFixed(1)}
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-violet-600 text-white hover:bg-violet-700" type="submit">
                  {editingId ? "Save changes" : "Add to roadmap"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
    </>
  );
}
