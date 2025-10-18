"use client";

import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Space,
  message,
  Switch,
} from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState } from "react";

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
  const [features, setFeatures] = useState<string[]>([]);

  // upload props for file
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
  };

  // upload props for thumbnail
  const thumbnailProps: UploadProps = {
    name: "thumbnail",
    multiple: false,
    accept: ".jpg,.jpeg,.png",
    beforeUpload: (file) => {
      const isValidType =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";

      if (!isValidType) {
        message.error("You can only upload JPG, JPEG, or PNG images!");
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Thumbnail must be smaller than 5MB!");
        return false;
      }

      return false;
    },
  };

  const handleFinish = (values: any) => {
    const fileList = form.getFieldValue("file");
    if (!fileList || fileList.length === 0) {
      message.error("Please upload a PDF file!");
      return;
    }
    const thumbnailList = form.getFieldValue("thumbnail");
    if (!thumbnailList || thumbnailList.length === 0) {
      message.error("Please upload a thumbnail image!");
      return;
    }

    const formData: FormData = {
      ...values,
      features: features,
      file: fileList[0].originFileObj,
      image: thumbnailList[0].originFileObj,
    };
    console.log(values);
    onSubmit(formData);
  };

  const addFeature = () => {
    const value = form.getFieldValue("newFeature");
    if (value) {
      setFeatures([...features, value]);
      form.resetFields(["newFeature"]);
    }
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
        {/* 
        Resume = 'resume',
  CoverLetter = 'cover-letter',
  EducationalMaterial = 'educational-material',
  CheatSheet = 'cheat-sheet',
  QuickLesson = 'quick-lesson',
  HowToGuide = 'how-to-guide',
  Certificate = 'certificate',
  DigitalBadge = 'digital-badge',
  BusinessCard = 'business-card',
  Merchandise = 'merchandise',
  JobSeekerSubscription = 'jobseeker-subscription',
  EmployerSubscription = 'employer-subscription'
        */}
        <Select placeholder="Select Template Type" size="large">
          <Option value="cover-letter">CV</Option>
          <Option value="resume">Resume</Option>
          <Option value="educational-material">Educational Material</Option>
          <Option value="cheat-sheet">Cheat Sheet</Option>
          <Option value="quick-lesson">QuickLesson</Option>
          <Option value="how-to-guide">HowToGuide</Option>
          <Option value="certificate">Certificate</Option>
          <Option value="digital-badge">Digital Badge</Option>
          <Option value="business-card">Business Card</Option> 
          <Option value="merchandise">Merchandise</Option> 

        </Select>
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* file upload */}
        <Form.Item
          name="file"
          label="Upload File"
          rules={[{ required: true, message: "Please upload a PDF file!" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Dragger {...uploadProps} className="!bg-gray-50 !h-[200px]">
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-4xl text-blue-500" />
            </p>
            <p className="ant-upload-text text-lg font-medium">
              Click to upload or drag and drop
            </p>
            <p className="ant-upload-hint text-gray-500">
              Support for PDF files only. Max size: 10MB
            </p>
          </Dragger>
        </Form.Item>

        {/* thumbnail upload */}
        <Form.Item
          name="thumbnail"
          label="Upload Thumbnail Image"
          rules={[{ required: true, message: "Please upload a thumbnail!" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Dragger {...thumbnailProps} className="!bg-gray-50 !h-[200px]">
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-4xl text-blue-500" />
            </p>
            <p className="ant-upload-text text-lg font-medium">
              Click to upload or drag and drop
            </p>
            <p className="ant-upload-hint text-gray-500">
              Support for JPG, JPEG, PNG only. Max size: 5MB
            </p>
          </Dragger>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="title"
          label="Enter Template Title"
          rules={[{ required: true, message: "Please enter template title!" }]}
        >
          <Input placeholder="Enter Template title" size="large" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Enter Template Price"
          rules={[{ required: true, message: "Please enter template price!" }]}
        >
          <Input
            type="number"
            placeholder="Enter Template Price"
            size="large"
          />
        </Form.Item>
      </div>

      {/* description */}
      <Form.Item name="description" label="Description (Optional)">
        <TextArea rows={4} placeholder="Enter template description..." />
      </Form.Item>

      {/* status */}
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Select placeholder="Select Status" size="large">
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>

      {/* isPremium */}
      <Form.Item
        name="isPremium"
        label="Premium Template"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* tags */}
      <Form.Item name="tags" label="Tags">
        <Select mode="tags" style={{ width: "100%" }} placeholder="Add tags" />
      </Form.Item>

      {/* features */}
      <Form.Item label="Features">
        <Space.Compact style={{ width: "100%" }}>
          <Form.Item name="newFeature" noStyle>
            <Input placeholder="Enter a feature" />
          </Form.Item>
          <Button type="primary" icon={<PlusOutlined />} onClick={addFeature}>
            Add
          </Button>
        </Space.Compact>
        <ul className="mt-2 list-disc pl-5">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </Form.Item>

      {/* buttons */}
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
