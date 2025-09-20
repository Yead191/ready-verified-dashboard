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
    key: "dashboard/analytics",
    icon: <ChartNoAxesCombined />,
    label: "Analytics",
  },
  {
    key: "dashboard/users",
    icon: <Users />,
    label: "Users",
  },
  {
    key: "dashboard/subscription",
    icon: <Crown />,
    label: "Subscription",
  },
  {
    key: "dashboard/assessment",
    icon: <ClipboardCheck />,
    label: "Assessment",
  },
  {
    key: "dashboard/categories",
    icon: <Layers />,
    label: "Categories",
  },
  {
    key: "dashboard/templates",
    icon: <Layout />,
    label: "Templates",
  },
  // {
  //   key: "earning",
  //   icon: <Wallet />,
  //   label: "Earning",
  // },
  {
    key: "settings",
    icon: <Settings />,
    label: "Settings",
    children: [
      {
        key: "dashboard/about",
        icon: <Info />,
        label: "About Us",
      },
      {
        key: "dashboard/privacy-policy",
        icon: <Lock />,
        label: "Privacy Policy",
      },
      {
        key: "dashboard/terms-conditions",
        icon: <ShieldCheck />,
        label: "Terms & Conditions",
      },
      {
        key: "dashboard/faq",
        icon: <HelpCircle />,
        label: "FAQ",
      },
    ],
  },
];
