"use client";

import type React from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Category } from "@/data/assessment";
import { imgUrl } from "@/app/(dashboard)/layout";
import { Trash } from "lucide-react";
import { useState } from "react";
import DeleteModal from "@/components/shared/DeleteModal";
import { useDeleteCategoryMutation } from "@/redux/feature/categoryApi/categoryApi";
import { toast } from "sonner";

interface CategoryTableProps {
  categories: Category[];
  onView: (category: Category) => void;
  refetch: () => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onView,
  refetch,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = (categoryId: string) => {
    setDeleteId(categoryId);
    setDeleteModalOpen(true);
  };

  const handleDeleteCategory = () => {
    if (deleteId) {
      toast.promise(deleteCategory(deleteId).unwrap(), {
        loading: "Deleting category...",
        success: (res) => {
          refetch();
          setDeleteId(null);
          setDeleteModalOpen(false);
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });
    }
  };
  // console.log(deleteId);

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
            icon={<EyeOutlined style={{ fontSize: "20px" }} />}
            onClick={() => onView(record)}
            className="text-blue-600 hover:text-blue-800"
          />

          <Button
            onClick={() => handleDelete(record._id)}
            type="text"
            icon={<Trash size={20} />}
            className="text-red-600 hover:text-red-800"
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        pagination={false}
        className="category-table"
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        handleDelete={handleDeleteCategory}
      />
    </>
  );
};

export default CategoryTable;
