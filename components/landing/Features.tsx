import { Brain, FileText, Search } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "LLM Powered",
      description: "Ask natural language questions about your research papers.",
    },
    {
      icon: FileText,
      title: "PDF Upload",
      description: "Upload any academic paper and build your own knowledge base.",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Retrieve relevant information using vector embeddings.",
    },
  ];

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-8 py-24 md:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <Icon className="mb-6 h-10 w-10" />

            <h3 className="mb-3 text-2xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}