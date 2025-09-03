"use client";
import React from "react";
import { Button, Divider, Grid, Space } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

export default function SocialLogin() {
  const { lg } = Grid.useBreakpoint();
  return (
    <div>
      <Divider style={{ color: "#9ca3af", fontSize: "14px" }}>Or</Divider>

      <Space
        direction="horizontal"
        size="middle"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Button
          icon={<FcGoogle className=" text-2xl" />}
          style={{
            width: "100%",
            height: 54,
          }}
        >
          Login With Google
        </Button>
        <Button
          icon={<FaFacebook className="text-[#18ACFE] text-2xl" />}
          style={{
            width: "100%",

            height: 54,
          }}
        >
          Login With Facebook
        </Button>
        {/* <Button
          icon={<FaApple className="text-2xl" />}
          style={{
            width: lg ? "132px" : "86px",
            height: 54,
          }}
        /> */}
      </Space>
    </div>
  );
}
