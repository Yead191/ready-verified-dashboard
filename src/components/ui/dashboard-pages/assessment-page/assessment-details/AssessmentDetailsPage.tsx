"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Space, Button, message } from "antd";
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import PersonalInfo from "./PersonalInfo";
import ProfessionalInfo from "./ProfessionalInfo";
import AssessmentInfo from "./AssessmentInfo";
import QnASection from "./QnASection";
import {
  useChangeStatusMutation,
  useGetSingleAssessmentQuery,
} from "@/redux/feature/assessmentApi/assessmentApi";
import CompleteAssessmentModal from "./CompleteAssessmentModal";
import Spinner from "@/components/shared/spinner/Spinner";
import { toast } from "sonner";

const { Title } = Typography;

// ---------- same AssessmentRecord interface and getStatusColor function here ----------
const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "green";
    case "pending":
      return "blue";
    case "reject":
      return "red";
    case "cancelled":
      return "orange";
    case "completed":
      return "purple";
    default:
      return "default";
  }
};
const AssessmentDetailsPage = ({ id }: { id: string }) => {
  const router = useRouter();
  //   const [assessment, setAssessment] = useState(null);
  const [editingMarks, setEditingMarks] = useState<string | null>(null);
  const [tempMarks, setTempMarks] = useState<number>(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  // get single assessment details
  const {
    data: assessmentData,
    isLoading,
    refetch,
  } = useGetSingleAssessmentQuery(id);
  const assessment = assessmentData?.data || {};

  const [givenMark, setGivenMark] = useState<number | null>(
    assessment?.mark || null
  );

  // complete assessment
  const [changeStatus] = useChangeStatusMutation();

  console.log(assessmentData, id);
  const handleEditMarks = (questionId: string, currentMarks: number) => {
    setEditingMarks(questionId);
    setTempMarks(currentMarks);
  };

  const handleSaveMarks = (questionId: string) => {
    // if (!assessment) return;
    // setAssessment((prev) => ({
    //   ...prev!,
    //   qna: prev!.qna.map((q) =>
    //     q._id === questionId ? { ...q, marks: tempMarks } : q
    //   ),
    // }));
    // setEditingMarks(null);
    // message.success("Marks updated successfully");
  };

  const handleCompleteAssessment = () => {
    toast.promise(
      changeStatus({
        id: id,
        data: { status: "completed", mark: givenMark },
      }).unwrap(),
      {
        loading: "Updating status...",
        success: (res) => {
          setShowCompleteModal(false);
          refetch();
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      }
    );
  };

  const getTotalMarks = () => {
    if (!assessment) return { obtained: 0, total: 0 };
    return assessment?.qna?.reduce(
      (acc: any, q: any) => ({
        obtained: acc.obtained + (q.marks || 0),
        total: acc.total + (q.max_marks || 10),
      }),
      { obtained: 0, total: 0 }
    );
  };

  if (!assessment || isLoading) return <Spinner />;

  const totalMarks = getTotalMarks();
  // return <p>nothing</p>
  return (
    <div>
      <section>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
            Back to Assessments
          </Button>
        </Space>

        <Title level={2}>Assessment Details</Title>

        <PersonalInfo
          data={assessment.personal_information}
          user={assessment?.user}
          category={assessment?.category}
        />
        <ProfessionalInfo data={assessment?.professional_information} />
        <AssessmentInfo
          data={assessment}
          getStatusColor={getStatusColor}
          givenMark={givenMark}
          setGivenMark={setGivenMark}
        />

        <QnASection
          qna={assessment.qna}
          editingMarks={editingMarks}
          tempMarks={tempMarks}
          onEdit={handleEditMarks}
          onSave={handleSaveMarks}
          onCancel={() => setEditingMarks(null)}
          setTempMarks={setTempMarks}
        />

        <Space>
          {assessment.status !== "completed" && (
            <Button
              style={{
                backgroundColor: "#1a5fa4",
                color: "white",
                height: 40,
              }}
              icon={<CheckOutlined />}
              onClick={() => setShowCompleteModal(true)}
            >
              Complete Assessment
            </Button>
          )}
          <Button
            style={{
              height: 40,
            }}
            onClick={() => router.back()}
          >
            Back to List
          </Button>
        </Space>
      </section>

      <CompleteAssessmentModal
        open={showCompleteModal}
        onOk={handleCompleteAssessment}
        onCancel={() => setShowCompleteModal(false)}
        totalMarks={givenMark ? givenMark : 0}
      />
    </div>
  );
};

export default AssessmentDetailsPage;
