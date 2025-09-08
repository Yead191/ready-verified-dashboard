"use client";

import { useState } from "react";
import { Layout, Typography, Button, Space, Form, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "sonner";
import FaqModal from "./FaqModal";
import DeleteModal from "./DeleteModal";
import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqContentQuery,
  useUpdateFaqMutation,
} from "@/redux/feature/support-page/SupportPageApi";
import PrimaryButton from "@/components/shared/PrimaryButton";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  selected?: boolean;
}

export default function FAQPage() {
  // GET FAQ
  const { data: faqData, refetch } = useGetFaqContentQuery(null);
  // add faq
  const [addFaq] = useAddFaqMutation();
  //update faq
  const [updateFaq] = useUpdateFaqMutation();
  // delete faq
  const [deleteFaq] = useDeleteFaqMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<FAQItem | null>(null);
  const [form] = Form.useForm();

  const handleAddContent = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (item: FAQItem) => {
    setEditingItem(item);
    form.setFieldsValue({
      question: item.question,
      answer: item.answer,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (item: FAQItem) => {
    setDeletingItem(item);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    // console.log(deletingItem);
    if (deletingItem) {
      toast.promise(deleteFaq({ id: deletingItem._id }).unwrap(), {
        loading: "Deleting FAQ item...",
        success: (res) => {
          setIsDeleteModalVisible(false);
          setDeletingItem(null);
          refetch();
          return <b>{res.message}</b>;
        },
        error: (err) =>
          `Error: ${err?.data?.message || "Something went wrong"}`,
      });
    }
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        // Edit existing item
        // console.log(editingItem);
        const updateItem = {
          question: values.question,
          answer: values.answer,
        };
        toast.promise(
          updateFaq({ id: editingItem._id, data: updateItem }).unwrap(),
          {
            loading: "Updating FAQ item...",
            success: (res) => {
              refetch();
              form.resetFields();
              setIsModalVisible(false);
              setEditingItem(null);
              return <b>{res.message}</b>;
            },
            error: (err) =>
              `Error: ${err?.data?.message || "Something went wrong"}`,
          }
        );
      } else {
        // Add new item
        const newItem: FAQItem = {
          question: values.question,
          answer: values.answer,
        };
        toast.promise(addFaq({ data: newItem }).unwrap(), {
          loading: "Adding FAQ item...",
          success: (res) => {
            refetch();
            form.resetFields();
            setIsModalVisible(false);
            return <b>{res.message}</b>;
          },
          error: (err) =>
            `Error: ${err?.data?.message || "Something went wrong"}`,
        });
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const renderFAQItem = (item: any) => (
    <div key={item._id} style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          border: "1px solid #e9ecef",
          borderRadius: 8,
          padding: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: 12,
              gap: 20,
            }}
          >
            <div className="w-full">
              <Title
                className="w-full shadow-md rounded-xl py-2 px-4"
                level={5}
                style={{
                  margin: 0,
                  color: "#666",
                  marginBottom: 9,
                  backgroundColor: "#F9F9F9",
                }}
              >
                {item.question}
              </Title>
              <Paragraph
                className="w-full shadow-md rounded-xl py-2 px-4"
                style={{
                  margin: 0,
                  color: "#888",
                  fontSize: 14,
                  lineHeight: 1.6,
                  backgroundColor: "#F9F9F9",
                }}
              >
                {item.answer}
              </Paragraph>
            </div>
            <Space direction="vertical" size={4}>
              <Tooltip title="Edit">
                <Button
                  type="text"
                  icon={<BsPencilSquare size={20} />}
                  size="large"
                  onClick={() => handleEdit(item)}
                  style={{ color: "#58553A" }}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="text"
                  icon={<FaRegTrashAlt size={20} />}
                  size="large"
                  onClick={() => handleDelete(item)}
                  style={{ color: "#58553A" }}
                />
              </Tooltip>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Content style={{ padding: "16px", paddingBottom: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <PrimaryButton
            handleEvent={handleAddContent}
            size="large"
            text="Add FAQ"
          ></PrimaryButton>
        </div>
        <div
          style={{
            height: "70vh",
            overflowY: "auto",
            paddingBottom: "24px",
            marginTop: 10,
          }}
        >
          {faqData?.data?.map(renderFAQItem)}
        </div>

        {/* Custom Add/Edit Modal */}
        <FaqModal
          isModalVisible={isModalVisible}
          handleModalCancel={handleModalCancel}
          handleModalOk={handleModalOk}
          form={form}
          editingItem={editingItem}
        />
        {/* Custom Delete Confirmation Modal */}
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          setIsDeleteModalVisible={setIsDeleteModalVisible}
          setDeletingItem={setDeletingItem}
          title={"FAQ"}
          confirmDelete={confirmDelete}
        />
      </Content>
    </Layout>
  );
}
