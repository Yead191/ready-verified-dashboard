"use client";

import type React from "react";
import { useState } from "react";
import { Modal, Button, Form, Input, Upload, message } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Category, Question } from "@/data/assessment";
import { toast } from "sonner";
import { useAddCategoryMutation } from "@/redux/feature/categoryApi/categoryApi";

interface CategoryModalProps {
  visible: boolean;
  onCancel: () => void;
  refetch: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onCancel,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addCategory] = useAddCategoryMutation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const questions: Question[] =
        values.questions?.map((q: any) => ({
          question: q.question,
          type: q.type || "boolean",
        })) || [];

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("questions", JSON.stringify(questions));

      // Add today's date
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      });
      console.log(formattedDate);
      formData.append("date", formattedDate);

      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      toast.promise(addCategory(formData).unwrap(), {
        loading: "Adding category...",
        success: (res) => {
          refetch();
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });

      handleCancel();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const uploadProps: UploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }

      const newFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: "done",
        originFileObj: file, // keep original file for FormData
        url: URL.createObjectURL(file), // preview
      };
      setFileList([newFile]);

      return Upload.LIST_IGNORE; // prevent auto upload
    },
    onRemove: () => setFileList([]),
    maxCount: 1,
  };

  return (
    <Modal
      title="Create New Category"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Create
        </Button>,
      ]}
      width={800}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter category title" }]}
        >
          <Input placeholder="Enter category title" style={{ height: 40 }} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            <Upload.Dragger {...uploadProps} className="h-48">
              {fileList.length > 0 ? (
                <div className="flex flex-col items-center">
                  <img
                    src={fileList[0].url || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-32 max-w-full object-contain mb-2"
                  />
                  <p className="text-sm text-gray-500">
                    Click or drag to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <UploadOutlined className="text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload</p>
                  <p className="text-xs text-gray-400">or drag and drop</p>
                </div>
              )}
            </Upload.Dragger>
          </div>

          {/* Right side - Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Questions
            </label>
            <Form.List name="questions" initialValue={[{ question: "" }]}>
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex items-start gap-2">
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
                          <Input
                            placeholder="Enter question text"
                            style={{ height: 40 }}
                          />
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
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
