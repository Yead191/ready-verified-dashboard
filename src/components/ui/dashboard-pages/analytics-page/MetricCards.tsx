import { metricsData } from "@/data/metricsData";
import { Card } from "antd";

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {metricsData.map((metric, index) => (
        <Card
          key={index}
          className="bg-white shadow-sm"
          styles={{
            body: {
              padding: "16px",
            },
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
          <div className="mt-2 flex items-center text-xs">
            <span className="font-medium text-green-600">{metric.growth}</span>
            <span className="ml-1 text-gray-500">{metric.period}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
