"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Target,
  Users,
  Cpu,
  Shield,
  BarChart3,
  MessageSquare,
  Layers,
  Zap,
  BookOpen,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Types ---

type Layer = "intake" | "classify" | "refine" | "recommend" | "results";

type DataSource = "sharepoint-m365" | "fabric-lakehouse" | "custom-multi" | "dynamics-dataverse";

interface IntakeAnswers {
  outcome: string;
  existingTool: boolean | null;
  needsAI: boolean | null;
  needsAgent: boolean | null;
}

interface BXTScore {
  business: number;
  experience: number;
  technology: number;
}

type UseCaseType =
  | "case-management"
  | "analytics"
  | "knowledge-retrieval"
  | "document-extraction"
  | "conversational-assistant"
  | "custom-agent"
  | "workflow-automation"
  | "evaluation-safety"
  | "productivity-infusion";

interface Recommendation {
  primary: string;
  supporting: string[];
  pattern: string;
  governance: string;
  actionSafety: string;
  experienceModel: string;
  adoptExtendBuild: string;
  demoPath: string;
}

// --- Data ---

const useCaseOptions: { id: UseCaseType; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "case-management", label: "Case Management", icon: <Users className="w-5 h-5" />, description: "Service workflows, contact records, SLA tracking" },
  { id: "analytics", label: "Analytics & Reporting", icon: <BarChart3 className="w-5 h-5" />, description: "Trends, dashboards, operational insight" },
  { id: "knowledge-retrieval", label: "Knowledge & Q&A", icon: <BookOpen className="w-5 h-5" />, description: "Natural-language questions — depends on where data lives" },
  { id: "document-extraction", label: "Document / Content Extraction", icon: <Layers className="w-5 h-5" />, description: "Structure from docs, images, audio, video" },
  { id: "conversational-assistant", label: "Conversational Assistant", icon: <MessageSquare className="w-5 h-5" />, description: "Low-code chatbot or business process assistant" },
  { id: "custom-agent", label: "Custom AI Agent", icon: <Cpu className="w-5 h-5" />, description: "Reasoning, tool-use, multi-step planning" },
  { id: "workflow-automation", label: "Workflow Automation", icon: <Zap className="w-5 h-5" />, description: "Deterministic business rules and triggers" },
  { id: "evaluation-safety", label: "Evaluation & Safety", icon: <Shield className="w-5 h-5" />, description: "Quality, grounding, tone, safety testing" },
  { id: "productivity-infusion", label: "Productivity Infusion", icon: <Target className="w-5 h-5" />, description: "Bring insights into Word, Excel, Teams" },
];

