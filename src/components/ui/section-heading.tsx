type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3 text-foreground" data-speed="0.9">
      <p className="text-xs uppercase tracking-[0.35em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base text-muted">{description}</p>
      ) : null}
    </div>
  );
}
