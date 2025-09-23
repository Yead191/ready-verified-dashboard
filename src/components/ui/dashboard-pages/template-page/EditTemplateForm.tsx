"use client";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Switch,
  Upload,
  message,
} from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState } from "react";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

interface EditTemplateFormProps {
  template: any;
  onSubmit: (values: Partial<any>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function EditTemplateForm({
  template,
  onSubmit,
  onCancel,
  loading,
}: EditTemplateFormProps) {
  const [form] = Form.useForm();
  const [features, setFeatures] = useState<string[]>(template.features || []);

  // file upload
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

      return false; // prevent auto upload
    },
    defaultFileList: template.file
      ? [
          {
            uid: "-1",
            name: template.title + ".doc",
            status: "done",
            url: template.file,
          },
        ]
      : [],
  };

  // thumbnail upload
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
    defaultFileList: template.thumbnail
      ? [
          {
            uid: "-2",
            name: "thumbnail.png",
            status: "done",
            url: template.thumbnail,
          },
        ]
      : [],
  };

  const handleFinish = (values: any) => {
    const fileList = form.getFieldValue("file");
    const thumbnailList = form.getFieldValue("thumbnail");

    const updatedValues = {
      ...values,
      features,
      file:
        fileList && fileList.length > 0
          ? fileList[0].originFileObj || template.file
          : template.file,
      thumbnail:
        thumbnailList && thumbnailList.length > 0
          ? thumbnailList[0].originFileObj || template.thumbnail
          : template.thumbnail,
    };

    onSubmit(updatedValues);
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
    style={{maxHeight: "70vh", overflowY: "auto"}}
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        title: template.title,
        type: template.type,
        price: template.price,
        description: template.description || "",
        status: template.status || "active",
        isPremium: template.isPremium || false,
        tags: template.tags || [],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="title"
          label="Template Title"
          rules={[
            { required: true, message: "Please enter template title!" },
            { min: 3, message: "Title must be at least 3 characters!" },
          ]}
        >
          <Input placeholder="Enter template title" size="large" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price!" }]}
        >
          <Input type="number" placeholder="Enter price" size="large" />
        </Form.Item>
      </div>

      <Form.Item
        name="type"
        label="Template Type"
        rules={[{ required: true, message: "Please select template type!" }]}
      >
        <Select placeholder="Select type" size="large">
          <Option value="cover-letter">CV</Option>
          <Option value="resume">Resume</Option>
        </Select>
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="file"
          label="Upload File"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <Dragger {...uploadProps} className="!bg-gray-50 !h-[200px]">
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-4xl text-blue-500" />
            </p>
            <p className="ant-upload-text text-lg font-medium">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Upload Thumbnail Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <Dragger {...thumbnailProps} className="!bg-gray-50 !h-[200px]">
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-4xl text-blue-500" />
            </p>
            <p className="ant-upload-text text-lg font-medium">
              Click or drag image to this area to upload
            </p>
          </Dragger>
        </Form.Item>
      </div>

      <Form.Item name="description" label="Description">
        <TextArea
          rows={4}
          placeholder="Enter template description..."
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select status!" }]}
      >
        <Select placeholder="Select Status" size="large">
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="isPremium"
        label="Premium Template"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item name="tags" label="Tags">
        <Select mode="tags" style={{ width: "100%" }} placeholder="Add tags" />
      </Form.Item>

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

      <Form.Item className="!mb-0">
        <Space className="w-full justify-end">
          <Button size="large" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            size="large"
            loading={loading}
            className="!bg-[#1a5fa4] !text-white  !border-none"
          >
            Update Template
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
