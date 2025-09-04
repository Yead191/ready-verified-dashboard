"use client";

import type React from "react";
import { useState } from "react";
import { Typography, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionModal from "./SubscriptionModal";
import {
  useAddSubscriptionMutation,
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/feature/subscriptionApi/subscriptionApi";
import { toast } from "sonner";

const { Title } = Typography;

const SubscriptionPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [editId, setEditId] = useState(null);
  // get subscription
  const { data: subscription, refetch } = useGetSubscriptionQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  // add subscription
  const [addSubscription] = useAddSubscriptionMutation();
  //update subscription
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const subscriptionPlans = subscription?.data || [];
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
    if (modalMode === "add") {
      console.log(values);
      const subscriptionValue = { ...values, price: Number(values.price) };
      // console.log(subscriptionValue);
      toast.promise(addSubscription(subscriptionValue).unwrap(), {
        loading: "Adding subscription...",
        success: (res) => {
          refetch();
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });
    } else if (modalMode === "edit" && editingSubscription) {
      // console.log(editingSubscription._id);
      toast.promise(
        updateSubscription({
          id: editId,
          data: values,
        }).unwrap(),
        {
          loading: "Updating subscription...",
          success: (res) => {
            refetch();
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
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

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {subscriptionPlans.map((plan: any) => (
          <div key={plan._id}>
            <SubscriptionCard
              refetch={refetch}
              planId={plan._id}
              packageName={plan.name}
              amount={plan.price}
              paymentType={plan.recurring}
              packageOffer={plan.features}
              onEdit={() => handleEditSubscription(plan!)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <SubscriptionModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        initialData={editingSubscription}
        mode={modalMode}
      />
    </div>
  );
};

export default SubscriptionPage;
