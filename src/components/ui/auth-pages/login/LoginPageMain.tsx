"use client";
import { Form, Input, Button, Checkbox, Typography, Grid } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SocialLogin from "./SocialLogin";
import { useLoginMutation } from "@/redux/feature/auth/authApi";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

export default function LoginPageMain() {
  const { lg } = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const router = useRouter();
  const [login] = useLoginMutation();
  const onFinish = (values: any) => {
    // console.log("Form values:", values);
    const user = {
      email: values.email,
      password: values.password,
    };

    toast.promise(login(user).unwrap(), {
      loading: "Logging in...",
      success: (res) => {
        // console.log(res);
        Cookies.set("accessToken", res?.data || "");
        localStorage.removeItem("resetToken");
        router.push("/dashboard/analytics");
        return <b>{res.message}</b>;
      },
      error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
    });
  };
  return (
    <section className="">
      <div
        className="justify-center items-center p-4 lg:p-14 shadow-md  rounded-xl w-full  bg-white min-w-[600px]"
        style={{ width: "100%" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title
            level={2}
            style={{
              margin: "0 0 8px 0",
              color: "",
              fontSize: lg ? "28px" : "24px",
            }}
          >
            Log In to Your Account
          </Title>
          <Text style={{ color: "#6b7280", fontSize: lg ? "14px" : "14px" }}>
            Please enter your email and password to continue
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

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
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

          <div className="flex items-center justify-between -mt-6">
            <Form.Item
              style={{ marginTop: "12px" }}
              name="remember"
              valuePropName="checked"
            >
              <Checkbox style={{ color: "#003877" }}>Remember me</Checkbox>
            </Form.Item>
            <Link href="/auth/forgot-password">
              <p className="text-[14px] text-primary font-medium hover:underline">
                Forgot Password?
              </p>
            </Link>
          </div>

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
                marginTop: "-12px",
              }}
            >
              Log In →
            </Button>
          </Form.Item>

          {/* social Login */}
          {/* <SocialLogin /> */}
        </Form>
      </div>
    </section>
  );
}
