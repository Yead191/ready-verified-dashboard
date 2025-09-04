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
