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
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

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
    onChange: (info) => {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} uploaded successfully`);
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed`);
      }
    },
    defaultFileList: template.file
      ? [
          {
            uid: "-1",
            name: template.title + ".pdf",
            status: "done",
            url: template.file,
          },
        ]
      : [],
  };

  const handleFinish = (values: any) => {
    const fileList = form.getFieldValue("file");
    const updatedValues = {
      ...values,
      status: values.status ? "Active" : "Inactive",
      tags: values.tags
        ? values.tags.split(",").map((tag: string) => tag.trim())
        : [],
      file:
        fileList && fileList.length > 0
          ? fileList[0].originFileObj || template.file
          : template.file,
    };

    onSubmit(updatedValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        title: template.title,
        type: template.type,
        price: template.price,
        description: template.description || "",
        status: template.status === "Active",
        tags: template.tags?.join(", ") || "",
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
          <Option value="cv">CV</Option>
          <Option value="resume">Resume</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="file"
        label="Upload File"
        valuePropName="fileList"
        getValueFromEvent={(e) => e?.fileList}
      >
        <Dragger {...uploadProps} className="!bg-gray-50">
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-4xl text-blue-500" />
          </p>
          <p className="ant-upload-text text-lg font-medium">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint text-gray-500">
            Supports PDF, DOC, DOCX. Max size: 10MB
          </p>
        </Dragger>
      </Form.Item>

      {/* <Form.Item name="status" label="Status" valuePropName="checked">
        <Switch checkedChildren="active" unCheckedChildren="inactive" />
      </Form.Item> */}

      <Form.Item name="description" label="Description">
        <TextArea
          rows={4}
          placeholder="Enter template description..."
          maxLength={500}
          showCount
        />
      </Form.Item>

      {/* <Form.Item name="tags" label="Tags (comma separated)">
        <Input placeholder="e.g., Professional, Modern, Corporate" />
      </Form.Item> */}

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
