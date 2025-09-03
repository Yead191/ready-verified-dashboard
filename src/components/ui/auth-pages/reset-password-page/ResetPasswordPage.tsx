"use client";
import { Button, Card, Form, Grid, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

export default function ResetPasswordPage() {
  const { lg } = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log("update pass values:", values);
    Cookies.remove("resetEmail");
    toast.success("Password Reset Successfully!");
    router.push("/auth/update-success");
  };
  return (
    <section className="bg-white shadow-md  rounded-xl w-full max-w-[600px] px-8 py-12">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title
          level={2}
          style={{
            margin: "0 0 8px 0",
            color: "#1f2937",
            fontSize: lg ? "32px" : "24px",
          }}
        >
          Reset Your Password
        </Title>
        <Text style={{ color: "#6b7280", fontSize: lg ? "16px" : "14px" }}>
          Enter your registered email address, and we'll send you a code to
          reset your password.
        </Text>
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish} size="large">
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
            placeholder="Enter Your Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
            placeholder="Confirm Your Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#003877",
              borderColor: "#003877",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Confirm →
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
