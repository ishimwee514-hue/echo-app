export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-10">
      <h1 className="text-4xl font-bold text-amber-400 mb-4">The Legacy of Solomon</h1>
      <p className="text-neutral-300 text-lg">
        When we hear the name Solomon, our minds immediately jump to wealth and wisdom. 
        But the true legacy of King Solomon extends far beyond the biblical narratives. 
        He was a master diplomat, a prolific writer, and the architect of the First Temple.
      </p>
    </main>
  );
}