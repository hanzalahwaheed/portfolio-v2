"use client"

import { cn } from "@/lib/utils"

interface TechStackProps {
  className?: string
}

{
  /* bg-[#061113]" />
   bg-[#0D1B21]" />
bg-[#0E2128]" />
bg-[#16282F]" />
 bg-[#1E383C]" />
bg-[#1E383C]" */
}

const techCategories = {
  languages: {
    name: "Languages",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    items: ["TypeScript", "JavaScript", "Python", "C++"],
  },
  frontend: {
    name: "Frontend",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    items: ["React", "Next.js", "Tailwind CSS", "Zustand", "Tanstack", "Framer Motion", "Shadcn"],
  },
  backend: {
    name: "Backend & APIs",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    items: ["Node.js", "Express", "tRPC", "Drizzle ORM", "GraphQL"],
  },
  databases: {
    name: "Databases",
    color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    items: ["PostgreSQL", "MongoDB", "Redis", "PlanetScale", "Neon", "Supabase"],
  },
  appliedAi: {
    name: "AI & Applied Tech",
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    items: ["OpenAI", "Anthropic", "Vercel AI SDK", "LangChain", "LlamaIndex", "Hugging Face", "Pinecone"],
  },
  infra: {
    name: "Infra & Deployment",
    color: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    items: ["Vercel", "Stripe"],
  },
}

export function TechStack({ className }: TechStackProps) {
  const TechSection = ({ category }: { category: { name: string; color: string; items: string[] } }) => (
    <div className="space-y-4">
      <div className="mb-6 flex items-center gap-3">
        <div className={cn("h-3 w-3 rounded-full", category.color.split(" ")[0])} />
        <h3 className="text-foreground text-xl font-semibold">{category.name}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {category.items.map((item: string, itemIndex: number) => (
          <div
            key={item}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-105",
              category.color,
              "animate-float",
            )}
            style={{ animationDelay: `${itemIndex * 0.1}s` }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={cn("tech-grid-bg relative w-full overflow-hidden py-12", className)}>


      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(techCategories).map(([key, category]) => (
            <div key={key} className="space-y-4">
              <TechSection category={category} />
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
