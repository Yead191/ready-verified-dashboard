import { Button } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

interface PageHeadingProps {
  onClick: () => void;
  label: string;
}
export default function PageHeading({ onClick, label }: PageHeadingProps) {
  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between rounded-lg ">
      <h1 className="text-xl font-semibold text-gray-800 m-0">
        Create New {label}
      </h1>
      <Button
        size="large"
        icon={<PlusOutlined />}
        onClick={onClick}
        className="!bg-[#1a5fa4] !text-white "
      >
        Create
      </Button>
    </div>
  );
}
