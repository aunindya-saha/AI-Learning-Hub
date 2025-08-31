---
applyTo: 'You are my project generator and code editor.

Goal:
Create a single-page “AI Learning Hub” website that helps me learn:
- Python foundations
- NumPy + Pandas
- TensorFlow/Keras (deep learning)
- Generative AI (Transformers, Diffusion)
- Explainable AI (SHAP, LIME, IG)
- Agentic AI with LangChain + LangGraph

Requirements:
- Use React + Vite + Tailwind + shadcn/ui + lucide-react + framer-motion.
- Create a single file component named src/LearningHub.jsx (I will paste it).
- Create src/main.jsx and index.html, configure Tailwind, and set up shadcn/ui.
- Provide npm scripts and a minimal README with run steps.
- The app shows tabs: Roadmap, Topics, Timeline, Practice, Projects, Copilot Tips.
- Style: modern, clean, rounded-2xl, soft shadows, good spacing.

Deliverables:
1) File tree for a fresh Vite project.
2) Commands to initialize and run (npm init, install deps, tailwind config, postcss, shadcn).
3) Implement scaffolding and import LearningHub.jsx as default route.
4) Fix any import paths for shadcn/ui so it builds the first time.
5) After scaffolding, stop and wait for me to paste my LearningHub.jsx file.

Then, when I paste LearningHub.jsx, add any missing shadcn components and make sure it renders with no TypeScript or ESLint errors. If something fails, propose a minimal fix.

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChevronRight, BookOpen, Link as LinkIcon, Calendar, Code, Sparkles, Search } from "lucide-react";
import { motion } from "framer-motion";

