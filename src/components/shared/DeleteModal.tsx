import { Button, Modal } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  handleDelete: () => void;
}

export default function DeleteModal({
  isOpen,
  onCancel,
  handleDelete,
}: DeleteModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      title="Delete Item"
      footer={null}
      width={480}
      centered
    >
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <ExclamationCircleOutlined style={{ fontSize: 32, color: "#ff4d4f" }} />
        <div>
          <h3 style={{ fontSize: "16px", marginBottom: 4 }}>Are you sure?</h3>
          <p style={{ color: "#595959" }}>
            This action cannot be undone. This will permanently delete the item
            and remove all associated data.
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#fff1f0",
          border: "1px solid #ffa39e",
          borderRadius: 6,
          padding: 12,
          marginBottom: 20,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <CloseCircleOutlined style={{ color: "#ff7875", fontSize: 18 }} />
        <p style={{ margin: 0, color: "#d4380d" }}>
          <strong>Warning:</strong> This is a destructive action that cannot be
          reversed.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleDelete} danger>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
