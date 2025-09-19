"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TemplateTable from "./TemplateTable";
import PageHeading from "@/components/shared/PageHeading";
import {
  useDeleteTemplateMutation,
  useGetTemplatesQuery,
} from "@/redux/feature/templateApi/templateApi";
import DeleteModal from "@/components/shared/DeleteModal";
import { toast } from "sonner";

export default function TemplatesPage() {
  const [page, setPage] = useState(1);

  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const { data: templateData, refetch } = useGetTemplatesQuery({
    page,
    limit: 10,
  });
  const [deleteTemplate] = useDeleteTemplateMutation();
  const templates = templateData?.data || [];
  const handleCreateTemplate = () => {
    router.push("/templates/create");
  };

  const paginationData = templateData?.pagination;

  const handleDeleteTemplate = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
    // setTemplates((prev) => prev.filter((template) => template.id !== id));
  };
  // console.log(deleteId);
  const handleViewTemplate = (id: string) => {
    router.push(`/templates/${id}`);
  };
  const handleConfirmDelete = () => {
    toast.promise(deleteTemplate(deleteId!).unwrap(), {
      loading: "Deleting template...",
      success: (res) => {
        refetch();
        setDeleteId(null);
        setDeleteModalOpen(false);
        return <b>{res.message}</b>;
      },
      error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <PageHeading label="Template" onClick={handleCreateTemplate} />

      <TemplateTable
        templates={templates}
        onDelete={handleDeleteTemplate}
        onView={handleViewTemplate}
        paginationData={paginationData}
        setPage={setPage}
        page={page}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        handleDelete={handleConfirmDelete}
      />
    </section>
  );
}
