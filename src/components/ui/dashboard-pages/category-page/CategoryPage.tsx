"use client";

import type React from "react";
import { useState } from "react";
import { Button, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Category } from "@/data/assessment";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import ViewDetailsModal from "./ViewDetailsModal";
import { useGetCategoriesQuery } from "@/redux/feature/categoryApi/categoryApi";

const CategoryPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // get category
  const { data: categoriesData, refetch } = useGetCategoriesQuery(null);
  const categories = categoriesData?.data || [];
  //   console.log(categories);
  const handleCreateCategory = () => {
    setModalMode("create");
    setEditingCategory(null);
    setModalVisible(true);
  };

  const handleViewCategory = (category: Category) => {
    setViewingCategory(category);
    setViewModalVisible(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };
  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
  };

  const handleViewModalCancel = () => {
    setViewModalVisible(false);
    setViewingCategory(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-white shadow-sm p-4 flex items-center justify-between rounded-lg ">
        <h1 className="text-xl font-semibold text-gray-800 m-0">
          Create New Categories
        </h1>
        <Button
          size="large"
          icon={<PlusOutlined />}
          onClick={handleCreateCategory}
          className="!bg-[#1a5fa4] !text-white "
        >
          Create
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <CategoryTable
          categories={categories}
          onView={handleViewCategory}
          onDelete={handleDeleteCategory}
        />
      </div>

      <CategoryModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        refetch={refetch}
      />

      <ViewDetailsModal
        refetch={refetch}
        visible={viewModalVisible}
        onCancel={handleViewModalCancel}
        category={viewingCategory}
      />
    </div>
  );
};

export default CategoryPage;
