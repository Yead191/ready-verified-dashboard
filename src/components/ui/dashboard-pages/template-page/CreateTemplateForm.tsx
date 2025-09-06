"use client";

import { Form, Input, Select, Upload, Button, Space, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

interface CreateTemplateFormProps {
  onSubmit: any;
  onCancel: () => void;
  loading?: boolean;
}

export default function CreateTemplateForm({
  onSubmit,
  onCancel,
  loading,
}: CreateTemplateFormProps) {
  const [form] = Form.useForm();

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".pdf,.doc,.docx",
    beforeUpload: (file) => {
      const isValidType =
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (!isValidType) {
        message.error("You can only upload PDF or DOC/DOCX files!");
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File must be smaller than 10MB!");
        return false;
      }

      return false; // Prevent auto upload
    },
    onChange: (info) => {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleFinish = (values: any) => {
    const fileList = form.getFieldValue("file");
    if (!fileList || fileList.length === 0) {
      message.error("Please upload a PDF file!");
      return;
    }

    const formData: FormData = {
      ...values,
      file: fileList[0].originFileObj,
    };

    onSubmit(formData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="w-full"
    >
      <Form.Item
        name="type"
        label="Select Template Type"
        rules={[{ required: true, message: "Please select a template type!" }]}
      >
        <Select placeholder="Select Template Type" size="large">
          <Option value="cv">CV</Option>
          <Option value="resume">Resume</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="file"
        label="Upload File"
        rules={[{ required: true, message: "Please upload a PDF file!" }]}
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
      >
        <Dragger {...uploadProps} className="!bg-gray-50">
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-4xl text-blue-500" />
          </p>
          <p className="ant-upload-text text-lg font-medium">
            Click to upload or drag and drop
          </p>
          <p className="ant-upload-hint text-gray-500">
            Support for PDF files only. Maximum file size: 10MB
          </p>
        </Dragger>
      </Form.Item>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* name */}
        <Form.Item
          name="title"
          label="Enter Template Title"
          rules={[
            { required: true, message: "Please enter template title!" },
            {
              min: 3,
              message: "Template title must be at least 3 characters!",
            },
          ]}
        >
          <Input placeholder="Enter Template title" size="large" />
        </Form.Item>
        {/* price */}
        <Form.Item
          name="price"
          label="Enter Template Price"
          rules={[{ required: true, message: "Please enter template price!" }]}
        >
          <Input type="number" placeholder="Enter Template Name" size="large" />
        </Form.Item>
      </div>

      <Form.Item name="description" label="Description (Optional)">
        <TextArea
          rows={4}
          placeholder="Enter template description..."
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item className="!mb-0">
        <Space className="w-full justify-end">
          <Button size="large" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            size="large"
            loading={loading}
            className="!bg-[#1a5fa4] !text-white !border-none"
          >
            Upload
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
