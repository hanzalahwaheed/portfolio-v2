"use client"
import React, { useState, useEffect } from "react"

import { Star, ArrowRight, Quote } from "lucide-react"

type Book = {
  id: number
  category: string
  title: string
  subtitle: string
  author: string
  cover: string
  color: string
  quote: string
  rating: number
  link: string
}

const library: Book[] = [
  {
    id: 1,
    category: "Non-Fiction",
    title: "Sapiens",
    subtitle: "A Brief History",
    author: "Yuval Noah Harari",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop",
    color: "from-orange-900/40 to-black",
    quote:
      "The real difference between us and chimpanzees is the mysterious glue that enables millions of humans to cooperate effectively.",
    rating: 5,
    link: "#",
  },
  {
    id: 2,
    category: "Non-Fiction",
    title: "The Design of Everyday Things",
    subtitle: "",
    author: "Don Norman",
    cover: "https://images.unsplash.com/photo-1585776245991-cf79dd40a2f7?q=80&w=2682&auto=format&fit=crop",
    color: "from-red-900/40 to-black",
    quote: "Good design is actually a lot harder to notice than poor design.",
    rating: 4.9,
    link: "#",
  },
  {
    id: 3,
    category: "Non-Fiction",
    title: "Atomic Habits",
    subtitle: "An Easy & Proven Way",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2574&auto=format&fit=crop",
    color: "from-blue-900/40 to-black",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    rating: 4.8,
    link: "#",
  },
  {
    id: 4,
    category: "Non-Fiction",
    title: "Thinking, Fast and Slow",
    subtitle: "",
    author: "Daniel Kahneman",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2698&auto=format&fit=crop",
    color: "from-emerald-900/40 to-black",
    quote: "Nothing in life is as important as you think it is, while you are thinking about it.",
    rating: 4.7,
    link: "#",
  },
  {
    id: 5,
    category: "Tech",
    title: "Clean Code",
    subtitle: "A Handbook of",
    author: "Robert C. Martin",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2612&auto=format&fit=crop",
    color: "from-cyan-900/40 to-black",
    quote:
      "Clean code is not written by following a set of rules. You don't become a software craftsman by learning a list of heuristics.",
    rating: 4.9,
    link: "#",
  },
  {
    id: 6,
    category: "Tech",
    title: "The Pragmatic Programmer",
    subtitle: "Your Journey to Mastery",
    author: "Andrew Hunt & David Thomas",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop",
    color: "from-purple-900/40 to-black",
    quote: "Think! About your work. Turn off the autopilot and take control.",
    rating: 5,
    link: "#",
  },
  {
    id: 7,
    category: "Tech",
    title: "Designing Data-Intensive Applications",
    subtitle: "The Big Ideas Behind",
    author: "Martin Kleppmann",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2574&auto=format&fit=crop",
    color: "from-indigo-900/40 to-black",
    quote: "The best architectures, requirements, and designs emerge from self-organizing teams.",
    rating: 4.8,
    link: "#",
  },
  {
    id: 8,
    category: "Tech",
    title: "System Design Interview",
    subtitle: "An Insider's Guide",
    author: "Alex Xu",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2698&auto=format&fit=crop",
    color: "from-teal-900/40 to-black",
    quote: "System design is about making trade-offs and balancing various constraints.",
    rating: 4.6,
    link: "#",
  },
  {
    id: 9,
    category: "Fiction",
    title: "1984",
    subtitle: "",
    author: "George Orwell",
    cover: "https://images.unsplash.com/photo-1585776245991-cf79dd40a2f7?q=80&w=2682&auto=format&fit=crop",
    color: "from-stone-800/40 to-black",
    quote: "War is peace. Freedom is slavery. Ignorance is strength.",
    rating: 5,
    link: "#",
  },
  {
    id: 10,
    category: "Fiction",
    title: "The Great Gatsby",
    subtitle: "",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop",
    color: "from-amber-900/40 to-black",
    quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
    rating: 4.7,
    link: "#",
  },
  {
    id: 11,
    category: "Fiction",
    title: "Dune",
    subtitle: "",
    author: "Frank Herbert",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2612&auto=format&fit=crop",
    color: "from-yellow-900/40 to-black",
    quote: "Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
    rating: 4.9,
    link: "#",
  },
  {
    id: 12,
    category: "Fiction",
    title: "The Name of the Wind",
    subtitle: "The Kingkiller Chronicle",
    author: "Patrick Rothfuss",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2574&auto=format&fit=crop",
    color: "from-rose-900/40 to-black",
    quote: "Words are pale shadows of forgotten names. As names have power, words have power.",
    rating: 4.8,
    link: "#",
  },
]

const categories = ["All", "Non-Fiction", "Tech", "Fiction"]

