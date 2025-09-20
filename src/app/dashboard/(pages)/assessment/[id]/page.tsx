import AssessmentDetailsPage from "@/components/ui/dashboard-pages/assessment-page/assessment-details/AssessmentDetailsPage";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function page({ params }: PageProps) {
  const { id } = await params;
  return <AssessmentDetailsPage id={id} />;
}
