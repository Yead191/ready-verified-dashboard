"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { YearSelector } from "./YearSelector";
import { useState } from "react";
import { useGetAnalyticsQuery } from "@/redux/feature/analyticsApi/analyticsApi";

const CustomTooltip = ({ active, payload, label, year }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{`${label} ${year}`}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm text-gray-600">Candidate:</span>
            </div>
            <span className="text-sm font-medium">
              {data?.candidates?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span className="text-sm text-gray-600">Employee:</span>
            </div>
            <span className="text-sm font-medium">
              {data?.employees?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function UserGroupChart() {
  const [year, setYear] = useState("2025");

  // console.log(year);
  const { data: analyticsData } = useGetAnalyticsQuery({ year });
  const userData = analyticsData?.data?.users || [];
  // console.log(userData);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mt-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">User Group</h2>
        <YearSelector defaultValue="2025" setYear={setYear} />
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={userData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
              tickFormatter={(value: any) => `${value}`}
            />
            <Tooltip
              content={<CustomTooltip year={year} />}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Bar
              dataKey="candidates"
              fill="#60a5fa"
              radius={[2, 2, 0, 0]}
              name="candidates"
            />
            <Bar
              dataKey="employees"
              fill="#fb923c"
              radius={[2, 2, 0, 0]}
              name="employees"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
