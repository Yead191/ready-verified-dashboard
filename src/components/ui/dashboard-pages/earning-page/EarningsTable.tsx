"use client";

import React from "react";
import { Table, Button, Tag, Typography, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { getFileIcon } from "./EarningPage";

const { Text } = Typography;

interface EarningsTableProps {
  data: any;
  onRowClick: (record: any) => void;
}

const EarningsTable: React.FC<EarningsTableProps> = ({ data, onRowClick }) => {
  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      key: "index",
      width: 60,
      render: (_:any, __:any, index:any) => index + 1,
    },
    {
      title: "Temp Name",
      dataIndex: "template",
      key: "template",
      width: 200,
      render: (template:any, record:any) => (
        <Space>
          {getFileIcon(record.file)}
          <Text strong>{template?.title || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type:any) => (
        <Tag color={type === "CV" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price:any) => `$${price.toFixed(2)}`,
    },
    {
      title: "Units Sold",
      dataIndex: "unitsSold",
      key: "unitsSold",
      width: 100,
      align: "center" as const,
    },
    {
      title: "Earning",
      dataIndex: "earning",
      key: "earning",
      width: 100,
      render: (earning:any) => `$${earning?.toFixed(2)}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      width: 120,
      render: (date:any) => dayjs(date).format("M/D/YY"),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_:any, record:any) => (
        <Button
          type="text"
          icon={<InfoCircleOutlined />}
          onClick={() => onRowClick(record)}
          style={{ color: "#1890ff" }}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="_id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      scroll={{ x: 800 }}
      size="middle"
    />
  );
};

export default EarningsTable;
