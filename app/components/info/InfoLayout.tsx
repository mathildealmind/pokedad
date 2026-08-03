import type { ReactNode } from "react";

type InfoLayoutProps = {
  children: ReactNode;
};

export default function InfoLayout({
  children,
}: InfoLayoutProps) {
  return (
    <main className="bg-gray-50">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        {children}
      </div>
    </main>
  );
}