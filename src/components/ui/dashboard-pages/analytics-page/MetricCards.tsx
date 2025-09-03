"use client";
// import { metricsData } from "@/data/metricsData";
import { Card } from "antd";
import { Users, DollarSign, FileText, Crown, Layout } from "lucide-react";
import { useGetAnalyticsQuery } from "@/redux/feature/analyticsApi/analyticsApi";

export function MetricCards() {
  const { data: analyticsData } = useGetAnalyticsQuery({});
  console.log(analyticsData);
  const summary = analyticsData?.data?.summury;
  const metricsData = [
    {
      title: "Total User",
      value: summary?.totalUsers,
      growth: "+6.5%",
      period: "Since last week",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Earning",
      value: summary?.totalEarning,
      growth: "+6.5%",
      period: "Since last week",
      icon: DollarSign,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      title: "Total Assessments",
      value: summary?.totalAssessment,
      growth: "+6.5%",
      period: "Since last week",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Subscriptions",
      value: summary?.totalSubscription,
      growth: "+6.5%",
      period: "Since last week",
      icon: Crown,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Templates",
      value: summary?.totalTemplates,
      growth: "+8.9%",
      period: "Since last week",
      icon: Layout,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {metricsData.map((metric, index) => (
        <Card
          key={index}
          className="bg-white "
          styles={{
            body: {
              padding: "16px",
            },
          }}
          style={{
            boxShadow: "3.53px 3.53px 18.54px 0 rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex items-center gap-3">
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${metric.iconBg}`}
              >
                <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-500">{metric.title}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
