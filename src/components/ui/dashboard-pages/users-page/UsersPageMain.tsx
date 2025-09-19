"use client";

import { use, useState } from "react";
import { Table, Button, Tooltip } from "antd";
import { User } from "@/data/mockUsers";
import UserDetailsModal from "./UserDetailsModal";
import { toast } from "sonner";
import { Info, InfoIcon, Lock, Unlock } from "lucide-react";
import {
  useGetUsersQuery,
  useLockUserMutation,
} from "@/redux/feature/users/usersApi";
import { imgUrl } from "@/app/(dashboard)/layout";

// Define the User interface

export default function UsersPageMain() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"CANDIDATE" | "EMPLOYEE">(
    "CANDIDATE"
  );
  const [page, setPage] = useState(1);
  // console.log(activeTab);
  const { data: usersData, refetch } = useGetUsersQuery({
    role: activeTab,
    page,
    limit: 10,
  });
  // lock user
  const [lockUser] = useLockUserMutation();
  // console.log(usersData);

  const paginationData = usersData?.pagination;
  const handleViewDetails = (user: any) => {
    setSelectedUser(user._id);
    setIsModalVisible(true);
  };

  const handleLockToggle = (userId: any) => {
    console.log(userId);
    toast.promise(lockUser(userId).unwrap(), {
      loading: "Locking user...",
      success: (res) => {
        refetch();
        return `Status updated to ${
          res.data.status === "active" ? "active" : "locked"
        }!`;
      },
      error: (err) => `Error: ${err?.data?.message || "Something went wrong"}`,
    });
  };

  // Define AntD Table columns
  const columns = [
    {
      title: "S.No",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "px-6 py-4 whitespace-nowrap",
      render: (text: string, record: User) => (
        <div className="flex items-center gap-3">
          <img
            src={imgUrl + record?.image || "/placeholder.svg"}
            alt={text}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      className: "px-6 py-4 whitespace-nowrap",
      render: (subscription: any) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            subscription === "Basic Package"
              ? "bg-gray-100 text-gray-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {subscription && subscription}
        </span>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "px-6 py-4 whitespace-nowrap",
      render: (status: any) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status === "active" ? "Active" : "Locked"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      className:
        "px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center",
      render: (_: any, record: any) => (
        <div className="flex gap-2 justify-end items-center">
          <Tooltip title="View Details">
            <Button
              type="text"
              onClick={() => handleViewDetails(record)}
              className="text-blue-600 hover:text-blue-900 p-1 rounded"
              title="View Details"
              icon={<Info size={20} />}
            />
          </Tooltip>
          <Tooltip
            title={record.status === "delete" ? "Unlock User" : "Lock User"}
          >
            <Button
              type="text"
              onClick={() => handleLockToggle(record._id)}
              className={`p-1 rounded  ${
                record.isLocked
                  ? "text-green-600 hover:text-green-900"
                  : "text-red-600 hover:text-red-900"
              }`}
              title={record.status === "delete" ? "Unlock User" : "Lock User"}
              icon={
                record.status === "delete" ? (
                  <Lock size={20} color="red" />
                ) : (
                  <Unlock size={20} />
                )
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className=" rounded-lg overflow-hidden">
      {/* Custom Tabs */}
      <div className=" mb-2 w-full max-w-lg">
        <div className="flex  items-center rounded-lg py-[6px]  gap-4 ">
          <button
            onClick={() => setActiveTab("CANDIDATE")}
            className={`flex-1 text-sm  px-3 py-2 rounded-[8px] transition ${
              activeTab === "CANDIDATE"
                ? "bg-[#1A5FA4]  text-white font-medium"
                : "text-neutral-500 hover:text-neutral-800 border border-[#ABABAB]"
            }`}
          >
            CANDIDATE
          </button>
          <button
            onClick={() => setActiveTab("EMPLOYEE")}
            className={`flex-1 text-sm  px-3 py-2 rounded-[8px] transition ${
              activeTab === "EMPLOYEE"
                ? "bg-[#1A5FA4]  text-white font-medium"
                : "text-neutral-500 hover:text-neutral-800 border border-[#ABABAB]"
            }`}
          >
            EMPLOYEE
          </button>
        </div>
      </div>
      <Table
        dataSource={usersData?.data}
        columns={columns}
        rowKey="_id"
        className="min-w-full"
        rowClassName="hover:bg-gray-50"
        scroll={{ x: true }}
        pagination={{
          total: paginationData?.total,
          pageSize: paginationData?.limit,
          current: paginationData?.page,
          onChange: (page) => setPage(page),
        }}
      />
      <UserDetailsModal
        userId={selectedUser}
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
}
