"use client";

import { Select } from "antd";
import { ChevronDown } from "lucide-react";

interface YearSelectorProps {
  defaultValue: string;
}

export function YearSelector({ defaultValue }: YearSelectorProps) {
  return (
    <Select
      defaultValue={defaultValue}
      className="w-20"
      variant="borderless"
      size="small"
      suffixIcon={<ChevronDown className="h-4 w-4 text-gray-500" />}
      style={{
        fontSize: "14px",
        color: "#6b7280",
      }}
      options={[
        { value: "2023", label: "2023" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
      ]}
    />
  );
}
