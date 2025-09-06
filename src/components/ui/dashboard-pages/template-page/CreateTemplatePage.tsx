"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, Space, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CreateTemplateForm from "./CreateTemplateForm";
import { useAddTemplateMutation } from "@/redux/feature/templateApi/templateApi";
import { toast } from "sonner";

const { Title } = Typography;

export default function CreateTemplatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addTemplate] = useAddTemplateMutation();
  const handleSubmit = (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("doc", values.file);
      formData.append("price", values.price);
      formData.append("type", values.type);
      formData.append("description", values.description);
      // Simulate API call
      toast.promise(addTemplate(formData).unwrap(), {
        loading: "Creating template...",
        success: (res) => {
          router.push("/templates");
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });
      // router.push("/");
    } catch (error) {
      message.error("Failed to create template. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/templates");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <div className="mb-6">
          <Space className="mb-4">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Space>
          <Title level={2} className="!mb-0">
            Create New Template
          </Title>
        </div>

        <CreateTemplateForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </Card>
    </div>
  );
}
