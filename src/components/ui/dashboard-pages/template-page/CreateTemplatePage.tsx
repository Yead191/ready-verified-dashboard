"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, Space, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CreateTemplateForm from "./CreateTemplateForm";

const { Title } = Typography;

export default function CreateTemplatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      message.success("Template created successfully!");
      router.push("/");
    } catch (error) {
      message.error("Failed to create template. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
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