const recommendations: Record<UseCaseType, Recommendation> = {
  "case-management": {
    primary: "Dynamics 365 Customer Service",
    supporting: ["Dataverse", "Power Automate", "Omnichannel"],
    pattern: "Case intelligence pattern",
    governance: "M365 tenant trust boundary, Dataverse row-level security",
    actionSafety: "Write actions with user confirmation in case updates",
    experienceModel: "Destination — case workers go to D365 to work",
    adoptExtendBuild: "Adopt — use existing SaaS capability",
    demoPath: "Create/review a case in Dynamics 365 Customer Service",
  },
  analytics: {
    primary: "Microsoft Fabric + Power BI",
    supporting: ["OneLake", "Lakehouse", "Semantic models", "Notebooks"],
    pattern: "Executive insight pattern",
    governance: "Microsoft Fabric workspace security, RLS on semantic models",
    actionSafety: "Read-only — audit logs and citations",
    experienceModel: "Destination — analysts go to Power BI dashboards",
    adoptExtendBuild: "Build on Microsoft Fabric — data-heavy, analytics-centric",
    demoPath: "Analyze case trends and risk signals in Power BI",
  },
  "knowledge-retrieval": {
    primary: "Depends on data source",
    supporting: ["Microsoft Fabric Data Agents", "Copilot Studio", "Microsoft Foundry", "M365 Copilot"],
    pattern: "Data in Microsoft Fabric → Fabric Data Agents or Power BI Q&A. Data in SharePoint/M365 → M365 Copilot or Copilot Studio with knowledge grounding. Custom/multi-source or pro-code needs → Microsoft Foundry agents with Azure AI Search.",
    governance: "Match trust boundary to data location — M365 tenant for SharePoint data, Fabric workspace for analytics data, Azure landing zone for custom agents",
    actionSafety: "Read-only — citations from governed data sources",
    experienceModel: "Companion — AI assists inside the user's existing workflow",
    adoptExtendBuild: "Adopt M365 Copilot if data is in SharePoint/Graph. Extend with Copilot Studio if low-code + connectors suffice. Build with Microsoft Foundry if custom grounding or multi-source retrieval is needed.",
    demoPath: "Show Fabric data agent for analytics Q&A, then Copilot Studio for SharePoint knowledge",
  },
  "document-extraction": {
    primary: "Azure AI Content Understanding",
    supporting: ["Microsoft Fabric", "Microsoft Foundry", "Blob Storage"],
    pattern: "Document intelligence pattern",
    governance: "Azure landing zone, data residency controls",
    actionSafety: "Read-only extraction, write to case fields with approval",
    experienceModel: "Feature — embedded extraction action in workflow",
    adoptExtendBuild: "Build — pro-code integration with Azure AI services",
    demoPath: "Use Content Understanding on a sample document/transcript",
  },
  "conversational-assistant": {
    primary: "Copilot Studio",
    supporting: ["Dataverse connectors", "Power Automate", "Teams"],
    pattern: "Low-code assistant pattern",
    governance: "Power Platform DLP, Copilot Studio guardrails",
    actionSafety: "Human approval points for write actions",
    experienceModel: "Companion — chat in Teams or web",
    adoptExtendBuild: "Extend — low-code extension of existing Copilot",
    demoPath: "Compare where Copilot Studio fits",
  },
  "custom-agent": {
    primary: "Microsoft Foundry Agents",
    supporting: ["Azure AI Search", "Content Safety", "Responsible AI evals"],
    pattern: "Microsoft Foundry grounded agent pattern",
    governance: "Azure landing zone, RBAC, content filtering",
    actionSafety: "Destructive actions require service-owner approval",
    experienceModel: "Companion or Destination — depends on channel",
    adoptExtendBuild: "Build — pro-code custom agent with full control",
    demoPath: "Build a Microsoft Foundry agent grounded in case knowledge",
  },
  "workflow-automation": {
    primary: "Power Automate + Dynamics 365",
    supporting: ["Dataverse", "Copilot Studio", "Logic Apps"],
    pattern: "Start in Copilot Studio, scale with Azure",
    governance: "Power Platform environment policies",
    actionSafety: "Triggered/headless — approval flows for write ops",
    experienceModel: "No-UI — triggered automation",
    adoptExtendBuild: "Adopt/Extend — use existing low-code platform",
    demoPath: "Show automated case routing and escalation",
  },
  "evaluation-safety": {
    primary: "Microsoft Foundry Evaluations + Content Safety",
    supporting: ["Responsible AI tooling", "Prompt Shields", "Genesys endpoint"],
    pattern: "Safe chatbot evaluation pattern",
    governance: "Azure compliance boundary, evaluation audit trail",
    actionSafety: "Read-only evaluation outputs",
    experienceModel: "Destination — development/QA team uses eval tools",
    adoptExtendBuild: "Build — pro-code evaluation pipelines",
    demoPath: "Run safety checks and evaluations",
  },
  "productivity-infusion": {
    primary: "Microsoft 365 Copilot",
    supporting: ["Graph connectors", "Declarative agents", "Teams", "Work IQ"],
    pattern: "Microsoft 365 knowledge grounding",
    governance: "M365 tenant boundary, Graph permissions, DLP",
    actionSafety: "Read-only surfacing with user-initiated actions",
    experienceModel: "Companion — AI assists in Word, Excel, Teams",
    adoptExtendBuild: "Adopt — existing M365 Copilot capabilities",
    demoPath: "Generate Word/PowerPoint/Excel style output",
  },
};

