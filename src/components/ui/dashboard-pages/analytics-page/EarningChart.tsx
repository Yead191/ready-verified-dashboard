"use client";

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
import { useState } from "react";
import { useGetAnalyticsQuery } from "@/redux/feature/analyticsApi/analyticsApi";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{`${label} 2020`}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">Total Earning:</span>
            <span className="text-sm font-medium">{data.totalEarning}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function EarningChart() {
  const [year, setYear] = useState("2025");

  // console.log(year);
  const { data: analyticsData } = useGetAnalyticsQuery({ year });
  const earningData = analyticsData?.data?.earningsData || [];
  console.log(earningData);
  return (
    <div className="bg-white shadow-sm mt-4 p-6 rounded-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Earning</h2>
        <YearSelector defaultValue="2025" setYear={setYear} />
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
              dataKey="totalEarning"
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
