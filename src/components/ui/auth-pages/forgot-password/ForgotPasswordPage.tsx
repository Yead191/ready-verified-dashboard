"use client";
import { Button, Card, Form, Grid, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { MailOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

export default function ForgotPasswordPage() {
  const { lg } = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    Cookies.set("resetEmail", values.email || "");
    toast.success("A 4-digit OTP has been sent to your email!");
    router.push("/auth/verify-otp");
  };
  return (
    <section className="min-h-screen flex justify-center items-center">
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "16px",
          // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          padding: lg ? "20px" : "0px",
          height: "60vh",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title
            level={2}
            style={{
              margin: "0 0 8px 0",
              color: "#1f2937",
              fontSize: lg ? "32px" : "24px",
            }}
          >
            Forgot Your Password
          </Title>
          <Text style={{ color: "#6b7280", fontSize: lg ? "16px" : "14px" }}>
            Enter your registered email address, and we'll send you a code to
            reset your password.
          </Text>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Enter Your Email"
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
                backgroundColor: "#1A5FA4",
                borderColor: "#1A5FA4",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Reset Password →
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
}
