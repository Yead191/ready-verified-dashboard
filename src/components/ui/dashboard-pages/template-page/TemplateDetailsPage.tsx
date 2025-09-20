"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import EditTemplateForm from "./EditTemplateForm";
import {
  useGetSingleTemplateQuery,
  useUpdateTemplateMutation,
} from "@/redux/feature/templateApi/templateApi";
import { imgUrl } from "@/app/dashboard/layout";
import { toast } from "sonner";

const { Title } = Typography;

export default function TemplateDetailsPage({ id }: { id: string }) {
  const router = useRouter();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const {
    data: singleTemplate,
    isLoading,
    refetch,
  } = useGetSingleTemplateQuery(id);
  const template = singleTemplate?.data;

  // update template
  const [updateTemplate] = useUpdateTemplateMutation();
  if (isLoading) {
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

  const handleEdit = () => setEditModalVisible(true);

  const handleEditSubmit = async (values: any) => {
    try {
      console.log(values);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("doc", values.file);
      formData.append("price", values.price);
      formData.append("type", values.type);
      formData.append("description", values.description);
      formData.append("status", values.status);
      toast.promise(updateTemplate({ id, data: formData }).unwrap(), {
        loading: "Updating template...",
        success: (res) => {
          refetch();
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });
      setEditModalVisible(false);
    } catch (error) {
      message.error("Failed to update template. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!template.file) return;
    const link = document.createElement("a");
    link.href = imgUrl + template.file;
    link.download = template.title + ".pdf";
    link.click();
    message.success("Download started");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
      <Card>
        <Space className="mb-4">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Space>

        <div className="flex justify-between items-start mb-6">
          <div>
            <Title level={2} className="!mb-2">
              {template.title}
            </Title>
            <Space>
              <Tag color="blue">{template.type || "Resume"}</Tag>
            </Space>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />} onClick={handleDownload}>
              Download
            </Button>
            <Button
              className="!bg-[#1a5fa4] !text-white !border-none"
              icon={<EditOutlined />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Space>
        </div>

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Title" span={2}>
            <Space>
              <FileTextOutlined className="text-blue-500" />
              {template.title}
            </Space>
          </Descriptions.Item>
          {template.type && (
            <Descriptions.Item label="Type">{template.type}</Descriptions.Item>
          )}
          {template.price && (
            <Descriptions.Item label="Price">
              $ {template.price}
            </Descriptions.Item>
          )}
          {template.createdAt && (
            <Descriptions.Item label="Created At">
              {new Date(template.createdAt).toLocaleDateString()}
            </Descriptions.Item>
          )}
          {template.description && (
            <Descriptions.Item label="Description" span={2}>
              {template.description}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {/* File Preview */}
      {template.file && (
        <Card title="File Preview">
          {template.file.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={imgUrl + template.file}
              className="w-full"
              style={{ height: "600px", border: "none" }}
            />
          ) : template.file.toLowerCase().endsWith(".doc") ||
            template.file.toLowerCase().endsWith(".docx") ? (
            <div className="flex flex-col items-center justify-center py-10">
              <FileTextOutlined style={{ fontSize: 48, color: "#2b579a" }} />
              <p className="mt-2 text-gray-600">
                Word Document Preview not supported
              </p>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                className="mt-4 !bg-[#1a5fa4] !text-white !border-none"
                onClick={handleDownload}
              >
                Download Document
              </Button>
            </div>
          ) : (
            <p>Unsupported file type</p>
          )}
        </Card>
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Template"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={600}
        centered
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
