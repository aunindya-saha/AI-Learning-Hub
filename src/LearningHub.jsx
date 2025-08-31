import React, { useMemo, useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
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
  <Card variant="glass" className="border-none shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{title}</h2>
      </div>
      <div>{children}</div>
    </CardContent>
  </Card>
);

const TopicCard = ({ topic, onRemove }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
    <Card variant="glass" className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-slate-700/50">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold leading-tight text-white">{topic.title}</h3>
              {topic.isCustom && <Badge className="bg-purple-600/80 text-purple-100 text-xs">Custom</Badge>}
            </div>
            <p className="text-sm text-gray-300 mt-1">{topic.summary}</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex flex-wrap gap-1 justify-end min-w-[120px]">
              {topic.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
            {topic.isCustom && onRemove && (
              <button 
                onClick={() => onRemove(topic.id, 'topics')}
                className="text-red-500 hover:text-red-700 ml-2 hover:scale-110 transition-transform"
                title="Remove custom content"
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-300"><BookOpen className="w-4 h-4 text-purple-400" /> Learn</p>
            <ul className="space-y-2">
              {topic.links.map((l, idx) => (
                <li key={idx}>
                  <a className="inline-flex items-center gap-1 text-sm underline text-purple-400 hover:text-purple-300 transition-colors" href={l.url} target="_blank" rel="noreferrer">
                    <LinkIcon className="w-3.5 h-3.5" /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-300"><Code className="w-4 h-4 text-purple-400" /> Practice</p>
            <ul className="space-y-2">
              {topic.practice.map((l, idx) => (
                <li key={idx}>
                  <a className="inline-flex items-center gap-1 text-sm underline text-purple-400 hover:text-purple-300 transition-colors" href={l.url} target="_blank" rel="noreferrer">
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
          <div className="flex items-center gap-2 text-sm font-semibold text-white"><Calendar className="w-4 h-4 text-purple-400" /> Week {w.week}</div>
          <div className="text-sm text-gray-300">{w.title}</div>
        </div>
        <div className="col-span-12 md:col-span-7">
          <ul className="list-disc pl-5 text-sm space-y-1 text-gray-300">
            {w.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-3 text-sm">
            <div className="font-medium text-white">Deliverable</div>
            <div className="text-gray-300">{w.deliverable}</div>
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
        <AccordionTrigger value={`item-${idx}`} className="text-left">{p.title}</AccordionTrigger>
        <AccordionContent value={`item-${idx}`}>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-300">
            {p.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <div className="mt-2">
            <a className="inline-flex items-center gap-1 text-sm underline text-purple-400 hover:text-purple-300" href={p.url} target="_blank" rel="noreferrer">
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
  const [customContent, setCustomContent] = useState(() => {
    // Load custom content from localStorage
    const saved = localStorage.getItem('ai-learning-hub-custom-content');
    return saved ? JSON.parse(saved) : { topics: [], resources: [], notes: "" };
  });
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [newContentForm, setNewContentForm] = useState({
    type: 'topic', // 'topic' or 'resource'
    title: '',
    summary: '',
    url: '',
    tags: ''
  });
  const [activeTab, setActiveTab] = useState("roadmap");

  // Save custom content to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('ai-learning-hub-custom-content', JSON.stringify(customContent));
  }, [customContent]);

  // Combine original topics with custom topics
  const allTopics = [...RESOURCES.topics, ...customContent.topics];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allTopics;
    return allTopics.filter(t =>
      [t.title, t.summary, ...(t.tags || [])].join(" ").toLowerCase().includes(q)
    );
  }, [query, allTopics]);

  const handleAddContent = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", newContentForm); // Debug log
    
    if (newContentForm.type === 'topic' && newContentForm.title && newContentForm.summary) {
      const newTopic = {
        id: `custom-${Date.now()}`,
        title: newContentForm.title,
        summary: newContentForm.summary,
        tags: newContentForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        links: newContentForm.url ? [{ label: "Custom Link", url: newContentForm.url }] : [],
        practice: [],
        isCustom: true
      };
      console.log("Adding new topic:", newTopic); // Debug log
      setCustomContent(prev => ({
        ...prev,
        topics: [...prev.topics, newTopic]
      }));
    } else if (newContentForm.type === 'resource' && newContentForm.title && newContentForm.url) {
      const newResource = {
        label: newContentForm.title,
        desc: newContentForm.summary || "Custom resource",
        url: newContentForm.url,
        isCustom: true
      };
      console.log("Adding new resource:", newResource); // Debug log
      setCustomContent(prev => ({
        ...prev,
        resources: [...prev.resources, newResource]
      }));
    }
    
    // Reset form
    setNewContentForm({
      type: 'topic',
      title: '',
      summary: '',
      url: '',
      tags: ''
    });
    setIsAddingContent(false);
    console.log("Form reset and modal closed"); // Debug log
  };

  const removeCustomContent = (id, type) => {
    setCustomContent(prev => ({
      ...prev,
      [type]: prev[type].filter(item => 
        type === 'topics' ? item.id !== id : item.label !== id
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* AI-themed animated background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-screen filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-screen filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-screen filter blur-xl animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-screen filter blur-xl animate-pulse animation-delay-1000"></div>
        {/* Neural network pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse animation-delay-3000"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        <header className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          AI Learning Hub
        </motion.h1>
        <p className="text-gray-300 mt-2 max-w-3xl">
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-2">
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-4 mt-4">
            <Section icon={Sparkles} title="What you will learn">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Learning Topics</h2>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    console.log("Add Content button clicked, switching to manage tab");
                    setIsAddingContent(true);
                    setActiveTab("manage");
                  }}
                  variant="gradient"
                  className="!bg-none"
                >
                  + Add Content
                </Button>
                <Button 
                  onClick={() => {
                    console.log("Debug: Current state", { isAddingContent, customContent, activeTab });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-xs"
                >
                  Debug
                </Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((t) => (
                <TopicCard key={t.id} topic={t} onRemove={removeCustomContent} />
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
                          <div className="font-medium text-white">{p.label}</div>
                          <div className="text-sm text-gray-300">{p.desc}</div>
                        </div>
                        <a className="inline-flex items-center gap-1 text-sm underline text-purple-400 hover:text-purple-300" href={p.url} target="_blank" rel="noreferrer">
                          <LinkIcon className="w-3.5 h-3.5" /> Open
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {/* Custom Resources */}
                {customContent.resources.map((p, idx) => (
                  <Card key={idx} className="rounded-xl border-purple-500/50 bg-slate-800/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium flex items-center gap-2 text-white">
                            {p.label}
                            <Badge className="bg-purple-600/80 text-purple-100 text-xs">Custom</Badge>
                          </div>
                          <div className="text-sm text-gray-300">{p.desc}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a className="inline-flex items-center gap-1 text-sm underline text-purple-400 hover:text-purple-300" href={p.url} target="_blank" rel="noreferrer">
                            <LinkIcon className="w-3.5 h-3.5" /> Open
                          </a>
                          <button 
                            onClick={() => removeCustomContent(p.label, 'resources')}
                            className="text-red-500 hover:text-red-700 text-sm"
                            title="Remove custom resource"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4 mt-4">
            <Section icon={Sparkles} title="Content Management">
              <div className="space-y-6">
                {!isAddingContent ? (
                  <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2 text-white">Add Your Custom Content</h3>
                    <p className="text-gray-300 mb-4">Add custom topics, resources, or notes that will persist between visits</p>
                    <Button 
                      onClick={() => setIsAddingContent(true)}
                      variant="gradient"
                    >
                      + Add New Content
                    </Button>
                  </div>
                ) : (
                  <Card className="border-purple-500/30 bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-white">Add New Content</h3>
                      <form onSubmit={handleAddContent} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-white">Content Type</label>
                          <select 
                            value={newContentForm.type}
                            onChange={(e) => setNewContentForm(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full border border-slate-600 bg-slate-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="topic">Learning Topic</option>
                            <option value="resource">Resource/Tool</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-white">Title</label>
                          <Input 
                            value={newContentForm.title}
                            onChange={(e) => setNewContentForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter title"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-white">Description/Summary</label>
                          <textarea 
                            value={newContentForm.summary}
                            onChange={(e) => setNewContentForm(prev => ({ ...prev, summary: e.target.value }))}
                            placeholder="Brief description"
                            className="w-full border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required={newContentForm.type === 'topic'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-white">URL (optional)</label>
                          <Input 
                            value={newContentForm.url}
                            onChange={(e) => setNewContentForm(prev => ({ ...prev, url: e.target.value }))}
                            placeholder="https://..."
                            type="url"
                          />
                        </div>
                        {newContentForm.type === 'topic' && (
                          <div>
                            <label className="block text-sm font-medium mb-1 text-white">Tags (comma-separated)</label>
                            <Input 
                              value={newContentForm.tags}
                              onChange={(e) => setNewContentForm(prev => ({ ...prev, tags: e.target.value }))}
                              placeholder="ai, ml, python, etc."
                            />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            Add Content
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => setIsAddingContent(false)}
                            className="bg-gray-500 hover:bg-gray-600"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Display existing custom content */}
                {(customContent.topics.length > 0 || customContent.resources.length > 0) && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Your Custom Content</h3>
                    
                    {customContent.topics.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium mb-2 text-purple-700">Custom Topics ({customContent.topics.length})</h4>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {customContent.topics.map((topic) => (
                            <div key={topic.id} className="p-3 border border-purple-500/50 rounded-lg bg-slate-800/80 backdrop-blur-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium text-white">{topic.title}</h5>
                                  <p className="text-sm text-gray-300">{topic.summary}</p>
                                  <div className="flex gap-1 mt-1">
                                    {topic.tags.map(tag => (
                                      <span key={tag} className="text-xs bg-purple-600/80 text-purple-100 px-2 py-1 rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <button 
                                  onClick={() => removeCustomContent(topic.id, 'topics')}
                                  className="text-red-500 hover:text-red-700"
                                  title="Remove"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {customContent.resources.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium mb-2 text-indigo-700">Custom Resources ({customContent.resources.length})</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {customContent.resources.map((resource, idx) => (
                            <div key={idx} className="p-3 border border-indigo-500/50 rounded-lg bg-slate-800/80 backdrop-blur-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium text-white">{resource.label}</h5>
                                  <p className="text-sm text-gray-300">{resource.desc}</p>
                                  <a href={resource.url} target="_blank" rel="noreferrer" className="text-sm text-purple-400 underline hover:text-purple-300">
                                    Visit Resource
                                  </a>
                                </div>
                                <button 
                                  onClick={() => removeCustomContent(resource.label, 'resources')}
                                  className="text-red-500 hover:text-red-700"
                                  title="Remove"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 mt-4">
            <Section icon={ChevronRight} title="Starter projects">
              <StarterProjects items={RESOURCES.starterProjects} />
            </Section>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6 mt-4">
            <Section icon={BookOpen} title="How to Use This AI Learning Platform">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Platform Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li><strong className="text-white">Structured Learning Path:</strong> Follow a 12-week roadmap from Python basics to advanced AI concepts</li>
                    <li><strong className="text-white">Interactive Topics:</strong> Each topic includes curated learning resources and practice platforms</li>
                    <li><strong className="text-white">Custom Content Management:</strong> Add your own topics, resources, and notes that persist locally</li>
                    <li><strong className="text-white">Progress Tracking:</strong> Timeline view with clear deliverables for each week</li>
                    <li><strong className="text-white">Practice Resources:</strong> Direct links to coding platforms, datasets, and interactive tools</li>
                    <li><strong className="text-white">Project Templates:</strong> Starter projects with step-by-step guides</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">How to Learn Effectively</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
                    <li><strong className="text-white">Start with the Roadmap:</strong> Review the 12-week learning plan to understand the progression</li>
                    <li><strong className="text-white">Follow the Timeline:</strong> Use the weekly structure with specific goals and deliverables</li>
                    <li><strong className="text-white">Hands-on Practice:</strong> Don't just read - code along with every tutorial and resource</li>
                    <li><strong className="text-white">Build Projects:</strong> Complete the suggested starter projects to reinforce learning</li>
                    <li><strong className="text-white">Use Practice Platforms:</strong> Regular coding on Kaggle, Colab, and other platforms</li>
                    <li><strong className="text-white">Add Custom Content:</strong> Personalize your learning by adding resources you discover</li>
                    <li><strong className="text-white">Track Progress:</strong> Document your learning journey and completed projects</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">AI Development Best Practices</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                    <li><strong className="text-white">Environment Setup:</strong> Use virtual environments (conda/venv) for each project</li>
                    <li><strong className="text-white">Version Control:</strong> Always use Git for your projects, even small experiments</li>
                    <li><strong className="text-white">Documentation:</strong> Write clear README files and comment your code</li>
                    <li><strong className="text-white">Experimentation:</strong> Keep a learning journal of what works and what doesn't</li>
                    <li><strong className="text-white">Community Engagement:</strong> Join AI communities, share your work, ask questions</li>
                    <li><strong className="text-white">Stay Updated:</strong> Follow AI research papers, blogs, and conferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Using GitHub Copilot Effectively</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
                    <li>Create descriptive file and function names - Copilot uses context</li>
                    <li>Write clear comments explaining your intent before coding</li>
                    <li>Use <strong className="text-white">Copilot Chat</strong> for architecture questions and debugging</li>
                    <li>Iterate in small steps, testing each suggestion before moving forward</li>
                    <li>Review and understand generated code - don't just accept everything</li>
                  </ol>
                </div>
              </div>
            </Section>

            <Section icon={Sparkles} title="About This Platform">
              <div className="space-y-4">
                <div className="bg-slate-800/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-3 text-white">Created by Aunindya Prosad Saha</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>I am a Computer Science & Engineering undergraduate student from <strong className="text-white">Military Institute of Science and Technology (MIST)</strong>. This platform was born out of my own journey to master AI and machine learning technologies.</p>
                    
                    <p>As someone navigating the vast landscape of AI education, I realized the need for a structured, comprehensive learning path that combines theory with hands-on practice. This platform represents my attempt to create the learning resource I wished existed when I started my AI journey.</p>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <LinkIcon className="w-4 h-4 text-purple-400" />
                      <a 
                        href="https://github.com/aunindya-saha" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors underline"
                      >
                        Connect with me on GitHub: @aunindya-saha
                      </a>
                    </div>
                    
                    <p className="text-sm text-gray-400 mt-4">
                      <em>Made with ❤️ for the AI learning community. Feel free to contribute, suggest improvements, or share your learning journey!</em>
                    </p>
                  </div>
                </div>
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-8 text-center text-xs text-gray-400 relative z-10">
        Built for focused, hands-on learning.
      </footer>
      </div>
    </div>
  );
}
