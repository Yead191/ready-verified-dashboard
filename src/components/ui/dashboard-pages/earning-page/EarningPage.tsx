"use client";

import type React from "react";
import { useState } from "react";
import { Typography } from "antd";
import EarningsTable from "./EarningsTable";
import EarningDetailsModal from "./EarningDetailsModal";
import { useGetEarningQuery } from "@/redux/feature/earningApi/earningApi";

const { Title } = Typography;

// 🔹 Utility function for file icon
export const getFileIcon = (fileName: string) => {
  const {
    FileTextOutlined,
    FilePdfOutlined,
    FileWordOutlined,
  } = require("@ant-design/icons");

//   if (fileName && fileName.includes(".pdf"))
//     return <FilePdfOutlined style={{ color: "#ff4d4f" }} />;
//   if ((fileName && fileName.includes(".docx")) || fileName.includes(".doc"))
//     return <FileWordOutlined style={{ color: "#1890ff" }} />;
  return <FileTextOutlined />;
};

const EarningsPage: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  //   get data
  const { data: earnings } = useGetEarningQuery(null);
  const earningsData = earnings?.data || [];
  console.log(earningsData);

  const showModal = (record: any) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedRecord(null);
    setModalVisible(false);
  };

  // Demo Data (could be fetched from API)

  return (
    <section>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Earnings Report
      </Title>

      <EarningsTable data={earningsData} onRowClick={showModal} />

      <EarningDetailsModal
        open={modalVisible}
        record={selectedRecord}
        onClose={handleModalClose}
      />
    </section>
  );
};

export default EarningsPage;
