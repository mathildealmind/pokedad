import Link from "next/link";

type Props = {
  average?: number;
  count?: number;
  href?: string;
  className?: string;
};

export default function ReviewBadge({
  average,
  count,
  href,
  className = "",
}: Props) {
  const hasVerifiedReviews =
    typeof average === "number" &&
    Number.isFinite(average) &&
    typeof count === "number" &&
    Number.isInteger(count) &&
    count > 0;

  const reviewText = hasVerifiedReviews
    ? `${average.toLocaleString("da-DK", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })} · ${count.toLocaleString("da-DK")} anmeldelser`
    : "Ingen anmeldelser endnu";

  const content = (
    <>
      <span
        aria-hidden="true"
        className="shrink-0 tracking-[0.06em] text-amber-500"
      >
        {hasVerifiedReviews ? "★★★★★" : "☆☆☆☆☆"}
      </span>
      <span>{reviewText}</span>
    </>
  );

  const classes = `flex min-w-0 items-center gap-2 text-sm leading-6 text-gray-600 ${className}`;
  const accessibleLabel = hasVerifiedReviews
    ? `Kundevurdering: ${reviewText}`
    : reviewText;

  if (href && hasVerifiedReviews) {
    return (
      <Link
        href={href}
        aria-label={accessibleLabel}
        className={`${classes} transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div aria-label={accessibleLabel} className={classes}>
      {content}
    </div>
  );
}
