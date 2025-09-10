import React from "react";
import { Modal } from "antd";

interface Props {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  totalMarks: { obtained: number; total: number };
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
    onOk={onOk}
    onCancel={onCancel}
    okText="Complete"
    cancelText="Cancel"
  >
    <p>Are you sure you want to mark this assessment as completed?</p>
    <p>
      Total Score:{" "}
      <strong>
        {totalMarks?.obtained}/{totalMarks?.total} (
        {((totalMarks?.obtained / totalMarks?.total) * 100).toFixed(1)}%)
      </strong>
    </p>
  </Modal>
);

export default CompleteAssessmentModal;
