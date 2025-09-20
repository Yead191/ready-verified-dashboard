"use client";

import { Table, Tag, Button, Space, Popconfirm, Tooltip } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { imgUrl } from "@/app/dashboard/layout";
// import PdfThumbnail from "@/components/shared/PdfThumbnail";

interface Template {
  _id: string;
  file: string;
  title: string;
  type: string;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface TemplateTableProps {
  templates: Template[];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  paginationData?: any;
  setPage: (page: number) => void;
  page: number;
}

export default function TemplateTable({
  templates,
  onDelete,
  onView,
  paginationData,
  setPage,
  page,
}: TemplateTableProps) {
  const columns: ColumnsType<Template> = [
    {
      title: "S.No",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Preview",
      dataIndex: "file",
      key: "file",
      width: 120,
      render: (file: string) => {
        const fullUrl = `${imgUrl}${file}`;
        const isDoc =
          file?.toLowerCase().endsWith(".doc") ||
          file?.toLowerCase().endsWith(".docx");

        return (
          <div className="w-[120px] h-[80px] flex items-center justify-center overflow-hidden template">
            {isDoc ? (
              // Example: use any icon you prefer
              <FileWordOutlined style={{ fontSize: 44, color: "#2b579a" }} />
            ) : (
              // Or  />
              <iframe
                src={`${fullUrl}#page=1&zoom=0`}
                width="120"
                height="80"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="font-medium">{title}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => (
        <Tag color={type.toLowerCase() === "resume" ? "blue" : "green"}>
          {type}
        </Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price: number) => `$${price}`,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: 100,
    //   render: (status: string) => `${status}`,
    // },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
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
              icon={<EyeOutlined style={{ fontSize: 20 }} />}
              onClick={() => onView(record._id)}
              className="text-blue-500 hover:text-blue-700"
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              onClick={() => onDelete(record._id)}
              type="text"
              icon={<DeleteOutlined style={{ fontSize: 20 }} />}
              className="text-red-500 hover:text-red-700"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={templates}
      rowKey="_id"
      pagination={{
        total: paginationData?.total,
        pageSize: paginationData?.limit,
        current: paginationData?.page,
        onChange: (page) => setPage(page),
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} templates`,
      }}
      className="w-full"
    />
  );
}