// ---------------------------
// Data model
// ---------------------------
const RESOURCES = {
  topics: [
    {
      id: "python",
      title: "Python Foundations",
      summary: "Syntax, functions, OOP, virtualenv, testing.",
      tags: ["beginner", "python"],
      links: [
        { label: "Python Docs", url: "https://docs.python.org/3/" },
        { label: "Real Python", url: "https://realpython.com/" },
        { label: "pytest", url: "https://docs.pytest.org/" }
      ],
      practice: [
        { label: "Exercism Python", url: "https://exercism.org/tracks/python" },
        { label: "LeetCode", url: "https://leetcode.com" }
      ]
    },
    {
      id: "numpy-pandas",
      title: "Numerical & Data Tools (NumPy, Pandas)",
      summary: "Arrays, vectorization, indexing, groupby, joins, time series.",
      tags: ["data", "numpy", "pandas"],
      links: [
        { label: "NumPy User Guide", url: "https://numpy.org/doc/stable/user/" },
        { label: "Pandas Docs", url: "https://pandas.pydata.org/docs/" },
        { label: "Pandas Cookbook", url: "https://pandas.pydata.org/docs/user_guide/cookbook.html" }
      ],
      practice: [
        { label: "Kaggle Notebooks", url: "https://www.kaggle.com/code" },
        { label: "DataCamp Datasets", url: "https://www.datacamp.com/datasets" }
      ]
    },
    {
      id: "tensorflow",
      title: "TensorFlow & Keras",
      summary: "Tensors, layers, training loops, callbacks, TFDS, serving.",
      tags: ["dl", "tensorflow"],
      links: [
        { label: "TensorFlow Guides", url: "https://www.tensorflow.org/guide" },
        { label: "Keras Docs", url: "https://keras.io/" },
        { label: "TF Model Garden", url: "https://github.com/tensorflow/models" }
      ],
      practice: [
        { label: "Google Colab", url: "https://colab.research.google.com/" },
        { label: "TF Playground", url: "https://playground.tensorflow.org" }
      ]
    },
    {
      id: "pytorch",
      title: "PyTorch (optional but useful)",
      summary: "Autograd, nn.Module, optimizers, dataloaders.",
      tags: ["dl", "pytorch"],
      links: [
        { label: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" }
      ],
      practice: [
        { label: "Kaggle GPU Notebooks", url: "https://www.kaggle.com/code" }
      ]
    },
    {
      id: "deep-learning",
      title: "Deep Learning Essentials",
      summary: "CNNs, RNNs/Transformers, regularization, optimization.",
      tags: ["dl", "theory"],
      links: [
        { label: "Dive into DL", url: "https://d2l.ai/" },
        { label: "CS231n", url: "http://cs231n.stanford.edu/" },
        { label: "The Illustrated Transformer", url: "http://jalammar.github.io/illustrated-transformer/" }
      ],
      practice: [
        { label: "Papers With Code", url: "https://paperswithcode.com/" }
      ]
    },
    {
      id: "genai",
      title: "Generative AI",
      summary: "Diffusion, VAEs, LLMs, prompt engineering, fine-tuning.",
      tags: ["genai", "llm"],
      links: [
        { label: "Hugging Face Course", url: "https://huggingface.co/learn" },
        { label: "Transformers Docs", url: "https://huggingface.co/docs/transformers/index" },
        { label: "Diffusers Docs", url: "https://huggingface.co/docs/diffusers/index" }
      ],
      practice: [
        { label: "HF Spaces", url: "https://huggingface.co/spaces" },
        { label: "Kaggle Models", url: "https://www.kaggle.com/models" }
      ]
    },
    {
      id: "xai",
      title: "Explainable AI",
      summary: "SHAP, LIME, Integrated Gradients, saliency maps.",
      tags: ["xai"],
      links: [
        { label: "SHAP Docs", url: "https://shap.readthedocs.io/" },
        { label: "LIME GitHub", url: "https://github.com/marcotcr/lime" },
        { label: "Captum (PyTorch)", url: "https://captum.ai/" }
      ],
      practice: [
        { label: "SHAP Examples", url: "https://github.com/shap/shap/tree/master/notebooks" }
      ]
    },
    {
      id: "agents",
      title: "Agentic AI",
      summary: "Planning, tools, memory, evaluation, safety.",
      tags: ["agents"],
      links: [
        { label: "LangGraph Docs", url: "https://python.langchain.com/docs/langgraph" },
        { label: "OpenAI Eval Guides", url: "https://platform.openai.com/docs/guides/evals" }
      ],
      practice: [
        { label: "OpenRouter Playground", url: "https://openrouter.ai/playground" }
      ]
    },
    {
      id: "langchain",
      title: "LangChain",
      summary: "Chains, retrievers, memory, tools, agents.",
      tags: ["llm", "langchain"],
      links: [
        { label: "LangChain Docs", url: "https://python.langchain.com/docs/" },
        { label: "LangServe", url: "https://python.langchain.com/docs/langserve" }
      ],
      practice: [
        { label: "LangChain Templates", url: "https://github.com/langchain-ai/langchain/tree/master/templates" }
      ]
    },
    {
      id: "langgraph",
      title: "LangGraph",
      summary: "Graph-based control flow for LLM apps.",
      tags: ["llm", "langgraph"],
      links: [
        { label: "LangGraph Intro", url: "https://python.langchain.com/docs/langgraph" }
      ],
      practice: [
        { label: "LangGraph Examples", url: "https://github.com/langchain-ai/langgraph" }
      ]
    }
  ],
  timelineWeeks: [
    { week: 1, title: "Setup & Python Essentials", goals: ["Install VS Code, Conda, Git", "Python syntax, functions", "Jupyter & virtualenv"], deliverable: "Solve 10 Exercism Python problems" },
    { week: 2, title: "NumPy", goals: ["Arrays, broadcasting", "Vectorization"], deliverable: "Rebuild 3 loops using vectorization" },
    { week: 3, title: "Pandas I", goals: ["Indexing, filtering", "GroupBy"], deliverable: "Mini EDA on a Kaggle dataset" },
    { week: 4, title: "Pandas II", goals: ["Merging, time series"], deliverable: "Data cleaning project with notebook" },
    { week: 5, title: "TensorFlow I", goals: ["Keras models", "Callbacks, metrics"], deliverable: "Train CNN on CIFAR-10" },
    { week: 6, title: "TensorFlow II", goals: ["Custom training loop", "TFRecords/TFDS"], deliverable: "Augment data + improve accuracy" },
    { week: 7, title: "DL Theory", goals: ["Optimization", "Regularization"], deliverable: "Report comparing schedulers" },
    { week: 8, title: "Generative AI I", goals: ["Transformers basics"], deliverable: "Run a small LLM locally or on Colab" },
    { week: 9, title: "Generative AI II", goals: ["Prompting, RAG"], deliverable: "RAG demo with your PDFs" },
    { week: 10, title: "LangChain & LangGraph", goals: ["Tools, memory, graphs"], deliverable: "Agent that calls a web API" },
    { week: 11, title: "Explainable AI", goals: ["SHAP/LIME", "IG/saliency for DL"], deliverable: "SHAP report for a model" },
    { week: 12, title: "Capstone", goals: ["Ship a small app"], deliverable: "Deploy a Streamlit or FastAPI demo" }
  ],
  practice: [
    { label: "Google Colab", desc: "Free GPU notebooks.", url: "https://colab.research.google.com/" },
    { label: "Kaggle", desc: "Datasets, kernels, competitions.", url: "https://www.kaggle.com/" },
    { label: "Hugging Face Spaces", desc: "Deploy ML demos.", url: "https://huggingface.co/spaces" },
    { label: "GitHub Codespaces", desc: "VS Code in the browser.", url: "https://github.com/features/codespaces" },
    { label: "Paperspace", desc: "Cloud GPUs (paid).", url: "https://www.paperspace.com/" }
  ],
  starterProjects: [
    { title: "MNIST from scratch (TF)", steps: ["Build a dense net", "Add early stopping", "Export SavedModel"], url: "https://www.tensorflow.org/tutorials/quickstart/beginner" },
    { title: "CIFAR-10 CNN (TF)", steps: ["Data aug", "BatchNorm + Dropout", "TensorBoard"], url: "https://www.tensorflow.org/tutorials/images/cnn" },
    { title: "Text RAG (LangChain)", steps: ["Load PDFs", "Embeddings + FAISS", "Retrieval chain"], url: "https://python.langchain.com/docs/tutorials/rag" },
    { title: "LangGraph Tool-Using Agent", steps: ["Define tools", "Graph nodes/edges", "Run"], url: "https://python.langchain.com/docs/langgraph" },
    { title: "SHAP on tabular model", steps: ["Train XGBoost", "TreeExplainer", "Force plot"], url: "https://shap.readthedocs.io/en/latest/example_notebooks/tabular_examples.html" }
  ]
};

// ---------------------------
// Components
// ---------------------------
const Pill = ({ children }) => (
  <Badge className="rounded-full px-3 py-1 text-xs">{children}</Badge>
);

const Section = ({ icon: Icon, title, children }) => (
  <Card className="border-none shadow-md rounded-2xl">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div>{children}</div>
    </CardContent>
  </Card>
);

const TopicCard = ({ topic }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
    <Card className="rounded-2xl shadow-sm hover:shadow-lg transition">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{topic.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{topic.summary}</p>
          </div>
          <div className="flex flex-wrap gap-1 justify-end min-w-[120px]">
            {topic.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-1"><BookOpen className="w-4 h-4" /> Learn</p>
            <ul className="space-y-2">
              {topic.links.map((l) => (
                <li key={l.url}>
                  <a className="inline-flex items-center gap-1 text-sm underline" href={l.url} target="_blank" rel="noreferrer">
                    <LinkIcon className="w-3.5 h-3.5" /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-1"><Code className="w-4 h-4" /> Practice</p>
            <ul className="space-y-2">
              {topic.practice.map((l) => (
                <li key={l.url}>
                  <a className="inline-flex items-center gap-1 text-sm underline" href={l.url} target="_blank" rel="noreferrer">
                    <LinkIcon className="w-3.5 h-3.5" /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Timeline = ({ items }) => (
  <div className="space-y-4">
    {items.map((w) => (
      <div key={w.week} className="grid grid-cols-12 gap-3 items-start">
        <div className="col-span-12 md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold"><Calendar className="w-4 h-4" /> Week {w.week}</div>
          <div className="text-sm text-muted-foreground">{w.title}</div>
        </div>
        <div className="col-span-12 md:col-span-7">
          <ul className="list-disc pl-5 text-sm space-y-1">
            {w.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="bg-muted rounded-xl p-3 text-sm">
            <div className="font-medium">Deliverable</div>
            <div className="text-muted-foreground">{w.deliverable}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const StarterProjects = ({ items }) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((p, idx) => (
      <AccordionItem key={idx} value={`item-${idx}`}>
        <AccordionTrigger className="text-left">{p.title}</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            {p.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <div className="mt-2">
            <a className="inline-flex items-center gap-1 text-sm underline" href={p.url} target="_blank" rel="noreferrer">
              <LinkIcon className="w-3.5 h-3.5" /> Reference
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default function LearningHub() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RESOURCES.topics;
    return RESOURCES.topics.filter(t =>
      [t.title, t.summary, ...(t.tags || [])].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold tracking-tight">
          AI Learning Hub
        </motion.h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          A single-page workspace to learn TensorFlow, deep learning, generative AI, explainable AI, agentic AI, LangChain, LangGraph, NumPy, and Pandas.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input className="pl-9" placeholder="Search topics, tags, or summaries" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button onClick={() => setQuery("")}>Clear</Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 space-y-8">
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tips">Copilot Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-4 mt-4">
            <Section icon={Sparkles} title="What you will learn">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Core Python + testing + environments</li>
                  <li>NumPy and Pandas for analysis</li>
                  <li>TensorFlow and Keras for deep learning</li>
                  <li>Generative AI with Transformers and Diffusion</li>
                </ul>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Explainable AI with SHAP/LIME and DL attributions</li>
                  <li>Agentic AI with LangChain and LangGraph</li>
                  <li>Shipping small apps and demos</li>
                  <li>Clear portfolio deliverables every week</li>
                </ul>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4 mt-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((t) => (
                <TopicCard key={t.id} topic={t} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 mt-4">
            <Section icon={Calendar} title="12-week plan with deliverables">
              <Timeline items={RESOURCES.timelineWeeks} />
            </Section>
          </TabsContent>

          <TabsContent value="practice" className="space-y-4 mt-4">
            <Section icon={Code} title="Where to write code and explore">
              <div className="grid md:grid-cols-2 gap-4">
                {RESOURCES.practice.map((p) => (
                  <Card key={p.url} className="rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{p.label}</div>
                          <div className="text-sm text-muted-foreground">{p.desc}</div>
                        </div>
                        <a className="inline-flex items-center gap-1 text-sm underline" href={p.url} target="_blank" rel="noreferrer">
                          <LinkIcon className="w-3.5 h-3.5" /> Open
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 mt-4">
            <Section icon={ChevronRight} title="Starter projects">
              <StarterProjects items={RESOURCES.starterProjects} />
            </Section>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4 mt-4">
            <Section icon={BookOpen} title="How to use Copilot well">
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Create a new empty folder and a README that states the app goal and features. Commit it. Copilot uses repo context.</li>
                <li>Use <strong>Copilot Chat</strong> in VS Code to generate a project plan first. Ask for a file tree and tech choices.</li>
                <li>Use <strong>Copilot Edits</strong> to create and refactor files. Give concrete instructions like "create src/App.jsx with a Tabs layout using shadcn/ui and Tailwind".</li>
                <li>Iterate in small steps. After each generation, run the app and fix issues before asking for more features.</li>
                <li>When something fails, paste the exact error and ask Copilot to propose a minimal fix with reasoning.</li>
              </ol>
            </Section>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-8 text-center text-xs text-muted-foreground">
        Built for focused, hands-on learning.
      </footer>
    </div>
  );
}


Wire this component as the default page and ensure all imports resolve. If shadcn/ui components are missing, generate them and update imports. Confirm Tailwind is working.

Also add:

A Notes tab with a Markdown editor.

A Progress tracker that stores completed weeks in localStorage.

A Resource importer to append custom links to any topic.

A Kanban board for tasks.

'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.