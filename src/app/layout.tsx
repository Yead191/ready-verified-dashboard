import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReduxProvider from "@/redux/lib/ReduxProvider";

// import { UserProvider } from "@/helpers/UserProvider";
// import { AntdRegistry } from "@ant-design/nextjs-registry";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Ready Verified Dashboard",
  description:
    "The Ready Verified Admin Dashboard provides administrators with powerful tools to manage users, oversee CV assessments, monitor platform activity, and ensure smooth operation of the intelligent resume evaluation system.",
  icons: {
    icon: "/ready_fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ReduxProvider>
          <AntdRegistry>
            <Toaster position="top-center" duration={2000} />
            {children}
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
