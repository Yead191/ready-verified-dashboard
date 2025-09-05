"use client";

import type React from "react";
import { useState } from "react";
import { Category } from "@/data/assessment";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import ViewDetailsModal from "./ViewDetailsModal";
import { useGetCategoriesQuery } from "@/redux/feature/categoryApi/categoryApi";
import PageHeading from "@/components/shared/PageHeading";

const CategoryPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  // get category
  const { data: categoriesData, refetch } = useGetCategoriesQuery(null);
  const categories = categoriesData?.data || [];

  const handleCreateCategory = () => {
    setModalMode("create");
    setEditingCategory(null);
    setModalVisible(true);
  };

  const handleViewCategory = (category: Category) => {
    setViewingCategory(category);
    setViewModalVisible(true);
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
      <PageHeading label="Category" onClick={handleCreateCategory} />

      <div className="bg-white rounded-lg shadow-sm">
        <CategoryTable
          categories={categories}
          onView={handleViewCategory}
          refetch={refetch}
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
