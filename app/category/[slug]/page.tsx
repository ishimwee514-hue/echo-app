export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params for Next.js 16 compatibility
  const { slug } = await params;

  // Format the slug to look nice (e.g., "traditional-heritage" -> "Traditional Heritage")
  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-amber-400">
            {formattedTitle}
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Explore the stories, legends, and heritage of {formattedTitle.toLowerCase()}.
          </p>
        </header>

        {/* Stories Grid (Placeholder for now) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 hover:border-amber-500/50 transition-all">
            <h3 className="text-xl font-bold mb-2 text-amber-400">Coming Soon</h3>
            <p className="text-neutral-400">
              We are currently fetching stories from Sanity for this category. Check back soon!
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}