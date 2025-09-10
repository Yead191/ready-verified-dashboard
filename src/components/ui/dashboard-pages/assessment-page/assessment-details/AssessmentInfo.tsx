import React from "react";
import { Card, Descriptions, Tag, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

interface Props {
  data: {
    status: string;
    date: string;
    start_time: string;
    end_time: string;
  };
  totalMarks: { obtained: number; total: number };
  getStatusColor: (status: string) => string;
}

const AssessmentInfo: React.FC<Props> = ({
  data,
  totalMarks,
  getStatusColor,
}) => (
  <Card title="Assessment Information" style={{ marginBottom: 16 }}>
    <Descriptions bordered column={2}>
      <Descriptions.Item label="Status">
        <Tag color={getStatusColor(data?.status)}>
          {data?.status?.toUpperCase()}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Date">
        {dayjs(data?.date).format("MMMM D, YYYY")}
      </Descriptions.Item>
      <Descriptions.Item label="Start Time">
        {dayjs(data?.start_time).format("h:mm A")}
      </Descriptions.Item>
      <Descriptions.Item label="End Time">
        {dayjs(data?.end_time).format("h:mm A")}
      </Descriptions.Item>
      <Descriptions.Item label="Duration">
        {dayjs(data?.end_time).diff(dayjs(data?.start_time), "minute")} minutes
      </Descriptions.Item>
      <Descriptions.Item label="Total Score">
        <Text
          strong
          style={{
            color:
              totalMarks?.obtained >= totalMarks?.total * 0.7 ? "green" : "red",
          }}
        >
          {totalMarks?.obtained}/{totalMarks?.total} (
          {((totalMarks?.obtained / totalMarks?.total) * 100).toFixed(1)}%)
        </Text>
      </Descriptions.Item>
    </Descriptions>
  </Card>
);

export default AssessmentInfo;
