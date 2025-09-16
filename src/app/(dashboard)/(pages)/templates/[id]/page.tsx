import TemplateDetailsPage from "@/components/ui/dashboard-pages/template-page/TemplateDetailsPage";
import React from "react";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function page({ params }: PageProps) {
  const { id } = await params;
  return <TemplateDetailsPage id={id} />;
}
