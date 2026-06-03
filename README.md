# Slachtofferhulp × Microsoft Workshop App

A premium, executive-ready workshop microsite for Slachtofferhulp Nederland, showcasing how to choose and combine Microsoft ecosystem capabilities for victim support use cases.

## Run Instructions

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How the Microsoft AI Decision Framework Was Translated

The decision tree is the app's centerpiece, implementing a 3-layer wizard based on the [Microsoft AI Decision Framework](https://microsoft.github.io/Microsoft-AI-Decision-Framework/):

1. **Layer 1 — "Should we do this?"** — Intake filter with outcome-first thinking, existing-tool check, AI/agent necessity checkpoint, and BXT (Business × Experience × Technology) scoring. Low BXT = Research/Defer, Medium = Incubate, High = Accelerate to MVP.

2. **Layer 2 — "What kind of solution?"** — Classifies the use case into 9 categories (case management, analytics, knowledge retrieval, document extraction, conversational assistant, custom agent, workflow automation, evaluation/safety, productivity infusion).

3. **Layer 3 — "Which Microsoft pattern fits?"** — Returns a recommendation with primary platform, supporting services, implementation pattern, experience model, adopt/extend/build guidance, governance notes, action safety requirement, and suggested demo path.

## Decision Tree Outputs & Workshop Flow

After completing the wizard, participants see:
- **Primary platform** recommendation tailored to their need
- **Implementation pattern** (e.g., "Case intelligence pattern", "Foundry grounded agent pattern")
- **Agent Necessity Checkpoint** — validates whether agents are needed or simpler approaches suffice
- **Solution Patterns Library** — 8 composable patterns showing how capabilities combine
- **BXT readiness score** — guides whether to research, incubate, or accelerate

## Main Design Choices

- **Three-layer progressive disclosure** prevents overwhelm — each step adds specificity
- **BXT scoring** gives workshop participants a tangible, shareable assessment
- **Roadmap with localStorage** makes the app a living workshop artifact participants take away
- **Priority formula** (Impact × Confidence / Effort) gamifies initiative ranking
- **Solution patterns** emphasize complementarity — capabilities combine, not compete

## Stack

- Next.js 16 + React + TypeScript
- Tailwind CSS + shadcn/ui components
- Lucide icons
- Browser localStorage (no backend)
- Fully static, deployable anywhere

---

_Previously bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)._

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
