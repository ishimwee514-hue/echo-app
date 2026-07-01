import { getStories } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 bg-linear-to-b from-neutral-900 to-neutral-950">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-r from-amber-200 to-amber-500">
          ECHO
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-8 font-light">
          Hear the whispers of the past. Legendary events, ancient heritage, and timeless philosophy.
        </p>
        <Link href="/category/heritage">
          <button className="px-8 py-3 bg-amber-500 text-neutral-950 font-semibold rounded-full hover:bg-amber-400 transition-all">
            Start Exploring
          </button>
        </Link>
      </section>

      {/* The 3 Pillars */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all">
          <h3 className="text-2xl font-bold mb-3 text-amber-400">Legendary Events</h3>
          <p className="text-neutral-400">The epic battles, the fallen empires, and the moments that changed the world forever.</p>
        </div>
        <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all">
          <h3 className="text-2xl font-bold mb-3 text-amber-400">Traditional Heritage</h3>
          <p className="text-neutral-400">The art, the rituals, and the cultural DNA passed down through generations.</p>
        </div>
        <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all">
          <h3 className="text-2xl font-bold mb-3 text-amber-400">Ancient Philosophy</h3>
          <p className="text-neutral-400">The deep thoughts of the ancients. Wisdom that still applies to your life today.</p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Lore</h2>
        <Link href="/stories/the-legacy-of-solomon" className="block group">
          <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 group-hover:border-amber-500/50 transition-all">
            <div className="h-64 bg-linear-to-br from-amber-900/40 to-neutral-900 flex items-center justify-center">
              <span className="text-6xl">👑</span>
            </div>
            <div className="p-8">
              <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Heritage & Philosophy</span>
              <h3 className="text-3xl font-bold mt-2 mb-4 group-hover:text-amber-400 transition-colors">The Legacy of Solomon</h3>
              <p className="text-neutral-400 text-lg">
                Beyond the wealth and the wisdom, who was the real King Solomon? Uncovering the history, the myths, and the profound philosophy of the man who built the First Temple.
              </p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}