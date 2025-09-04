"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Upload } from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Category } from "@/data/assessment";
import { imgUrl } from "@/app/(dashboard)/layout";
import { toast } from "sonner";
import { useUpdateCategoryMutation } from "@/redux/feature/categoryApi/categoryApi";

interface ViewDetailsModalProps {
  visible: boolean;
  onCancel: () => void;
  category: Category | null;
  refetch: () => void;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  visible,
  onCancel,
  category,
  refetch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [updateCategory] = useUpdateCategoryMutation();

  // inside ViewDetailsModal
  // reset form values when category changes
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        categoryTitle: category.title,
        questions: category.questions.map((q) => ({ question: q.question })),
        categoryImage: [],
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);
  if (!category) return null;

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("_id", category._id);
      formData.append("title", values.categoryTitle);

      if (values.categoryImage?.[0]?.originFileObj) {
        formData.append("image", values.categoryImage[0].originFileObj);
      }

      formData.append("questions", JSON.stringify(values.questions));

      toast.promise(
        updateCategory({
          id: category._id,
          data: formData,
        }).unwrap(),
        {
          loading: "Updating category...",
          success: (res) => {
            refetch();
            setIsEditing(false);
            onCancel();
            return <b>{res.message}</b>;
          },
          error: (res) =>
            `Error: ${res.data?.message || "Something went wrong"}`,
        }
      );
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title="Category Details"
      open={visible}
      onCancel={() => {
        setIsEditing(false);
        onCancel();
      }}
      footer={null}
      width={800}
      destroyOnHidden
      centered
    >
      <Form form={form} layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Category Image */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs">
              <img
                src={
                  (imgUrl || "") + category.icon ||
                  "/placeholder.svg?height=300&width=200&query=certificate"
                }
                alt={category.title}
                className="w-full h-auto rounded-lg shadow-md object-cover mb-3"
              />

              {isEditing && (
                <Form.Item
                  name="categoryImage"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e?.fileList}
                >
                  <Upload
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                  >
                    <Button icon={<UploadOutlined />}>Change Image</Button>
                  </Upload>
                </Form.Item>
              )}
            </div>
          </div>

          {/* Right - Category Info & Questions */}
          <div className="flex flex-col gap-4">
            {/* Category Title */}
            {isEditing ? (
              <Form.Item
                name="categoryTitle"
                label="Category Title"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="Enter category title" />
              </Form.Item>
            ) : (
              <h1 className="mb-0 text-xl font-semibold">{category.title}</h1>
            )}

            {/* Questions */}
            {isEditing ? (
              <Form.List name="questions">
                {(fields, { add, remove }) => (
                  <div className="space-y-3">
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        className="flex items-start gap-2 border p-2 rounded-md"
                      >
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            Q.{String(name + 1).padStart(2, "0")}
                          </div>
                          <Form.Item
                            {...restField}
                            name={[name, "question"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter question text",
                              },
                            ]}
                            className="mb-0"
                          >
                            <Input placeholder="Enter question text" />
                          </Form.Item>
                        </div>
                        {fields.length > 1 && (
                          <Button
                            type="text"
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(name)}
                            className="text-red-500 hover:text-red-700 mt-6"
                          />
                        )}
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="w-full mt-2"
                    >
                      Add Question
                    </Button>
                  </div>
                )}
              </Form.List>
            ) : (
              <div className="flex flex-col gap-2">
                {category.questions.map((q, i) => (
                  <div
                    key={q._id}
                    className="border border-gray-200 rounded p-2"
                  >
                    <span className="font-medium text-blue-600">
                      Q.{String(i + 1).padStart(2, "0")}:
                    </span>{" "}
                    {q.question}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button
                    type="primary"
                    className="!bg-[#1a5fa4] !text-white"
                    onClick={handleSave}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <Button
                  type="primary"
                  className="!bg-[#1a5fa4] !text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Category
                </Button>
              )}
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ViewDetailsModal;
