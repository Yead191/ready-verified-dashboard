"use client"

import { Template } from "@/data/template"
import { Form, Input, Select, Button, Space, Switch } from "antd"

const { Option } = Select
const { TextArea } = Input

interface EditTemplateFormProps {
  template: Template
  onSubmit: (values: Partial<Template>) => void
  onCancel: () => void
}

export default function EditTemplateForm({ template, onSubmit, onCancel }: EditTemplateFormProps) {
  const [form] = Form.useForm()

  const handleFinish = (values: any) => {
    const updatedValues = {
      ...values,
      status: values.status ? "Active" : "Inactive",
      tags: values.tags ? values.tags.split(",").map((tag: string) => tag.trim()) : [],
    }
    onSubmit(updatedValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        name: template.name,
        type: template.type,
        description: template.description || "",
        status: template.status === "Active",
        tags: template.tags?.join(", ") || "",
      }}
    >
      <Form.Item
        name="name"
        label="Template Name"
        rules={[
          { required: true, message: "Please enter template name!" },
          { min: 3, message: "Template name must be at least 3 characters!" },
        ]}
      >
        <Input placeholder="Enter Template Name" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Template Type"
        rules={[{ required: true, message: "Please select a template type!" }]}
      >
        <Select placeholder="Select Template Type">
          <Option value="CV">CV</Option>
          <Option value="Resume">Resume</Option>
        </Select>
      </Form.Item>

      <Form.Item name="status" label="Status" valuePropName="checked">
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <TextArea rows={4} placeholder="Enter template description..." maxLength={500} showCount />
      </Form.Item>

      <Form.Item name="tags" label="Tags (comma separated)">
        <Input placeholder="e.g., Professional, Modern, Corporate" />
      </Form.Item>

      <Form.Item className="!mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Update Template
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
