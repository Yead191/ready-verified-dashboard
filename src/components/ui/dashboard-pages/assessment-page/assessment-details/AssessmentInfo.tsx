import React from "react";
import { Card, Descriptions, InputNumber, Tag, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

interface Props {
  data: {
    status: string;
    date: string;
    start_time: string;
    end_time: string;
    mark: number;
  };
  getStatusColor: (status: string) => string;
  givenMark: number | null;
  setGivenMark: any;
}

const AssessmentInfo: React.FC<Props> = ({
  data,
  getStatusColor,
  givenMark,
  setGivenMark,
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
      <Descriptions.Item label={data?.mark ? "Total Mark" : "Give Marks"}>
        {data?.mark ? (
          <Text
            strong
            style={{
              color: data.mark >= 70 ? "green" : "red",
              fontSize: 16,
            }}
          >
            {data.mark}/100
          </Text>
        ) : (
          <>
            <InputNumber
              min={0}
              max={100}
              value={givenMark ?? undefined}
              onChange={(value) => setGivenMark(value)}
              placeholder="Enter marks (0-100)"
            />
            <Text style={{ marginLeft: 8 }} type="secondary">
              /100
            </Text>
          </>
        )}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);

export default AssessmentInfo;
