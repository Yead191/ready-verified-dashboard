import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#F1F4F9] flex min-h-screen justify-center items-center">
      {children}
    </section>
  );
}
