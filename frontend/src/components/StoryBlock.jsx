export default function StoryBlock({ story }) {
  if (!story) return null;

  return (
    <section className="rounded-2xl bg-orange-950 p-5 text-orange-50">
      <h2 className="font-serif text-xl">From the cook</h2>
      <p className="mt-3 leading-relaxed">{story}</p>
    </section>
  );
}
