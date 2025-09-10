import React from "react";
import { Modal } from "antd";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface Props {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  totalMarks: any;
}

const CompleteAssessmentModal: React.FC<Props> = ({
  open,
  onOk,
  onCancel,
  totalMarks,
}) => (
  <Modal
    title="Complete Assessment"
    open={open}
    footer={null}
    okText="Complete"
    centered
    onCancel={onCancel}
  >
    <p>Are you sure you want to mark this assessment as completed?</p>
    <p>
      Total Score: <strong>{totalMarks}/100</strong>
    </p>
    <div className="flex justify-end mt-4">
      <PrimaryButton text="Complete Assessment" handleEvent={onOk} />
    </div>
  </Modal>
);

export default CompleteAssessmentModal;
