import type { ReactNode } from "react";

type InfoGroupLayoutProps = {
  children: ReactNode;
};

export default function InfoGroupLayout({
  children,
}: InfoGroupLayoutProps) {
  return <>{children}</>;
}