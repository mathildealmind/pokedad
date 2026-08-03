type InfoHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function InfoHero({
  eyebrow,
  title,
  description,
}: InfoHeroProps) {
  return (
    <header className="mb-10 text-center sm:mb-12">
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
          {eyebrow}
        </p>
      )}

      <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
        {description}
      </p>
    </header>
  );
}