import { youtubeEmbedUrl } from "../lib/format";

export default function CreatorMonetisation({ recipe }) {
  const links = recipe.orderLinks || [];
  const embed = youtubeEmbedUrl(recipe.videoUrl);
  const hasCreator = recipe.creatorName || recipe.creatorLink;

  if (!links.length && !embed && !hasCreator) return null;

  return (
    <section className="rounded-2xl bg-white p-4">
      <h2 className="font-serif text-xl">Order from the creator</h2>
      {recipe.creatorName ? (
        <p className="mt-2 text-sm text-stone-600">{recipe.creatorName}</p>
      ) : null}
      {embed ? (
        <div className="mt-3 aspect-video overflow-hidden rounded-xl bg-stone-900">
          <iframe
            title={`${recipe.title} demo`}
            src={embed}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : recipe.videoUrl ? (
        <p className="mt-2 text-sm text-stone-500">Video could not be embedded.</p>
      ) : null}
      {links.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-orange-800 px-3 py-1.5 text-sm text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
      <p className="mt-3 text-xs text-stone-500">
        Ordering happens on the linked site. This app does not take payments.
      </p>
    </section>
  );
}
