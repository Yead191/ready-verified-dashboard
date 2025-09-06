import TemplateDetailsPage from "@/components/ui/dashboard-pages/template-page/TemplateDetailsPage";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return <TemplateDetailsPage id={params.id} />;
}
