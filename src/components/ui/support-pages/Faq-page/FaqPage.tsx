"use client";

import { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Space,
  Form,
  Tooltip,
  Tabs,
  ConfigProvider,
} from "antd";
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
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  selected?: boolean;
  type?: "jobSeeker" | "employer";
}

export default function FAQPage() {
  // GET FAQ
  const { data: jobSeekerFAQs } = useGetFaqContentQuery({ type: "candidate" });
  const { data: employerFAQs, refetch } = useGetFaqContentQuery({
    type: "employee",
  });
  // add faq
  const [addFaq] = useAddFaqMutation();
  // update faq
  const [updateFaq] = useUpdateFaqMutation();
  // delete faq
  const [deleteFaq] = useDeleteFaqMutation();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<FAQItem | null>(null);
  const [activeTab, setActiveTab] = useState<"candidate" | "employee">(
    "candidate"
  );
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
      const faqData = {
        question: values.question,
        answer: values.answer,
        type: activeTab,
      };

      if (editingItem) {
        toast.promise(
          updateFaq({ id: editingItem._id, data: faqData }).unwrap(),
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
        return;
      } else {
        toast.promise(addFaq({ data: faqData }).unwrap(), {
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

  const renderFAQItem = (item: FAQItem) => (
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
        {/* Header */}
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
          />
        </div>

        {/* Tabs */}
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                titleFontSize: 16,
              },
            },
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key as "candidate" | "employee");
              router.replace(`?tab=${key}`);
            }}
            style={{ marginTop: 16 }}
          >
            <TabPane tab="Job Seekers" key="candidate">
              <div
                className="h-[calc(100vh-320px)] overflow-auto 
              "
              >
                {jobSeekerFAQs?.data?.length > 0 ? (
                  jobSeekerFAQs?.data?.map(renderFAQItem)
                ) : (
                  <p className="text-center text-gray-400 mt-8">
                    No FAQ available for Job Seekers.
                  </p>
                )}
              </div>
            </TabPane>
            <TabPane tab="Employers" key="employee">
              <div className="h-[calc(100vh-320px)] overflow-auto">
                {employerFAQs?.data?.length > 0 ? (
                  employerFAQs?.data?.map(renderFAQItem)
                ) : (
                  <p className="text-center text-gray-400 mt-8">
                    No FAQ available for Employers.
                  </p>
                )}
              </div>
            </TabPane>
          </Tabs>
        </ConfigProvider>

        {/* Add/Edit Modal */}
        <FaqModal
          isModalVisible={isModalVisible}
          handleModalCancel={handleModalCancel}
          handleModalOk={handleModalOk}
          form={form}
          editingItem={editingItem}
        />

        {/* Delete Modal */}
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
