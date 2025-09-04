"use client";

import { Modal, Spin } from "antd";
import { useGetSingleUserQuery } from "@/redux/feature/users/usersApi";
import { Mail, Phone, Briefcase, Linkedin, Languages } from "lucide-react";
import { imgUrl } from "@/app/(dashboard)/layout";

interface UserDetailsModalProps {
  userId: any | null;
  visible: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({
  userId,
  visible,
  onClose,
}: UserDetailsModalProps) {
  const { data, isLoading } = useGetSingleUserQuery(userId!, {
    skip: !userId,
  });

  if (!visible) return null;

  if (isLoading) {
    return (
      <Modal open={visible} onCancel={onClose} footer={null} centered>
        <div className="flex justify-center py-6">
          <Spin size="large" />
        </div>
      </Modal>
    );
  }

  const user = data?.data;
  if (!user) return null;
  console.log(user);

  const prof = user?.proffessional_details || {};

  const infoItems = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email, icon: <Mail size={16} /> },
    { label: "Contact Number", value: user.contact, icon: <Phone size={16} /> },
    {
      label: "Subscription",
      value: user.subscription?.package?.name || "N/A",
    },
  ];

  const profItems = [
    {
      label: "Job Title",
      value: prof.job_title,
      icon: <Briefcase size={16} />,
    },
    { label: "Industry", value: prof.industry },
    {
      label: "Experience",
      value: prof.experience ? `${prof.experience} years` : "N/A",
    },
    {
      label: "Resume",
      value: prof.resume_url,
      isLink: true,
    },
    {
      label: "LinkedIn Profile",
      value: prof.linkedin_url,
      isLink: true,
      icon: <Linkedin size={16} />,
    },
  ];

  const addlItems = [
    {
      label: "Skills",
      value: prof.skills?.length ? prof.skills.join(", ") : "N/A",
    },
    {
      label: "Languages",
      value: prof.languages?.length ? prof.languages.join(", ") : "N/A",
      icon: <Languages size={16} />,
    },
  ];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="rounded-lg max-h-[90vh] overflow-y-auto"
      centered
    >
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={imgUrl + user.image || "/placeholder.svg"}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{prof.job_title}</p>
            <div className="flex gap-2 mt-2">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.subscription?.package?.name === "Free"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.subscription?.package?.name || "N/A"}
              </span>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg">
            {infoItems.map(({ label, value, icon }, index) => (
              <div
                key={index}
                className={`p-4 border-b md:border-b-0 md:border-r border-gray-200`}
              >
                <label className="block text-sm font-medium text-gray-500">
                  {label}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {icon && icon}
                  <span className="text-gray-900">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Professional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg">
            {profItems.map(({ label, value, isLink, icon }, index) => (
              <div
                key={index}
                className="p-4 border-b md:border-b-0 md:border-r border-gray-200"
              >
                <label className="block text-sm font-medium text-gray-500">
                  {label}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {icon && icon}
                  {isLink && value ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-gray-900">{value || "N/A"}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg">
            {addlItems.map(({ label, value, icon }, index) => (
              <div
                key={index}
                className="p-4 border-b md:border-b-0 md:border-r border-gray-200"
              >
                <label className="block text-sm font-medium text-gray-500">
                  {label}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {icon && icon}
                  <span className="text-gray-900">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
