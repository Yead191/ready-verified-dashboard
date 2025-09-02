import React from "react";
import { MetricCards } from "./MetricCards";
import { UserGroupChart } from "./UserGroupChart";
import { EarningChart } from "./EarningChart";

export default function AnalyticsPageMain() {
  return (
    <section className="flex flex-col ">
      <MetricCards />
      <UserGroupChart />
      <EarningChart />
    </section>
  );
}
