export interface Template {
  id: string
  name: string
  type: "CV" | "Resume"
  date: string
  status: "Active" | "Inactive"
  fileName: string
  fileSize: string
  createdAt: Date
  description?: string
  tags?: string[]
}

export interface CreateTemplateForm {
  name: string
  type: "CV" | "Resume"
  description?: string
  tags?: string[]
  file: File
}

// Mock data for demonstration
export const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Professional Resume",
    type: "CV",
    date: "11/7/24",
    status: "Active",
    fileName: "professional-resume.pdf",
    fileSize: "2.5 MB",
    createdAt: new Date("2024-11-07"),
  },
  {
    id: "2",
    name: "Modern CV",
    type: "Resume",
    date: "8/4/12",
    status: "Inactive",
    fileName: "modern-cv.pdf",
    fileSize: "1.8 MB",
    createdAt: new Date("2024-08-04"),
  },
  {
    id: "3",
    name: "Executive Resume",
    type: "Resume",
    date: "4/2/15",
    status: "Active",
    fileName: "executive-resume.pdf",
    fileSize: "3.2 MB",
    createdAt: new Date("2024-04-02"),
  },
  {
    id: "4",
    name: "Creative Portfolio",
    type: "CV",
    date: "6/25/19",
    status: "Active",
    fileName: "creative-portfolio.pdf",
    fileSize: "4.1 MB",
    createdAt: new Date("2024-06-25"),
  },
];