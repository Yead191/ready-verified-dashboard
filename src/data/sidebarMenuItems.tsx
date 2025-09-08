import {
  ChartNoAxesCombined,
  Crown,
  FileSpreadsheet,
  Settings,
  Users,
  Layout,
  DollarSign,
  Shield,
  ShieldCheck,
  HelpCircle,
  Lock,
  Info,
  ClipboardCheck,
  Layers,
  Wallet,
} from "lucide-react";
import { BiCategory } from "react-icons/bi";
import { MdOutlineAssessment } from "react-icons/md";

export const sidebarMenuItems = [
  {
    key: "analytics",
    icon: <ChartNoAxesCombined />,
    label: "Analytics",
  },
  {
    key: "users",
    icon: <Users />,
    label: "Users",
  },
  {
    key: "subscription",
    icon: <Crown />,
    label: "Subscription",
  },
  {
    key: "assessment",
    icon: <ClipboardCheck />,
    label: "Assessment",
  },
  {
    key: "categories",
    icon: <Layers />,
    label: "Categories",
  },
  {
    key: "templates",
    icon: <Layout />,
    label: "Templates",
  },
  {
    key: "earning",
    icon: <Wallet />,
    label: "Earning",
  },
  {
    key: "settings",
    icon: <Settings />,
    label: "Settings",
    children: [
      {
        key: "about",
        icon: <Info />,
        label: "About Us",
      },
      {
        key: "privacy-policy",
        icon: <Lock />,
        label: "Privacy Policy",
      },
      {
        key: "terms-conditions",
        icon: <ShieldCheck />,
        label: "Terms & Conditions",
      },
      {
        key: "faq",
        icon: <HelpCircle />,
        label: "FAQ",
      },
    ],
  },
];
