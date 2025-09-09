export interface Question {
  _id: string;
  question: string;
  type: "boolean" | "plain";
}

export interface Category {
  _id: string;
  title: string;
  icon?: string;
  date?: string;
  questions: Question[];
}

export interface AssessmentRecord {
  _id: string;
  personal_information: {
    name: string;
    email: string;
    contact: string;
    headline: string;
    address: string;
    overview: string;
  };
  professional_information: {
    job_title: string;
    company: string;
    experience: string;
    linkedin_url: string;
    skills: string[];
    resume_url: string;
    work_experience: string;
  };
  other_information: {
    educational_background: string;
    language: string;
    volunter_experience: string;
    publications: string;
    references: string;
  };
  category: string;
  date: string;
  user: {
    _id: string;
    name: string;
    email: string;
    subscription?: {
      _id: string;
      price: number;
    };
  };
  status: "pending" | "approved" | "reject" | "cancelled" | "completed";
  qna: Array<{
    question: string;
    answer: string;
    _id: string;
    type?: "mcq" | "fill_gap";
    options?: string[];
    correct_answer?: string;
    marks?: number;
  }>;
  end_time: string;
  start_time: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  cirtificate?: string;
  verificationCode?: string;
}

export const mockAssessment = [
  {
    _id: "68b026b808d80f649fd5e67a",
    personal_information: {
      name: "Darcel Ballentine",
      email: "darcel@example.com",
      contact: "+8801712345678",
      headline: "Backend Developer | Node.js | MongoDB",
      address: "Dhaka, Bangladesh",
      overview: "Experienced backend developer",
    },
    professional_information: {
      job_title: "Backend Developer",
      company: "Tech Solutions Ltd.",
      experience: "3 years",
      linkedin_url: "https://www.linkedin.com/in/darcel",
      skills: ["Node.js", "Express.js", "MongoDB"],
      resume_url: "/doc/darcel_cv.pdf",
      work_experience: "Developed scalable APIs",
    },
    other_information: {
      educational_background: "BSc in Computer Science",
      language: "Bengali, English",
      volunter_experience: "Mentored junior developers",
      publications: "Published article on Node.js",
      references: "Available upon request",
    },
    category: "Coachability",
    date: "2025-05-27T00:00:00.000Z",
    user: {
      _id: "68b0252308d80f649fd5e66f",
      name: "Darcel Ballentine",
      email: "darcel@example.com",
    },
    status: "approved",
    qna: [
      {
        question: "What is your biggest strength in coaching others?",
        answer:
          "My ability to listen actively and provide constructive feedback.",
        _id: "q1",
        type: "fill_gap",
      },
      {
        question: "Which leadership style do you prefer?",
        answer: "Transformational leadership",
        _id: "q2",
        type: "mcq",
        options: [
          "Autocratic",
          "Democratic",
          "Transformational",
          "Laissez-faire",
        ],
        correct_answer: "Transformational",
      },
    ],
    end_time: "2025-05-27T11:32:00.000Z",
    start_time: "2025-05-27T11:28:00.000Z",
    isPaid: true,
    createdAt: "2025-05-27T11:28:00.000Z",
    updatedAt: "2025-05-27T11:32:00.000Z",
  },
  {
    _id: "68b026b808d80f649fd5e67b",
    personal_information: {
      name: "Augustina Midgett",
      email: "augustina@example.com",
      contact: "+8801712345679",
      headline: "Frontend Developer | React | TypeScript",
      address: "Chittagong, Bangladesh",
      overview: "Creative frontend developer",
    },
    professional_information: {
      job_title: "Frontend Developer",
      company: "Digital Agency",
      experience: "2 years",
      linkedin_url: "https://www.linkedin.com/in/augustina",
      skills: ["React", "TypeScript", "CSS"],
      resume_url: "/doc/augustina_cv.pdf",
      work_experience: "Built responsive web applications",
    },
    other_information: {
      educational_background: "BSc in Software Engineering",
      language: "Bengali, English",
      volunter_experience: "UI/UX volunteer work",
      publications: "Blog posts on React best practices",
      references: "Available upon request",
    },
    category: "Reliability",
    date: "2025-09-04T00:00:00.000Z",
    user: {
      _id: "68b0252308d80f649fd5e670",
      name: "Augustina Midgett",
      email: "augustina@example.com",
    },
    status: "approved",
    qna: [
      {
        question: "How do you ensure reliability in your work?",
        answer:
          "By following strict testing procedures and maintaining clear documentation.",
        _id: "q3",
        type: "fill_gap",
      },
    ],
    end_time: "2025-09-04T16:45:00.000Z",
    start_time: "2025-09-04T16:44:00.000Z",
    isPaid: true,
    createdAt: "2025-09-04T16:44:00.000Z",
    updatedAt: "2025-09-04T16:45:00.000Z",
  },
  {
    _id: "68b026b808d80f649fd5e67c",
    personal_information: {
      name: "Tyra Dhillon",
      email: "tyra@example.com",
      contact: "+8801712345680",
      headline: "Product Manager | Growth Strategy",
      address: "Sylhet, Bangladesh",
      overview: "Strategic product manager",
    },
    professional_information: {
      job_title: "Product Manager",
      company: "Growth Corp",
      experience: "4 years",
      linkedin_url: "https://www.linkedin.com/in/tyra",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      resume_url: "/doc/tyra_cv.pdf",
      work_experience: "Led product growth initiatives",
    },
    other_information: {
      educational_background: "MBA in Business Administration",
      language: "Bengali, English, Hindi",
      volunter_experience: "Business mentorship programs",
      publications: "Articles on product growth",
      references: "Available upon request",
    },
    category: "Growth Mindset",
    date: "2025-05-30T00:00:00.000Z",
    user: {
      _id: "68b0252308d80f649fd5e671",
      name: "Tyra Dhillon",
      email: "tyra@example.com",
    },
    status: "pending",
    qna: [
      {
        question: "How do you approach learning new skills?",
        answer:
          "I embrace challenges and view failures as learning opportunities.",
        _id: "q4",
        type: "fill_gap",
      },
    ],
    end_time: "2025-05-30T14:39:00.000Z",
    start_time: "2025-05-30T14:25:00.000Z",
    isPaid: true,
    createdAt: "2025-05-30T14:25:00.000Z",
    updatedAt: "2025-05-30T14:39:00.000Z",
  },
  {
    _id: "68b026b808d80f649fd5e67d",
    personal_information: {
      name: "Janetta Rotolo",
      email: "janetta@example.com",
      contact: "+8801712345681",
      headline: "Communications Specialist",
      address: "Rajshahi, Bangladesh",
      overview: "Expert in corporate communications",
    },
    professional_information: {
      job_title: "Communications Manager",
      company: "Media House",
      experience: "5 years",
      linkedin_url: "https://www.linkedin.com/in/janetta",
      skills: ["Public Relations", "Content Strategy", "Social Media"],
      resume_url: "/doc/janetta_cv.pdf",
      work_experience: "Managed corporate communication strategies",
    },
    other_information: {
      educational_background: "MA in Mass Communication",
      language: "Bengali, English",
      volunter_experience: "Community outreach programs",
      publications: "PR strategy guides",
      references: "Available upon request",
    },
    category: "Communication",
    date: "2025-10-06T00:00:00.000Z",
    user: {
      _id: "68b0252308d80f649fd5e672",
      name: "Janetta Rotolo",
      email: "janetta@example.com",
    },
    status: "reject",
    qna: [
      {
        question: "What makes effective communication?",
        answer:
          "Clear messaging, active listening, and understanding your audience.",
        _id: "q5",
        type: "fill_gap",
      },
    ],
    end_time: "2025-10-06T09:44:00.000Z",
    start_time: "2025-10-06T09:42:00.000Z",
    isPaid: true,
    createdAt: "2025-10-06T09:42:00.000Z",
    updatedAt: "2025-10-06T09:44:00.000Z",
  },
  {
    _id: "68b026b808d80f649fd5e67e",
    personal_information: {
      name: "Tynisha Obey",
      email: "tynisha@example.com",
      contact: "+8801712345682",
      headline: "Leadership Coach",
      address: "Khulna, Bangladesh",
      overview: "Experienced leadership development coach",
    },
    professional_information: {
      job_title: "Senior Coach",
      company: "Leadership Institute",
      experience: "6 years",
      linkedin_url: "https://www.linkedin.com/in/tynisha",
      skills: ["Leadership Development", "Team Building", "Coaching"],
      resume_url: "/doc/tynisha_cv.pdf",
      work_experience: "Coached C-level executives",
    },
    other_information: {
      educational_background: "PhD in Organizational Psychology",
      language: "Bengali, English",
      volunter_experience: "Leadership workshops for nonprofits",
      publications: "Books on leadership development",
      references: "Available upon request",
    },
    category: "Coachability",
    date: "2025-12-10T00:00:00.000Z",
    user: {
      _id: "68b0252308d80f649fd5e673",
      name: "Tynisha Obey",
      email: "tynisha@example.com",
    },
    status: "reject",
    qna: [
      {
        question: "How do you measure coaching success?",
        answer: "Through measurable behavioral changes and goal achievement.",
        _id: "q6",
        type: "fill_gap",
      },
    ],
    end_time: "2025-12-10T10:10:00.000Z",
    start_time: "2025-12-10T10:02:00.000Z",
    isPaid: true,
    createdAt: "2025-12-10T10:02:00.000Z",
    updatedAt: "2025-12-10T10:10:00.000Z",
  },
];
