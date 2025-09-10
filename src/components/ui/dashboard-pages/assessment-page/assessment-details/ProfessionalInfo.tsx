import React from "react";
import { Card, Descriptions, Space, Tag } from "antd";

interface Props {
  data: {
    job_title: string;
    company: string;
    experience: string;
    linkedin_url: string;
    skills: string[];
    work_experience: string;
  };
}

const ProfessionalInfo: React.FC<Props> = ({ data }) => (
  <Card title="Professional Information" style={{ marginBottom: 16 }}>
    <Descriptions bordered column={2}>
      <Descriptions.Item label="Job Title">{data?.job_title}</Descriptions.Item>
      <Descriptions.Item label="Company">{data?.company}</Descriptions.Item>
      <Descriptions.Item label="Experience">
        {data?.experience}
      </Descriptions.Item>
      <Descriptions.Item label="LinkedIn">
        <a href={data?.linkedin_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="Skills" span={2}>
        <Space wrap>
          {data?.skills?.map((skill) => (
            <Tag key={skill} color="blue">
              {skill}
            </Tag>
          ))}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="Work Experience" span={2}>
        {data?.work_experience}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);

export default ProfessionalInfo;
