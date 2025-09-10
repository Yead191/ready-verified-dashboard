"use client";

import React from "react";
import { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Avatar,
  Typography,
  Space,
  Card,
  Select,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { mockAssessment } from "@/data/assessment";
import {
  useChangeStatusMutation,
  useGetAssessmentQuery,
} from "@/redux/feature/assessmentApi/assessmentApi";
import Link from "next/link";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { imgUrl } from "@/app/(dashboard)/layout";
import { toast } from "sonner";

const { Title, Text } = Typography;
const { Option } = Select;

const AssessmentPage = () => {
  // get assessment data
  const { data: assessments, refetch } = useGetAssessmentQuery(null);
  const assessmentData = assessments?.data || [];

  //   handle change status
  const [changeStatus] = useChangeStatusMutation();
  const handleStatusChange = (recordId: any, newStatus: any) => {
    console.log(recordId, newStatus);
    toast.promise(
      changeStatus({ id: recordId, data: { status: newStatus } }).unwrap(),
      {
        loading: "Updating status...",
        success: (res) => {
          refetch();
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      }
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: any) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "personal_information",
      key: "name",
      width: 200,
      render: (personalInfo: any, record: any) => (
        <Space>
          <Avatar src={imgUrl + record?.user?.image || ""} size="small" />
          <Text strong>{personalInfo?.name}</Text>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category: any) => <Text>{category?.title}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (date: any) => dayjs(date).format("M/D/YY"),
    },
    {
      title: "Start time/End time",
      key: "time",
      width: 180,
      render: (_: any, record: any) => (
        <Text>
          {dayjs(record.start_time).format("h:mm A")} -{" "}
          {dayjs(record.end_time).format("h:mm A")}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: any, record: any) => (
        <Select
          value={status}
          onChange={(value: any) => handleStatusChange(record._id, value)}
          style={{ width: 120 }}
          size="small"
          className="assessment-status-select"
        >
          <Option value="pending" style={{ background: "blue" }}>
            <Tag color="blue">Pending</Tag>
          </Option>
          <Option value="approved">
            <Tag color="green">Approved</Tag>
          </Option>
          <Option value="rejected">
            <Tag color="red">Rejected</Tag>
          </Option>
          <Option value="cancelled">
            <Tag color="orange">Cancelled</Tag>
          </Option>
          <Option value="completed">
            <Tag color="purple">Completed</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: "Job Meeting",
      key: "zoomLink",
      width: 120,
      align: "center" as any,
      render: (_: any, record: any) => (
        <a href={record.zoomLink} target="_blank" rel="noopener noreferrer">
          <Button
            disabled={!record.zoomLink}
            style={{
              backgroundColor: !record.zoomLink ? "gray" : "#1a5fa4",
              color: "white",
              border: "none",
            }}
          >
            {record?.zoomLink ? "Join Meeting" : "Not Available"}
          </Button>
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center" as any,
      render: (_: any, record: any) => (
        <Link href={`/assessment/${record._id}`}>
          <Button
            type="text"
            icon={<InfoCircleOutlined />}
            style={{ color: "#1890ff" }}
          />
        </Link>
      ),
    },
  ];

  return (
    <section>
      <Table
        columns={columns}
        dataSource={assessmentData}
        rowKey={(record: any) => record._id}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: any, range: any) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: 1000 }}
        size="middle"
      />
    </section>
  );
};

export default AssessmentPage;
