"use client";

import { useState } from "react";
import { Button, Card, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { mockTemplates, Template } from "@/data/template";
import TemplateTable from "./TemplateTable";
import PageHeading from "@/components/shared/PageHeading";

const { Title } = Typography;

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);

  const handleCreateTemplate = () => {
    router.push("/templates/create");
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== id));
  };

  const handleViewTemplate = (id: string) => {
    router.push(`/templates/${id}`);
  };

  return (
    <section className="flex flex-col gap-4">
      <PageHeading label="Template" onClick={handleCreateTemplate} />

      <TemplateTable
        templates={templates}
        onDelete={handleDeleteTemplate}
        onView={handleViewTemplate}
      />
    </section>
  );
}
