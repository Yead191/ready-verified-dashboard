import React from "react";
import { Card, Typography, Radio, Space, Button, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

interface Props {
  qna: Array<{
    question: string;
    answer: string;
    _id: string;
    type?: "mcq" | "fill_gap";
    options?: string[];
    correct_answer?: string;
    marks?: number;
    max_marks?: number;
  }>;
  editingMarks: string | null;
  tempMarks: number;
  onEdit: (id: string, current: number) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  setTempMarks: (val: number) => void;
}

const QnASection: React.FC<Props> = ({
  qna,
  editingMarks,
  tempMarks,
  onEdit,
  onSave,
  onCancel,
  setTempMarks,
}) => (
  <Card title="Questions & Answers" style={{ marginBottom: 16 }}>
    {qna.map((qa, index) => (
      <Card
        key={qa._id}
        type="inner"
        title={`Question ${index + 1} (${
          qa.type === "mcq" ? "Multiple Choice" : "Fill in the Gap"
        })`}
        style={{ marginBottom: 16 }}
      >
        <Paragraph strong>{qa.question}</Paragraph>

        {qa.type === "mcq" && qa.options && (
          <div style={{ marginBottom: 16 }}>
            <Text strong>Options:</Text>
            <Radio.Group value={qa.answer} disabled style={{ marginTop: 8 }}>
              <Space direction="vertical">
                {qa.options.map((option) => (
                  <Radio
                    key={option}
                    value={option}
                    style={{
                      color: option === qa.correct_answer ? "green" : "inherit",
                      fontWeight:
                        option === qa.correct_answer ? "bold" : "normal",
                    }}
                  >
                    {option} {option === qa.correct_answer && "✓"}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <Text strong>Answer:</Text>
          <div
            style={{
              padding: 8,
              backgroundColor: "#f5f5f5",
              borderRadius: 4,
              marginTop: 4,
            }}
          >
            {qa.answer}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Text strong>Marks:</Text>
          {editingMarks === qa._id ? (
            <Space>
              <InputNumber
                min={0}
                max={qa.max_marks || 10}
                value={tempMarks}
                onChange={(value) => setTempMarks(value || 0)}
                style={{ width: 80 }}
              />
              <Text>/ {qa.max_marks || 10}</Text>
              <Button
                type="primary"
                size="small"
                onClick={() => onSave(qa._id)}
              >
                Save
              </Button>
              <Button size="small" onClick={onCancel}>
                Cancel
              </Button>
            </Space>
          ) : (
            <Space>
              <Text
                strong
                style={{
                  color:
                    (qa.marks || 0) >= (qa.max_marks || 10) * 0.7
                      ? "green"
                      : "red",
                }}
              >
                {qa.marks || 0} / {qa.max_marks || 10}
              </Text>
              <Button
                type="text"
                icon={<EditOutlined />}
                size="small"
                onClick={() => onEdit(qa._id, qa.marks || 0)}
              >
                Edit
              </Button>
            </Space>
          )}
        </div>
      </Card>
    ))}
  </Card>
);

export default QnASection;
