"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type BackButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
};

const baseClassName =
  "relative z-10 inline-flex touch-manipulation items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:text-black hover:shadow-md";

export default function BackButton({
  href,
  children = "Tilbage",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const combinedClassName = `${baseClassName} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        <span aria-hidden="true">←</span>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={combinedClassName}
    >
      <span aria-hidden="true">←</span>
      <span>{children}</span>
    </button>
  );
}
