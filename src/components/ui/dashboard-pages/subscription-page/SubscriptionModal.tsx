"use client";

import type React from "react";
import { useEffect } from "react";
import { Modal, Form, Input, Select, Button, Space } from "antd";
import {
  InfoCircleOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

interface SubscriptionModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: any;
  initialData?: any | null;
  mode: "add" | "edit";
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialData,
  mode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (mode === "edit" && initialData) {
        form.setFieldsValue(initialData);
      } else {
        form.resetFields();
        form.setFieldsValue({ packageOffer: [""] });
      }
    }
  }, [visible, mode, initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={mode === "add" ? "Add Subscription" : "Edit Subscription"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={480}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: 24 }}
      >
        <Form.Item
          label="Package Name"
          name="name"
          rules={[{ required: true, message: "Please select package name" }]}
        >
          <Select placeholder="Select Package Name" size="large">
            <Option value="Free">Free</Option>
            <Option value="Basic Package">Basic Package</Option>
            <Option value="Premium Package">Premium Package</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Enter Amount"
          name="price"
          rules={[
            { required: true, message: "Please enter amount" },
            // { type: "number", min: 0, message: "Amount must be positive" },
          ]}
        >
          <Input
            placeholder="Enter Amount"
            size="large"
            type="number"
            inputMode="numeric"
          />
        </Form.Item>

        <Form.Item
          label="Payment Type"
          name="recurring"
          rules={[{ required: true, message: "Please select payment type" }]}
        >
          <Select placeholder="Select Payment Type" size="large">
            <Option value="month">Monthly</Option>
            <Option value="year">Yearly</Option>
            {/* <Option value="one-time">One Time</Option> */}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <Space>
              Package Offer
              <InfoCircleOutlined style={{ color: "#1890ff" }} />
            </Space>
          }
        >
          <Form.List
            name="features"
            rules={[
              {
                validator: async (_, offers) => {
                  if (!offers || offers.length < 1) {
                    return Promise.reject(
                      new Error("At least one offer is required")
                    );
                  }
                  const validOffers = offers.filter(
                    (offer: string) => offer && offer.trim()
                  );
                  if (validOffers.length < 1) {
                    return Promise.reject(
                      new Error("At least one valid offer is required")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8, width: "100%" }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter offer description",
                        },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input
                        placeholder="Enter offer description"
                        size="large"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(name)}
                        style={{
                          color: "#ff4d4f",
                          fontSize: 16,
                          cursor: "pointer",
                          padding: "8px",
                        }}
                      />
                    )}
                  </Space>
                ))}
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{
                      height: 40,
                      borderRadius: 6,
                      borderColor: "#1890ff",
                      color: "#1890ff",
                    }}
                  >
                    Add Offer
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 32 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{
              height: 48,
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 16,
              backgroundColor: "#1a5fa4",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubscriptionModal;
