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
    items: ["Node.js", "Express", "tRPC", "Prisma", "GraphQL"],
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

  // const createFlowingBanner = () => {
  //   const allItems = Object.entries(techCategories).flatMap(([key, category]) =>
  //     category.items.slice(0, 2).map(item => ({ name: item, color: category.color })),
  //   )

  //   return allItems
  // }

  // const bannerItems = createFlowingBanner()

  return (
    <div className={cn("tech-grid-bg relative w-full overflow-hidden py-12", className)}>
      {/* <div className="mb-12 px-4 text-center">
        <h2 className="text-foreground mb-4 text-3xl font-bold text-balance">Tech Stack Showcase</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty">
          Explore the technologies powering modern web development, organized by category
        </p>
      </div> */}

      {/* <div className="group relative mb-12 overflow-hidden">
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent" />

        <div className="animate-scroll-left group-hover:pause flex gap-4 py-2 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, setIndex) =>
            bannerItems.map((item, index) => (
              <div
                key={`banner-${setIndex}-${index}`}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium opacity-60",
                  item.color,
                )}
              >
                {item.name}
              </div>
            )),
          )}
        </div>
      </div> */}

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(techCategories).map(([key, category]) => (
            <div key={key} className="space-y-4">
              <TechSection category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-16 px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h3 className="text-foreground mb-4 text-lg font-medium">Complete Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(techCategories).map(([key, category]) => (
              <div
                key={key}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                  category.color,
                )}
              >
                {category.name} ({category.items.length})
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}
