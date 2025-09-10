"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Card, Row, Col, Typography, Select, Space, Badge, Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetProfileQuery } from "@/redux/feature/auth/authApi";
import { imgUrl } from "@/app/(dashboard)/layout";
import { useGetNotificationQuery } from "@/redux/feature/notification/notificationApi";
import { io } from "socket.io-client";

// import { user } from "@/data/user";

export default function DashboardHeader() {
  const { Title } = Typography;
  const pathname = usePathname();
  const socket = useMemo(() => io(imgUrl), []);

  const { data: user } = useGetProfileQuery(null);
  const { data: notificationData, refetch } = useGetNotificationQuery({});
  // socket implementation
  useEffect(() => {
    socket.on(`notification::${user?.data?._id}`, (data) => {
      // console.log(data);
      refetch();
    });
  }, [user?.data?._id]);

  const isLoading = false;
  const formatPathName = (slug: string | undefined) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  // console.log(user);
  // Check if the string looks like an ID (Mongo _id or numeric)
  const isIdSegment = (str: string) =>
    /^[a-f\d]{24}$/i.test(str) || /^\d+$/.test(str);

  const pathSegments = pathname?.split("/").filter(Boolean) || [];

  let targetSlug = pathSegments[pathSegments.length - 1];

  if (isIdSegment(targetSlug)) {
    targetSlug = pathSegments[pathSegments.length - 2];
  }

  // console.log(notificationData);
  return (
    <div
      style={{
        position: "sticky",
        left: "260px",
        right: 0,
        height: "84px",
        background: "white",
        padding: "22px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
        top: 0,
        borderRadius: "0 0 8px 8px",
      }}
    >
      <Title
        level={3}
        style={{ margin: 0, fontSize: 24, fontWeight: 500, color: "#1A5FA4" }}
      >
        {formatPathName(targetSlug)}
      </Title>
      <Space style={{ gap: "30px" }} size="middle">
        <Link href={"/notifications"}>
          <Badge
            size="small"
            style={{
              top: "6px",
              right: "6px",
            }}
            count={notificationData?.data?.unread || 0}
          >
            <BellOutlined
              style={{
                fontSize: "18px",
                color: "#666",
                backgroundColor: "#F1F1F9",
                padding: "8px",
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
          </Badge>
        </Link>
        <Link href={"/profile"} className="flex items-center gap-2">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          ) : (
            <>
              <Avatar src={imgUrl + user?.data?.image} size={40} />
              <div>
                <span className="leading-6 font-semibold text-black">
                  {user?.data?.name}
                </span>

                <p className="text-[12px] text-gray-400 -mt-1">
                  {user?.data?.role
                    ?.toLowerCase()
                    .split("_")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </p>
              </div>
            </>
          )}
        </Link>
      </Space>
    </div>
  );
}
