"use client";

import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
  Tooltip,
} from "recharts";
import { YearSelector } from "./YearSelector";
import { earningData } from "@/data/chartData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{`${label} 2020`}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">Revenue:</span>
            <span className="text-sm font-medium">{data.revenue}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">Index Value:</span>
            <span className="text-sm font-medium">{data.value}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">Growth:</span>
            <span
              className={`text-sm font-medium ${
                data.growth.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.growth}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function EarningChart() {
  return (
    <div className="bg-white shadow-sm mt-4 p-6 rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Earning</h2>
        <YearSelector defaultValue="2025" />
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={earningData}
            margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#60a5fa",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: "#60a5fa", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, fill: "#60a5fa" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
