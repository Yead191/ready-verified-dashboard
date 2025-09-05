"use client"

import { Table, Tag, Button, Space, Popconfirm, Tooltip } from "antd"
import { EyeOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { Template } from "@/data/template"

interface TemplateTableProps {
  templates: Template[]
  onDelete: (id: string) => void
  onView: (id: string) => void
}

export default function TemplateTable({ templates, onDelete, onView }: TemplateTableProps) {
  const columns: ColumnsType<Template> = [
    {
      title: "S.No",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Filing Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Space>
          <FileTextOutlined className="text-blue-500" />
          <span className="font-medium">{name}</span>
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => <Tag color={type === "CV" ? "blue" : "green"}>{type}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => <Tag color={status === "Active" ? "success" : "error"}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onView(record.id)}
              className="text-blue-500 hover:text-blue-700"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Template"
            description="Are you sure you want to delete this template?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="text" icon={<DeleteOutlined />} className="text-red-500 hover:text-red-700" />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={templates}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} templates`,
      }}
      className="w-full"
    />
  )
}
