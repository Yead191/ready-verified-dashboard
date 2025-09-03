"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  ConfigProvider,
  Typography,
} from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Text } = Typography;
import Cookies from "js-cookie";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "@/redux/feature/auth/authApi";
const VerifyOtp = () => {
  const router = useRouter();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const onFinish = async (values: any) => {
    const email = Cookies.get("resetEmail") || "";
    const verificationData = {
      email: email,
      oneTimeCode: parseInt(values.otp),
    };
    try {
      toast.promise(verifyOtp(verificationData).unwrap(), {
        loading: "Verifying code...",
        success: (res) => {
          console.log(res.data);
          Cookies.set("resetToken", res?.data || "", {
            expires: 1,
            path: "/",
          });
          router.push("/auth/reset-password");
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });
      router.push("/auth/reset-password");
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

  const handleResendOtp = () => {
    toast.promise(
      forgotPassword({ email: Cookies.get("resetEmail") || "" }).unwrap(),
      {
        loading: "Resending OTP...",
        success: (res) => {
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      }
    );
  };

  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div
        className="bg-white border border-[#EEEEEE] rounded-lg flex items-center justify-center"
        style={{ width: "655px", height: "60vh" }}
      >
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="text-center mb-4">
            <h1 className="text-2xl  font-semibold color-primary  ">
              Verification Code
            </h1>
            <p className="text-gray-500 text-[14px] mt-4">
              We sent a verification code to{" "}
              <span className="my-2 text-primary font-medium text-[16px]">
                {Cookies.get("resetEmail")}
              </span>
              . <br /> Please enter the 4 digit code below to continue.
            </p>
          </div>
          <Form
            onFinish={onFinish}
            layout="vertical"
            className=" w-full mx-auto"
            style={{
              width: "486px",
              margin: "auto",
              marginTop: 24,
            }}
            // form={form}
          >
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    // lineHeight: 3,
                    controlHeight: 65,
                    hoverBorderColor: "#286a25",
                    activeBorderColor: "#286a25",
                    borderRadius: 10,
                  },
                },
                token: {
                  colorPrimary: "#286a25",
                  colorBorder: "#286a25",
                },
              }}
            >
              <Form.Item
                className="flex items-center justify-center mx-auto w-full gap-7"
                name="otp"
                rules={[
                  { required: true, message: "Please input otp code here!" },
                ]}
              >
                <Input.OTP
                  style={{
                    width: "100%",
                    height: 48,
                  }}
                  className=""
                  variant="filled"
                  length={4}
                />
              </Form.Item>
            </ConfigProvider>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  fontWeight: "500",
                  marginTop: 10,
                  padding: "20px 0px",
                  backgroundColor: "#1A5FA4",
                }}
              >
                Confirm Code
              </Button>
            </Form.Item>
          </Form>
          <div className="flex items-center justify-center gap-3 mb-6 ">
            <Text>You have not received the email?</Text>

            <p
              onClick={handleResendOtp}
              className="login-form-forgot underline font-medium"
              style={{ color: "blue", cursor: "pointer" }}
            >
              Resend
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
