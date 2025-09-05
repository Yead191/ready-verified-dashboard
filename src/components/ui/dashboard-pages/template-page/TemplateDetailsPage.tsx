"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  Typography,
  Button,
  Space,
  Descriptions,
  Tag,
  message,
  Modal,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Template } from "@/data/template";
import EditTemplateForm from "./EditTemplateForm";


const { Title } = Typography;

// Mock data - in real app, this would come from API
const mockTemplate: Template = {
  id: "1",
  name: "Professional Resume",
  type: "CV",
  date: "11/7/24",
  status: "Active",
  fileName: "professional-resume.pdf",
  fileSize: "2.5 MB",
  createdAt: new Date("2024-11-07"),
  description:
    "A professional resume template designed for corporate positions with clean layout and modern typography.",
  tags: ["Professional", "Corporate", "Modern"],
};

export default function TemplateDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [template, setTemplate] = useState<Template | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTemplate(mockTemplate);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values: Partial<Template>) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTemplate((prev) => (prev ? { ...prev, ...values } : null));
      setEditModalVisible(false);
      message.success("Template updated successfully!");
    } catch (error) {
      message.error("Failed to update template. Please try again.");
    }
  };

  const handleDownload = () => {
    message.info("Download functionality would be implemented here");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card loading />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <div className="text-center py-8">
            <Title level={3}>Template not found</Title>
            <Button onClick={() => router.push("/")}>Back to Templates</Button>
          </div>
        </Card>
      </div>
    );
  }

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
          <div className="flex justify-between items-start">
            <div>
              <Title level={2} className="!mb-2">
                {template.name}
              </Title>
              <Space>
                <Tag color={template.type === "CV" ? "blue" : "green"}>
                  {template.type}
                </Tag>
                <Tag color={template.status === "Active" ? "success" : "error"}>
                  {template.status}
                </Tag>
              </Space>
            </div>
            <Space>
              <Button icon={<DownloadOutlined />} onClick={handleDownload}>
                Download
              </Button>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Space>
          </div>
        </div>

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Template Name" span={2}>
            <Space>
              <FileTextOutlined className="text-blue-500" />
              {template.name}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Type">{template.type}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={template.status === "Active" ? "success" : "error"}>
              {template.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="File Name">
            {template.fileName}
          </Descriptions.Item>
          <Descriptions.Item label="File Size">
            {template.fileSize}
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            {template.date}
          </Descriptions.Item>
          <Descriptions.Item label="Last Modified">
            {template.date}
          </Descriptions.Item>
          {template.description && (
            <Descriptions.Item label="Description" span={2}>
              {template.description}
            </Descriptions.Item>
          )}
          {template.tags && template.tags.length > 0 && (
            <Descriptions.Item label="Tags" span={2}>
              <Space wrap>
                {template.tags.map((tag) => (
                  <Tag key={tag} color="blue">
                    {tag}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      <Modal
        title="Edit Template"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={600}
      >
        <EditTemplateForm
          template={template}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditModalVisible(false)}
        />
      </Modal>
    </div>
  );
}