const solutionPatterns = [
  { name: "Case Intelligence", capabilities: ["Dynamics 365 CS", "Microsoft Fabric", "Power BI"], color: "bg-purple-100 text-purple-800" },
  { name: "AI Worker Assistant", capabilities: ["Dynamics 365 CS", "Microsoft Foundry Agents", "Responsible AI"], color: "bg-blue-100 text-blue-800" },
  { name: "Document Intelligence", capabilities: ["Content Understanding", "Microsoft Fabric", "Microsoft Foundry"], color: "bg-indigo-100 text-indigo-800" },
  { name: "Safe Chatbot Evaluation", capabilities: ["Genesys", "Microsoft Foundry Evals", "Content Safety"], color: "bg-red-100 text-red-800" },
  { name: "Executive Insight", capabilities: ["Microsoft Fabric Semantic Model", "Power BI", "M365 Copilot"], color: "bg-green-100 text-green-800" },
  { name: "Low-Code Assistant", capabilities: ["Copilot Studio", "Connectors", "Dataverse"], color: "bg-pink-100 text-pink-800" },
  { name: "Microsoft Foundry → M365", capabilities: ["Microsoft Foundry Agent", "Teams", "M365 Agents SDK"], color: "bg-cyan-100 text-cyan-800" },
  { name: "Progressive Enhancement", capabilities: ["Copilot Studio → Azure", "Low-code → Pro-code"], color: "bg-amber-100 text-amber-800" },
];

// Refinement options for use cases that depend on data source
const dataSourceOptions: { id: DataSource; label: string; description: string; icon: string }[] = [
  { id: "sharepoint-m365", label: "SharePoint / Microsoft 365", description: "Documents, wikis, emails, Teams content — already in M365 tenant", icon: "📁" },
  { id: "fabric-lakehouse", label: "Microsoft Fabric / Lakehouse", description: "Structured analytics data, semantic models, case/contact records in OneLake", icon: "🗄️" },
  { id: "dynamics-dataverse", label: "Dynamics 365 / Dataverse", description: "CRM data, case records, contact entities, business processes", icon: "⚙️" },
  { id: "custom-multi", label: "Custom / Multi-source", description: "External APIs, databases, multiple systems, or complex retrieval needs", icon: "🔗" },
];

const dataSourceRecommendations: Record<DataSource, Recommendation> = {
  "sharepoint-m365": {
    primary: "M365 Copilot or Copilot Studio",
    supporting: ["Graph connectors", "Declarative agents", "SharePoint knowledge grounding"],
    pattern: "Adopt M365 Copilot if out-of-box coverage suffices. Use Copilot Studio with SharePoint knowledge sources for targeted Q&A with custom topics.",
    governance: "M365 tenant trust boundary, SharePoint permissions inherited",
    actionSafety: "Read-only — citations from SharePoint sources",
    experienceModel: "Companion — answers inside Teams, Word, or a custom Copilot Studio bot",
    adoptExtendBuild: "Adopt M365 Copilot first. Extend with Copilot Studio declarative agent if you need custom instructions or scoped knowledge.",
    demoPath: "Show M365 Copilot answering from SharePoint, then Copilot Studio with knowledge grounding",
  },
  "fabric-lakehouse": {
    primary: "Microsoft Fabric Data Agents",
    supporting: ["Semantic models", "Power BI Q&A", "OneLake"],
    pattern: "Microsoft Fabric + Power BI translytical / data-agent pattern. Fabric data agents query semantic models directly.",
    governance: "Fabric workspace governance, semantic model RLS",
    actionSafety: "Read-only — analytics answers with citations",
    experienceModel: "Companion — natural-language Q&A over analytical data",
    adoptExtendBuild: "Extend — add Fabric data agent over existing semantic models for self-service analytics.",
    demoPath: "Build/query a Fabric data agent over case analytics semantic model",
  },
  "dynamics-dataverse": {
    primary: "Copilot Studio with Dataverse connector",
    supporting: ["Dynamics 365 Copilot", "Power Automate", "Dataverse knowledge"],
    pattern: "Low-code assistant pattern with Dataverse as knowledge source. Copilot Studio connects directly to Dynamics/Dataverse entities.",
    governance: "Power Platform DLP, Dataverse row-level security",
    actionSafety: "Read actions by default, write actions with user confirmation",
    experienceModel: "Companion — embedded in Dynamics 365 or Teams",
    adoptExtendBuild: "Adopt Dynamics 365 Copilot first. Extend with Copilot Studio for custom topics and business logic.",
    demoPath: "Show Copilot Studio querying case data from Dataverse",
  },
  "custom-multi": {
    primary: "Microsoft Foundry Agents",
    supporting: ["Azure AI Search", "Custom connectors", "RAG orchestration", "Content Safety"],
    pattern: "Foundry grounded agent pattern. Pro-code agent with Azure AI Search index across multiple sources, custom tool-use, and full orchestration control.",
    governance: "Azure landing zone, RBAC, content filtering, managed identity",
    actionSafety: "Configurable — read-only to write actions with approval middleware",
    experienceModel: "Destination or Companion — custom UX or published into Teams/M365",
    adoptExtendBuild: "Build — pro-code custom agent when requirements exceed low-code or single-source patterns.",
    demoPath: "Build a Foundry agent with Azure AI Search grounding across multiple sources",
  },
};

