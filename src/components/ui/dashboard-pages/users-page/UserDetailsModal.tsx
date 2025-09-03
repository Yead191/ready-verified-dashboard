"use client";

import { User } from "@/data/mockUsers";
import { Modal, Button } from "antd";

interface UserDetailsModalProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({
  user,
  visible,
  onClose,
}: UserDetailsModalProps) {
  if (!user || !visible) return null;

  const infoItems = [
    { label: "Name", value: user.name, icon: "user" },
    { label: "Email", value: user.email, icon: "mail" },
    { label: "Contact Number", value: user.contact, icon: "phone" },
    { label: "Address", value: user.address, icon: "environment" },
  ];

  const profItems = [
    { label: "Job Title", value: user.jobTitle },
    { label: "Experience", value: user.experience },
    { label: "Industry", value: user.industry },
    { label: "Resume", value: user.resume, isLink: true },
  ];

  const addlItems = [
    { label: "Previous Work Experience", value: user.previousWorkExperience },
    { label: "Educational Background", value: user.educationalBackground },
    { label: "Volunteer Experience", value: user.volunteerExperience },
    { label: "References", value: user.references },
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
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.jobTitle}</p>
            <div className="flex gap-2 mt-2">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.subscription === "Free"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.subscription}
              </span>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.isLocked
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.isLocked ? "Locked" : "Active"}
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
                className={`p-4 ${
                  index === 2 ? "border-b md:border-b-0 md:border-r" : ""
                } ${
                  index === 3 ? "" : "border-b md:border-b-0 md:border-r"
                } border-gray-200`}
              >
                <label className="block text-sm font-medium text-gray-500">
                  {label}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {icon && (
                    <span className="anticon">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            icon === "user"
                              ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              : icon === "mail"
                              ? "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              : icon === "phone"
                              ? "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              : icon === "environment"
                              ? "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              : ""
                          }
                        />
                      </svg>
                    </span>
                  )}
                  {typeof value === "string" && value.startsWith("http") ? (
                    <a
                      href={value}
                      className="text-blue-600 hover:text-blue-800 mt-1 block"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-gray-900">{value}</span>
                  )}
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
            {profItems.map(({ label, value, isLink }, index) => (
              <div
                key={index}
                className={`p-4 ${
                  index === 2 ? "border-b md:border-b-0 md:border-r" : ""
                } ${
                  index === 3 ? "" : "border-b md:border-b-0 md:border-r"
                } border-gray-200`}
              >
                <label className="block text-sm font-medium text-gray-500">
                  {label}
                </label>
                {isLink ? (
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 mt-1 block"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-gray-900 mt-1 block">{value}</span>
                )}
              </div>
            ))}
            <div className="p-4 md:col-span-2 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-500">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-500">
                LinkedIn Profile
              </label>
              <a
                href={user.linkedinProfile}
                className="text-blue-600 hover:text-blue-800 mt-1 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.linkedinProfile}
              </a>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg">
            {addlItems.map(({ label, value }, index) => (
              <div
                key={index}
                className={`p-4 ${
                  index === 2 ? "border-b md:border-b-0 md:border-r" : ""
                } ${
                  index === 3 ? "" : "border-b md:border-b-0 md:border-r"
                } border-gray-200`}
              >
                <label className="block text-sm font-medium text-gray-500">
                  {label}
                </label>
                <span className="text-gray-900 mt-1 block">{value}</span>
              </div>
            ))}
            <div className="p-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-500">
                Languages
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
