"use client";

import type React from "react";
import { Check, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "@/components/shared/DeleteModal";
import { useDeleteSubscriptionMutation } from "@/redux/feature/subscriptionApi/subscriptionApi";
import { toast } from "sonner";

interface SubscriptionCardProps {
  planId: string;
  packageName: string;
  amount: number;
  paymentType: string;
  packageOffer: string[];
  onEdit: () => void;
  refetch?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  packageName,
  amount,
  paymentType,
  packageOffer,
  planId,
  onEdit,
  refetch,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const handleDelete = () => {
    // console.log("deleting planId", planId);
    toast.promise(deleteSubscription(planId).unwrap(), {
      loading: "Deleting subscription...",
      success: (res) => {
        refetch?.();
        setDeleteModalOpen(false);
        return <b>{res.message}</b>;
      },
      error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
    });
  };
  return (
    <div className="flex flex-col rounded-lg shadow-md w-full  bg-white  p-6 h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {packageName.charAt(0).toUpperCase() + packageName.slice(1)}
          </h3>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl font-bold text-blue-600">€{amount}</span>
          <span className="text-sm text-gray-500 ml-1">/{paymentType}</span>
        </div>
      </div>

      {/* Offers List */}
      <ul className="space-y-2 flex-grow mb-6">
        {packageOffer.map((offer, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-gray-700">{offer}</span>
          </li>
        ))}
      </ul>

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="w-full mt-5 bg-primary text-white py-2.5 rounded-md font-medium  transition"
      >
        Edit Subscription
      </button>
      <DeleteModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default SubscriptionCard;