// Use cases that need data source refinement
const needsRefinement: UseCaseType[] = ["knowledge-retrieval", "custom-agent", "conversational-assistant"];

// --- Component ---

export default function DecisionTreeSection() {
  const [layer, setLayer] = useState<Layer>("intake");
  const [intake, setIntake] = useState<IntakeAnswers>({ outcome: "", existingTool: null, needsAI: null, needsAgent: null });
  const [bxt, setBxt] = useState<BXTScore>({ business: 3, experience: 3, technology: 3 });
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseType | null>(null);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);

  const bxtTotal = bxt.business + bxt.experience + bxt.technology;
  const bxtCategory = bxtTotal >= 12 ? "Accelerate" : bxtTotal >= 8 ? "Incubate" : "Research";
  const bxtColor = bxtTotal >= 12 ? "text-green-700 bg-green-50 border-green-200" : bxtTotal >= 8 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-gray-700 bg-gray-50 border-gray-200";

  const reset = () => {
    setLayer("intake");
    setIntake({ outcome: "", existingTool: null, needsAI: null, needsAgent: null });
    setBxt({ business: 3, experience: 3, technology: 3 });
    setSelectedUseCase(null);
    setSelectedDataSource(null);
  };

  // Use refined recommendation if data source was selected, otherwise use base recommendation
  const recommendation = selectedDataSource
    ? dataSourceRecommendations[selectedDataSource]
    : selectedUseCase ? recommendations[selectedUseCase] : null;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Badge variant="outline" className="w-fit border-violet-200 bg-violet-50 px-4 py-1 text-sm text-violet-700">
          Based on the Microsoft AI Decision Framework
        </Badge>
        <p className="text-sm text-muted-foreground">Outcome-first decisioning across four guided steps.</p>
      </div>

      {/* Progress */}
      <div className="flex flex-wrap items-center justify-center gap-2">
          {(["intake", "classify", "refine", "recommend", "results"] as Layer[]).map((l, i) => (
            <div key={l} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${layer === l ? "bg-primary text-white" : layers.indexOf(layer) > i ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {layers.indexOf(layer) > i ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                {["Should we?", "What type?", "Where's the data?", "Pattern", "Results"][i]}
              </div>
              {i < 4 && <ArrowRight className="w-4 h-4 text-gray-300" />}
            </div>
          ))}
        </div>

        {/* Layer 1: Intake Filter */}
        {layer === "intake" && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Layer 1 — Should we do this?
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">Outcome-first thinking: validate the need before choosing technology.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business outcome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What business outcome are we trying to achieve?
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                  placeholder="e.g., Reduce case resolution time by 30%"
                  value={intake.outcome}
                  onChange={(e) => setIntake({ ...intake, outcome: e.target.value })}
                />
              </div>

              {/* Existing tool check */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Does an existing Microsoft tool or SaaS already solve this?
                </label>
                <div className="flex gap-3">
                  <Button variant={intake.existingTool === true ? "default" : "outline"} onClick={() => setIntake({ ...intake, existingTool: true })}>Yes — adopt it</Button>
                  <Button variant={intake.existingTool === false ? "default" : "outline"} onClick={() => setIntake({ ...intake, existingTool: false })}>No — need something new</Button>
                </div>
              </div>

              {/* AI necessity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do we need AI, or would workflow/analytics/search suffice?
                </label>
                <div className="flex gap-3">
                  <Button variant={intake.needsAI === true ? "default" : "outline"} onClick={() => setIntake({ ...intake, needsAI: true })}>Needs AI</Button>
                  <Button variant={intake.needsAI === false ? "default" : "outline"} onClick={() => setIntake({ ...intake, needsAI: false })}>Workflow / Analytics / Search</Button>
                </div>
              </div>

              {/* Agent necessity */}
              {intake.needsAI && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Does the task require reasoning, ambiguity handling, or multi-step planning?
                  </label>
                  <div className="flex gap-3">
                    <Button variant={intake.needsAgent === true ? "default" : "outline"} onClick={() => setIntake({ ...intake, needsAgent: true })}>Yes — consider agents</Button>
                    <Button variant={intake.needsAgent === false ? "default" : "outline"} onClick={() => setIntake({ ...intake, needsAgent: false })}>No — RAG or Copilot extension</Button>
                  </div>
                </div>
              )}

              {/* BXT Score */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">BXT Assessment (Business × Experience × Technology)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(["business", "experience", "technology"] as const).map((dim) => (
                    <div key={dim} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium">{dim === "business" ? "Business Viability" : dim === "experience" ? "Experience Desirability" : "Tech Feasibility"}</span>
                        <span className="font-bold">{bxt[dim]}/5</span>
                      </div>
                      <input
                        type="range" min={1} max={5} value={bxt[dim]}
                        onChange={(e) => setBxt({ ...bxt, [dim]: parseInt(e.target.value) })}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Low</span><span>High</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`mt-4 px-4 py-2 rounded-lg border text-center font-medium ${bxtColor}`}>
                  BXT Score: {bxtTotal}/15 → <span className="font-bold">{bxtCategory}</span>
                  {bxtCategory === "Accelerate" && " to MVP"}
                  {bxtCategory === "Research" && " / Defer"}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setLayer("classify")} disabled={!intake.outcome}>
                  Continue to Classification <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Layer 2: Classify */}
        {layer === "classify" && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Layer 2 — What kind of solution is it?
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">Select the category that best describes the primary need.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {useCaseOptions.map((uc) => (
                  <button
                    key={uc.id}
                    onClick={() => {
                      setSelectedUseCase(uc.id);
                      if (needsRefinement.includes(uc.id)) {
                        setLayer("refine");
                      } else {
                        setLayer("recommend");
                      }
                    }}
                    className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-md hover:border-primary/50 ${selectedUseCase === uc.id ? "border-primary bg-primary/5" : "border-gray-100"}`}
                  >
                    <div className="flex items-center gap-2 mb-2 text-gray-700">
                      {uc.icon}
                      <span className="font-semibold text-sm">{uc.label}</span>
                    </div>
                    <p className="text-xs text-gray-500">{uc.description}</p>
                  </button>
                ))}
              </div>
              <div className="pt-6 flex justify-between">
                <Button variant="outline" onClick={() => setLayer("intake")}>← Back</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Layer 2b: Refine — Data source selection */}
        {layer === "refine" && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-violet-500" />
                Where does the knowledge live?
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                The right tool depends on where your data is. Select the primary source.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dataSourceOptions.map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => { setSelectedDataSource(ds.id); setLayer("recommend"); }}
                    className={`text-left p-5 rounded-xl border-2 transition-all hover:shadow-md hover:border-primary/50 ${selectedDataSource === ds.id ? "border-primary bg-primary/5" : "border-gray-100"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{ds.icon}</span>
                      <span className="font-semibold text-sm text-gray-900">{ds.label}</span>
                    </div>
                    <p className="text-xs text-gray-500">{ds.description}</p>
                  </button>
                ))}
              </div>
              <div className="pt-6 flex justify-between">
                <Button variant="outline" onClick={() => { setLayer("classify"); setSelectedDataSource(null); }}>← Back</Button>
                <Button variant="outline" onClick={() => { setSelectedDataSource(null); setLayer("recommend"); }}>
                  Skip — use general recommendation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Layer 3: Recommendation */}
        {layer === "recommend" && recommendation && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-500" />
                Layer 3 — Which Microsoft pattern fits?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary recommendation */}
              <div className="p-6 bg-gradient-to-r from-primary/5 to-purple-50 rounded-xl border border-primary/20">
                <div className="text-sm text-gray-500 mb-1">Recommended Primary Platform</div>
                <div className="text-2xl font-bold text-gray-900">{recommendation.primary}</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {recommendation.supporting.map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailCard title="Implementation Pattern" value={recommendation.pattern} />
                <DetailCard title="Experience Model" value={recommendation.experienceModel} />
                <DetailCard title="Adopt / Extend / Build" value={recommendation.adoptExtendBuild} />
                <DetailCard title="Action Safety" value={recommendation.actionSafety} />
                <DetailCard title="Governance" value={recommendation.governance} />
                <DetailCard title="Suggested Demo Path" value={recommendation.demoPath} />
              </div>

              {/* BXT reminder */}
              <div className={`px-4 py-3 rounded-lg border ${bxtColor}`}>
                <span className="text-sm">Readiness: <strong>{bxtCategory}</strong> (BXT {bxtTotal}/15)</span>
                {intake.outcome && <span className="text-sm ml-4">| Outcome: &ldquo;{intake.outcome}&rdquo;</span>}
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setLayer("classify")}>← Back</Button>
                <Button onClick={() => setLayer("results")}>
                  See Full Results & Patterns <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {layer === "results" && (
          <div className="space-y-8">
            {/* Summary card */}
            {recommendation && (
              <Card className="max-w-4xl mx-auto border-primary/20">
                <CardHeader>
                  <CardTitle>Your Recommendation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-blue-50">
                      <div className="text-sm text-gray-500">Primary Platform</div>
                      <div className="font-bold text-gray-900 mt-1">{recommendation.primary}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50">
                      <div className="text-sm text-gray-500">Pattern</div>
                      <div className="font-bold text-gray-900 mt-1">{recommendation.pattern}</div>
                    </div>
                    <div className={`p-4 rounded-lg ${bxtColor}`}>
                      <div className="text-sm">Readiness</div>
                      <div className="font-bold mt-1">{bxtCategory} ({bxtTotal}/15)</div>
                    </div>
                  </div>
                  {intake.outcome && (
                    <p className="text-sm text-gray-600 text-center pt-2">
                      Outcome: &ldquo;{intake.outcome}&rdquo;
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Agent Necessity Checkpoint */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Agent Necessity Checkpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <CheckpointItem label="Structured & predictable task" recommendation="Deterministic workflow / business rules" applicable={!intake.needsAI} />
                  <CheckpointItem label="Reporting, trends, insight" recommendation="Microsoft Fabric + Power BI" applicable={!intake.needsAI} />
                  <CheckpointItem label="Static knowledge retrieval" recommendation="Search / RAG before agents" applicable={intake.needsAI === true && !intake.needsAgent} />
                  <CheckpointItem label="Reasoning, ambiguity, multi-step" recommendation="Consider AI agents" applicable={intake.needsAgent === true} />
                </div>
              </CardContent>
            </Card>

            {/* Solution Patterns Library */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Solution Patterns Library</CardTitle>
                <p className="text-sm text-gray-500">Most meaningful use cases combine multiple capabilities.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solutionPatterns.map((p) => (
                    <div key={p.name} className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition">
                      <div className="font-medium text-sm text-gray-900">{p.name}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.capabilities.map((c) => (
                          <Badge key={c} className={`text-xs ${p.color}`}>{c}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Framework Reference */}
            <div className="max-w-4xl mx-auto text-center text-sm text-gray-400 pt-4">
              Methodology inspired by the{" "}
              <a href="https://microsoft.github.io/Microsoft-AI-Decision-Framework/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                Microsoft AI Decision Framework
              </a>
              . Start simple, scale smart.
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={reset} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Start Over
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}

// --- Helpers ---

const layers: Layer[] = ["intake", "classify", "refine", "recommend", "results"];

function DetailCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border border-gray-100 bg-white">
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="text-sm font-medium text-gray-800">{value}</div>
    </div>
  );
}

function CheckpointItem({ label, recommendation, applicable }: { label: string; recommendation: string; applicable: boolean | null }) {
  return (
    <div className={`p-3 rounded-lg border text-sm ${applicable ? "border-green-200 bg-green-50" : "border-gray-100 bg-gray-50"}`}>
      <div className="font-medium text-gray-700">{label}</div>
      <div className="text-gray-500 mt-0.5">→ {recommendation}</div>
      {applicable && <Badge className="mt-1 bg-green-100 text-green-700 text-xs">Relevant for your case</Badge>}
    </div>
  );
}
