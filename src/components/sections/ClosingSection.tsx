"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

interface TransformationStep {
  number: number;
  title: string;
  description: string;
}

const transformationSteps: TransformationStep[] = [
  {
    number: 1,
    title: "Case Data Foundation",
    description: "Start with Dynamics 365 Customer Service",
  },
  {
    number: 2,
    title: "Prove Value",
    description: "Demonstrate impact with Fabric analytics",
  },
  {
    number: 3,
    title: "Add Safe AI",
    description: "Deploy Microsoft Foundry agents and Copilot Studio",
  },
  {
    number: 4,
    title: "Validate & Measure",
    description: "Apply Responsible AI evaluations",
  },
  {
    number: 5,
    title: "Scale Productivity",
    description: "Integrate into Microsoft 365 workflows",
  },
];

export default function ClosingSection(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl space-y-12">
      <div>
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-2">
          {transformationSteps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="w-full flex-1 lg:w-auto">
                <div className="relative rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-md">
                  <div className="absolute -left-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                    {step.number}
                  </div>

                  <div className="absolute right-4 top-4 text-blue-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>

                  <div className="pr-8">
                    <h3 className="mb-2 text-base font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              </div>

              {index < transformationSteps.length - 1 ? (
                <>
                  <div className="hidden items-center justify-center lg:flex">
                    <ArrowRight className="h-6 w-6 flex-shrink-0 text-blue-400" />
                  </div>
                  <div className="my-2 flex items-center justify-center lg:hidden">
                    <ArrowRight className="h-6 w-6 rotate-90 transform text-blue-400" />
                  </div>
                </>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border-2 border-blue-300 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mb-6 flex justify-center">
          <Zap className="h-12 w-12 text-blue-600" />
        </div>

        <h3 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          Ready to begin the journey together?
        </h3>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
          Let&apos;s explore how Microsoft technology can empower Slachtofferhulp to scale victim
          support, strengthen outcomes, and build a safer future.
        </p>

        <div className="mb-8 flex flex-col items-center justify-center gap-3 border-b border-slate-200 pb-8 sm:flex-row">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">Slachtofferhulp</p>
            <p className="text-xs text-slate-500">Netherlands Victim Support</p>
          </div>
          <div className="text-slate-400">×</div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">Microsoft</p>
            <p className="text-xs text-slate-500">Enterprise Technology</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700">
            Schedule a Workshop
          </button>
          <button className="rounded-lg bg-slate-100 px-8 py-3 font-semibold text-slate-900 transition-colors duration-200 hover:bg-slate-200">
            Download Resources
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="mx-auto max-w-3xl text-sm text-slate-600">
          This transformation path is designed with victim safety, privacy, and organizational
          readiness at the forefront. Success requires thoughtful change management, staff
          training, and continuous evaluation of impact.
        </p>
      </div>
    </div>
  );
}