const Bookery = () => {
  const [activeBook, setActiveBook] = useState<Book>(library[0])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredLibrary =
    selectedCategory === "All" ? library : library.filter(book => book.category === selectedCategory)

  const handleBookChange = (book: Book) => {
    if (activeBook.id === book.id) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveBook(book)
      setIsTransitioning(false)
    }, 300) // Wait for fade out
  }

  // Update active book when category changes
  useEffect(() => {
    if (filteredLibrary.length > 0 && !filteredLibrary.some(book => book.id === activeBook.id)) {
      setActiveBook(filteredLibrary[0])
    }
  }, [selectedCategory, filteredLibrary, activeBook.id])

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#061113] font-sans text-white selection:bg-white/20 selection:text-white md:flex-row">
      {/* --- Ambient Background Layer --- */}
      {/* This creates the mood lighting based on the book cover */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-br ${activeBook.color} via-[#061113] to-[#0D1B21] opacity-40 transition-colors duration-1000 ease-in-out`}
      />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-overlay"></div>

      {/* --- LEFT: The Collection List --- */}
      <div className="relative z-10 flex h-full w-full flex-col border-r border-[#1E383C]/50 bg-[#0D1B21]/40 p-8 backdrop-blur-sm md:w-5/12 md:p-16">
        <header className="mb-8">
          <h2 className="bg-gradient-to-b from-white to-white/60 bg-clip-text font-serif text-4xl tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] md:text-5xl">
            Bookery
          </h2>
          <p className="mt-4 max-w-md text-neutral-500">
            I LOVE reading. Here are some of my favorite books.
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${selectedCategory === category
                ? "border-[#66acb6] bg-[#66acb6]/20 text-[#66acb6]"
                : "border-[#1E383C] bg-transparent text-neutral-500 hover:border-[#66acb6]/50 hover:text-neutral-300"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <nav className="scrollbar-hide flex-1 overflow-y-auto pr-4">
          <ul className="space-y-6">
            {filteredLibrary.map(book => (
              <li key={book.id} className="group cursor-pointer" onClick={() => handleBookChange(book)}>
                <div
                  className={`flex items-baseline gap-4 transition-all duration-300 ${activeBook.id === book.id ? "translate-x-4" : "hover:translate-x-2"
                    }`}
                >
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${activeBook.id === book.id ? "text-white" : "text-neutral-600 group-hover:text-neutral-400"
                      }`}
                  >
                    {String(book.id).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={`font-serif text-3xl leading-none transition-all duration-300 md:text-4xl ${activeBook.id === book.id ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                    >
                      {book.title}
                    </span>
                    {book.subtitle && (
                      <span
                        className={`mt-1 text-xs tracking-wider uppercase transition-all duration-300 ${activeBook.id === book.id ? "text-neutral-400 opacity-100" : "h-0 overflow-hidden opacity-0"
                          }`}
                      >
                        {book.subtitle}
                      </span>
                    )}
                    <span
                      className={`mt-1 text-xs tracking-wider uppercase transition-all duration-300 ${activeBook.id === book.id ? "text-neutral-400 opacity-100" : "h-0 overflow-hidden opacity-0"
                        }`}
                    >
                      {book.author}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="mt-8 font-mono text-xs text-[#1E383C]">
          <p>SELECT A TITLE TO VIEW</p>
        </footer>
      </div>

      {/* --- RIGHT: The Stage (Visualization) --- */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 md:w-7/12 md:p-16">
        {/* Book Container */}
        <div
          className={`relative transform transition-all duration-500 ease-out ${isTransitioning ? "translate-y-4 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
            }`}
        >
          {/* Floating Effect Wrapper */}
          <div className="animate-float relative">
            {/* The Book Cover */}
            <div className="group perspective-1000 relative z-20 aspect-[2/3] w-[260px] rounded-sm shadow-2xl md:w-[320px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeBook.cover}
                alt={activeBook.title}
                className="h-full w-full rounded-sm border border-white/10 object-cover shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
              />

              {/* Glossy Reflection overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              {/* Spine hint on left */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>

            {/* Reflection on 'floor' */}
            <div className="mask-linear-fade absolute right-0 -bottom-4 left-0 z-10 h-full origin-bottom scale-y-[-1] transform opacity-20 blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeBook.cover} className="h-full w-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061113] via-[#061113]/80 to-transparent"></div>
            </div>
          </div>

          {/* Book Metadata Overlay */}
          <div className="absolute -right-4 bottom-12 z-30 max-w-xs md:-right-12 md:bottom-20">
            <div className="rounded-xl border border-[#1E383C] bg-[#0D1B21]/80 p-6 shadow-xl backdrop-blur-md">
              <Quote size={20} className="mb-3 text-[#66acb6]" />
              <p className="mb-4 font-serif text-lg leading-relaxed text-white italic">
                &ldquo;{activeBook.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between border-t border-[#1E383C] pt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(activeBook.rating) ? "fill-[#66acb6] text-[#66acb6]" : "text-[#1E383C]"}
                    />
                  ))}
                </div>
                <a
                  href={activeBook.link}
                  className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#66acb6] uppercase transition-colors hover:text-[#4fe0d0]"
                >
                  Details <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Category Label (floating in background) */}
        <div
          className={`absolute top-12 right-12 transition-opacity duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"
            }`}
        >
          <span className="pointer-events-none font-serif text-[10rem] leading-none text-white/5 select-none">
            {activeBook.category.charAt(0)}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .mask-linear-fade {
          mask-image: linear-gradient(to top, transparent, black);
          -webkit-mask-image: linear-gradient(to top, transparent, black);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Bookery
