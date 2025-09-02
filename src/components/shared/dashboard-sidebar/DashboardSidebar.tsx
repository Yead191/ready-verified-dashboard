"use client";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { Layout, Menu, Button, Badge } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import Image from "next/image";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { sidebarMenuItems } from "../../../data/sidebarMenuItems";

const { Sider } = Layout;

export default function DashboardSidebar() {
  const [selectedKey, setSelectedKey] = useState("analytics");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setSelectedKey(pathname.split("/")[1] || "analytics");
  }, [pathname]);

  const handleLogOut = () => {
    toast.warning("Are you sure you want to log out?", {
      duration: 5000,
      description: "You will be logged out and redirected to the login page.",
      action: {
        label: "Logout",
        onClick: async () => {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          toast.success("Logged out successfully");
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Layout
      style={{ minHeight: "100vh", position: "sticky", top: "0px", zIndex: 10 }}
    >
      <Sider width={280}>
        {/* Logo Section */}
        <Link href={"/analytics"}>
          <div className="flex items-center justify-center h-[84px]  bg-white mb-2 rounded-b-lg">
            <Image
              className="w-[57px] h-[60px] object-cover overflow-visible"
              src="/logo.png"
              alt="ready verified Logo"
              width={57}
              height={60}
              unoptimized
            />
          </div>
        </Link>

        {/* Main Menu */}
        <div
          style={{
            height: "calc(100vh - 92px)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "8px 8px 0px 0px ",
            padding: "16px 8px",
          }}
        >
          <div className="flex-1">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={sidebarMenuItems}
              style={{
                border: "none",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
              }}
              onClick={({ key }) => {
                router.push(`/${key}`);
              }}
            />
          </div>
          {/* Logout Button at Bottom */}
          <div className="p-2 mt-4">
            <Button
              type="primary"
              danger
              block
              onClick={handleLogOut}
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: 40,
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              <LogoutOutlined />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </Sider>
    </Layout>
  );
}
