import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  icon?: string;
  children: ReactNode;
};

export default function InfoCard({
  title,
  icon,
  children,
}: InfoCardProps) {
  return (
    <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        {icon && (
          <span className="text-2xl">
            {icon}
          </span>
        )}

        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="space-y-4 leading-7 text-gray-700">
        {children}
      </div>
    </section>
  );
}