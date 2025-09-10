import React from "react";
import { Card, Descriptions, Space, Avatar } from "antd";
import { imgUrl } from "@/app/(dashboard)/layout";

interface Props {
  user: any;
  data: {
    name: string;
    email: string;
    contact: string;
    headline: string;
    address: string;
    overview: string;
  };
  category: {
    title: string;
  };
}

const PersonalInfo: React.FC<Props> = ({ data, category, user }) => {
  console.log(data);
  return (
    <Card title="Personal Information" style={{ marginBottom: 16 }}>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Name" span={2}>
          <Space>
            <Avatar src={imgUrl + user?.image} size="default" />
            {data?.name}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Contact">{data?.contact}</Descriptions.Item>
        <Descriptions.Item label="Headline" span={2}>
          {data?.headline}
        </Descriptions.Item>
        <Descriptions.Item label="Address">{data?.address}</Descriptions.Item>
        <Descriptions.Item label="Category">
          {category && category?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Overview" span={2}>
          {data?.overview}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PersonalInfo;
