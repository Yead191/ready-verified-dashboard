"use client";

import type React from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Category } from "@/data/assessment";
import { imgUrl } from "@/app/(dashboard)/layout";
import Image from "next/image";

interface CategoryTableProps {
  categories: Category[];
  onView: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onView,
  onDelete,
}) => {
  const handleDelete = (categoryId: string) => {
    onDelete(categoryId);
    message.success("Category deleted successfully");
  };

  const columns: ColumnsType<Category> = [
    {
      title: "S.No",
      key: "index",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Category) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center overflow-hidden">
            {record.icon ? (
              <img
                src={imgUrl + record.icon}
                alt={text}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <span className="text-blue-600 text-sm font-medium">
                {text.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-medium text-gray-800">{text}</span>
        </div>
      ),
    },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   width: 120,
    // },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record: Category) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Popconfirm
            title="Delete Category"
            description="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-800"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories}
      rowKey="_id"
      pagination={false}
      className="category-table"
    />
  );
};

export default CategoryTable;
