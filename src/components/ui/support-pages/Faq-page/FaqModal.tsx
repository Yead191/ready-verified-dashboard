import React from "react";
import { Modal, Form, Input, Divider } from "antd";
import PrimaryButton from "@/components/shared/PrimaryButton";

const { TextArea } = Input;
interface FaqModalProps {
  isModalVisible: boolean;
  handleModalCancel: () => void;
  handleModalOk: (values: any) => void;
  form: any;
  editingItem: any;
}
export default function FaqModal({
  isModalVisible,
  handleModalCancel,
  handleModalOk,
  form,
  editingItem,
}: FaqModalProps) {
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleModalCancel}
      footer={null}
      width={537}
      closeIcon={<span style={{ fontSize: "20px", color: "#999" }}>×</span>}
      styles={{
        header: { borderBottom: "none", paddingBottom: 0 },
        body: { paddingTop: 0 },
      }}
    >
      <div style={{ padding: "0 8px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#333",
            // borderBottom: "1px solid #e8e8e8",
          }}
        >
          {editingItem ? "Edit FAQ" : "Add FAQ"}
        </h3>
        <Divider
          style={{
            height: "1.5px",
            backgroundColor: "#e8e8e8",
          }}
        />

        <Form form={form} layout="vertical">
          <Form.Item
            name="question"
            label={
              <span style={{ color: "#666", fontSize: "14px" }}>Question</span>
            }
            rules={[{ required: true, message: "Please enter a title" }]}
            style={{ marginBottom: "20px" }}
          >
            <Input
              placeholder="Enter FAQ question here"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="answer"
            label={
              <span style={{ color: "#666", fontSize: "14px" }}>Answer</span>
            }
            rules={[{ required: true, message: "Please enter content" }]}
            style={{ marginBottom: "32px" }}
          >
            <TextArea
              rows={10}
              placeholder="Enter FAQ answer here"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                fontSize: "14px",
                resize: "none",
              }}
            />
          </Form.Item>
        </Form>

        <PrimaryButton
          size="large"
          text="Save & Change"
          fullWidth={true}
          handleEvent={handleModalOk}
        />
      </div>
    </Modal>
  );
}
