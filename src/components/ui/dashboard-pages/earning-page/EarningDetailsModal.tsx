"use client";

import React from "react";
import { Modal, Button, Descriptions, Tag, Avatar, Space } from "antd";
import dayjs from "dayjs";
import { getFileIcon } from "./EarningPage";

interface EarningDetailsModalProps {
  open: boolean;
  record: any;
  onClose: () => void;
}

const EarningDetailsModal: React.FC<EarningDetailsModalProps> = ({
  open,
  record,
  onClose,
}) => {
  return (
    <Modal
      title="Earning Details"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      style={{
        height: "80vh",
        overflowY: "auto",
      }}
    >
      {record && (
        <>
          <Descriptions title="Transaction Information" bordered column={1}>
            <Descriptions.Item label="Transaction ID">
              {record.trxId}
            </Descriptions.Item>
            <Descriptions.Item label="Payment ID">
              {record.paymentId}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color="green">{record.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              ${record.price.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Units Sold">
              {record.unitsSold}
            </Descriptions.Item>
            <Descriptions.Item label="Total Earning">
              ${record.earning.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Created Date">
              {dayjs(record.createdAt).format("MMMM D, YYYY h:mm A")}
            </Descriptions.Item>
            <Descriptions.Item label="Updated Date">
              {dayjs(record.updatedAt).format("MMMM D, YYYY h:mm A")}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            title="Customer Information"
            bordered
            column={1}
            style={{ marginTop: "16px" }}
          >
            <Descriptions.Item label="Name">
              <Space>
                <Avatar src={record.user.image} size="small" />
                {record.user.name}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {record.user.email}
            </Descriptions.Item>
            <Descriptions.Item label="Contact">
              {record.user.contact}
            </Descriptions.Item>
          </Descriptions>

          {record.template && (
            <Descriptions
              title="Template Information"
              bordered
              column={1}
              style={{ marginTop: "16px" }}
            >
              <Descriptions.Item label="Title">
                {record.template.title}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {record.template.description}
              </Descriptions.Item>
              <Descriptions.Item label="File">
                <Space>
                  {getFileIcon(record.file)}
                  {record.file.split("/").pop()}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          )}
        </>
      )}
    </Modal>
  );
};

export default EarningDetailsModal;
