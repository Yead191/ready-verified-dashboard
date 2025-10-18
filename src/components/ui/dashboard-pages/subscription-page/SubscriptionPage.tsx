"use client";

import type React from "react";
import { useState } from "react";
import { Typography, Button, Tabs, ConfigProvider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionModal from "./SubscriptionModal";
import {
  useAddSubscriptionMutation,
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/feature/subscriptionApi/subscriptionApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const { TabPane } = Tabs;

const SubscriptionPage: React.FC = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingSubscription, setEditingSubscription] = useState<any>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"candidate" | "employee">(
    "candidate"
  );

  // get subscription
  // employer plans
  const { data: employerPlans, refetch: refetchEmployer } =
    useGetSubscriptionQuery(
      { type: "employee" },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  // job seeker plans
  const { data: jobSeekerPlans, refetch } = useGetSubscriptionQuery(
    { type: "candidate" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // add subscription
  const [addSubscription] = useAddSubscriptionMutation();
  // update subscription
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const handleAddSubscription = () => {
    setModalMode("add");
    setEditingSubscription(null);
    setModalVisible(true);
  };

  const handleEditSubscription = (plan: any) => {
    setModalMode("edit");
    setEditingSubscription(plan);
    setEditId(plan._id);
    setModalVisible(true);
  };

  const handleModalSubmit = (values: any) => {
    const subscriptionValue = {
      ...values,
      price: Number(values.price),
      type: activeTab,
    };

    if (modalMode === "add") {
      toast.promise(addSubscription(subscriptionValue).unwrap(), {
        loading: "Adding subscription...",
        success: (res) => {
          refetch();
          refetchEmployer();
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });
    } else if (modalMode === "edit" && editingSubscription) {
      toast.promise(
        updateSubscription({
          id: editId,
          data: subscriptionValue,
        }).unwrap(),
        {
          loading: "Updating subscription...",
          success: (res) => {
            refetch();
            refetchEmployer();
            return <b>{res.message}</b>;
          },
          error: (res) =>
            `Error: ${res.data?.message || "Something went wrong"}`,
        }
      );
    }

    setModalVisible(false);
    setEditingSubscription(null);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingSubscription(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Title level={2} style={{ margin: 0, color: "#262626" }}>
          Subscription Plans
        </Title>
        <Button
          icon={<PlusOutlined />}
          onClick={handleAddSubscription}
          style={{
            height: 40,
            borderRadius: 6,
            fontWeight: 500,
            backgroundColor: "#F57A0326",
            borderColor: "#F57A0326",
            color: "black",
          }}
        >
          Add Subscription
        </Button>
      </div>

      {/* Tabs for Job Seekers & Employers */}
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
        >
          <TabPane tab="Job Seekers" key="candidate">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {jobSeekerPlans?.data?.map((plan: any) => (
                <SubscriptionCard
                  key={plan._id}
                  refetch={refetch}
                  planId={plan._id}
                  packageName={plan.name}
                  amount={plan.price}
                  paymentType={plan.recurring}
                  packageOffer={plan.features}
                  onEdit={() => handleEditSubscription(plan!)}
                  
                />
              ))}
            </div>
          </TabPane>

          <TabPane tab="Employers" key="employee">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {employerPlans?.data?.map((plan: any) => (
                <SubscriptionCard
                  key={plan._id}
                  refetch={refetch}
                  planId={plan._id}
                  packageName={plan.name}
                  amount={plan.price}
                  paymentType={plan.recurring}
                  packageOffer={plan.features}
                  onEdit={() => handleEditSubscription(plan!)}
                />
              ))}
            </div>
          </TabPane>
        </Tabs>
      </ConfigProvider>

      {/* Modal */}
      <SubscriptionModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        initialData={editingSubscription}
        mode={modalMode}
        activeTab={activeTab}
      />
    </div>
  );
};

export default SubscriptionPage;
