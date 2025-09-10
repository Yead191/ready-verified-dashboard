"use client";

import { useState } from "react";
import { Modal, Input, Button, Upload, Avatar, Row, Col } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import dayjs from "dayjs";
import { useUpdateProfileMutation } from "@/redux/feature/auth/authApi";
import { toast } from "sonner";
import { imgUrl } from "@/app/(dashboard)/layout";

interface FormDataState {
  name: string;
  contact: string;
}

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user?: any;
  refetch: () => void;
}

export default function EditProfileModal({
  visible,
  onClose,
  user,
  refetch,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<FormDataState>({
    name: user?.name || "",
    contact: user?.contact || "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    user?.image ? imgUrl + user.image : ""
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (field: keyof FormDataState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("You can only upload image files!");
        return false;
      }
      if (file.size / 1024 / 1024 >= 5) {
        toast.error("Image must be smaller than 5MB!");
        return false;
      }

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFileList([
        {
          uid: "-1",
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
        },
      ]);
      return false; 
    },
    fileList,
    onRemove: () => {
      setSelectedImage(null);
      setImagePreview(user?.image ? imgUrl + user.image : "");
      setFileList([]);
    },
    maxCount: 1,
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return toast.error("Please enter your name");
    if (!formData.contact.trim())
      return toast.error("Please enter your contact number");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("contact", formData.contact);
    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      toast.promise(updateProfile(data).unwrap(), {
        loading: "Updating profile...",
        success: (res) => {
          refetch();
          onClose();
          return <b>{res.message}</b>;
        },
        error: "An error occurred while updating your profile",
      });
    } catch {
      toast.error("An error occurred while updating your profile");
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      title="Edit Profile"
      centered
    >
      <div style={{ padding: 20, backgroundColor: "white", borderRadius: 12 }}>
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <Avatar
            size={96}
            src={imagePreview || "/placeholder.svg?height=96&width=96"}
            icon={<UserOutlined />}
            style={{ border: "2px solid #f0f0f0" }}
          />
          <Upload {...uploadProps} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload New Image</Button>
          </Upload>
          {selectedImage && (
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(user?.image ? imgUrl + user.image : "");
                setFileList([]);
              }}
            >
              Remove Image
            </Button>
          )}
        </div>

        {/* Form Fields */}
        <Row gutter={20}>
          <Col span={12}>
            <label className="block mb-2 font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your name"
            />
          </Col>
          <Col span={12}>
            <label className="block mb-2 font-medium">Contact number</label>
            <Input
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              placeholder="Enter contact number"
            />
          </Col>
        </Row>

        {/* Save Button */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          
          <Button
            type="primary"
            onClick={handleSave}
            loading={isLoading}
            style={{
              background: "#1a5fa4",
              borderColor: "#1a5fa4",
              height: "40px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              width: "40%",
            }}
          >
            Save & Change
          </Button>
        </div>
      </div>
    </Modal>
  );
}
